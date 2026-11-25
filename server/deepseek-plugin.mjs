import { fileURLToPath } from 'node:url';
import { createCredentialReader } from './credentials.mjs';
import { buildSystemPrompt, courseContext } from './project-context.mjs';

const CHAT_PATH = '/api/xiaojing/chat';
const STATUS_PATH = '/api/xiaojing/status';
const UPSTREAM = 'https://api.deepseek.com/chat/completions';
const MAX_BYTES = 65_536;
const DEFAULT_MODEL = 'deepseek-flash';

export class ChatError extends Error {
  constructor(status, code, message) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

const invalid = (message) => new ChatError(400, 'INVALID_REQUEST', message);
const isLoopback = (address = '') =>
  address === '::1' || /^127(?:\.\d{1,3}){3}$/.test(address) || /^::ffff:127(?:\.\d{1,3}){3}$/.test(address);

export function isLocalRequest(request) {
  if (!isLoopback(request.socket.remoteAddress)) return false;
  const host = request.headers.host;
  if (typeof host !== 'string' || !/^(localhost|127\.0\.0\.1|\[::1\])(?::\d{1,5})?$/.test(host)) return false;
  const origin = request.headers.origin;
  if (origin !== undefined && origin !== `http://${host}` && origin !== `https://${host}`) return false;
  if (request.headers['sec-fetch-site'] === 'cross-site') return false;
  return true;
}

function isCredentialPath(url = '') {
  let decoded = url.split('?')[0];
  for (let pass = 0; pass < 3; pass += 1) {
    try {
      const next = decodeURIComponent(decoded);
      if (next === decoded) break;
      decoded = next;
    } catch { break; }
  }
  return /(?:^|\/)\.local(?:\/|$)|\.dpapi$/i.test(decoded.replace(/\\/g, '/'));
}

export function validatePayload(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw invalid('请发送有效的对话内容。');
  if (!Array.isArray(input.messages) || input.messages.length < 1 || input.messages.length > 16) {
    throw invalid('每次对话请保留最近 1—16 条消息。');
  }
  let length = 0;
  const messages = input.messages.map((message) => {
    if (!message || (message.role !== 'user' && message.role !== 'assistant') || typeof message.content !== 'string') {
      throw invalid('消息格式不正确。');
    }
    const content = message.content.trim();
    if (!content || content.length > 4000) throw invalid('单条消息请控制在 4000 字以内。');
    length += content.length;
    return { role: message.role, content };
  });
  if (length > 16_000) throw invalid('对话较长，请开启一段新对话。');
  if (messages.at(-1).role !== 'user') throw invalid('最后一条消息需要是你的提问。');
  if (input.courseId !== undefined && (typeof input.courseId !== 'string' || !Object.hasOwn(courseContext, input.courseId))) {
    throw invalid('当前课程信息无效，请刷新页面后重试。');
  }
  if (input.persona !== undefined && (input.persona !== 'walle' || input.courseId !== 'robot')) {
    throw invalid('当前对话角色无效，请刷新页面后重试。');
  }
  return { messages, courseId: input.courseId, persona: input.persona };
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const parts = [];
    const timeout = setTimeout(() => finish(new ChatError(408, 'BODY_TIMEOUT', '发送内容超时，请重试。')), 10_000);
    const finish = (error, value) => {
      clearTimeout(timeout);
      request.off('data', onData);
      request.off('end', onEnd);
      request.off('error', onError);
      request.off('aborted', onAborted);
      if (error) {
        request.resume();
        reject(error);
      } else resolve(value);
    };
    const onData = (chunk) => {
      size += chunk.length;
      if (size > MAX_BYTES) finish(new ChatError(413, 'BODY_TOO_LARGE', '发送内容过长，请缩短后重试。'));
      else parts.push(chunk);
    };
    const onEnd = () => {
      try {
        finish(null, JSON.parse(Buffer.concat(parts).toString('utf8')));
      } catch {
        finish(invalid('对话内容不是有效的 JSON。'));
      }
    };
    const onError = () => finish(invalid('对话内容未完整发送，请重试。'));
    const onAborted = () => finish(invalid('对话已取消。'));
    request.on('data', onData);
    request.once('end', onEnd);
    request.once('error', onError);
    request.once('aborted', onAborted);
  });
}

function sendJson(response, status, body) {
  if (response.destroyed || response.writableEnded) return;
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  });
  response.end(JSON.stringify(body));
}

export function upstreamError(status) {
  if (status === 401 || status === 403) return new ChatError(502, 'AUTH_FAILED', '小景的模型连接未通过验证，请检查本机配置。');
  if (status === 402) return new ChatError(502, 'QUOTA_EXHAUSTED', '模型服务余额不足，请补充后再试。');
  if (status === 429) return new ChatError(429, 'UPSTREAM_BUSY', '模型服务暂时繁忙，请稍后再试。');
  if (status === 400 || status === 404 || status === 422) return new ChatError(502, 'MODEL_UNAVAILABLE', '当前模型配置暂不可用，请检查服务配置。');
  return new ChatError(502, 'UPSTREAM_FAILED', '模型服务暂时无法回答，请稍后重试。');
}

async function forwardStream(body, response, signal) {
  if (!body) throw new ChatError(502, 'EMPTY_RESPONSE', '模型没有返回回答，请重试。');
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let outputLength = 0;
  let finished = false;
  let completionSeen = false;
  const emit = (event) => {
    if (!response.destroyed && !response.writableEnded) response.write(`data: ${JSON.stringify(event)}\n\n`);
  };
  const consume = (block) => {
    const data = block.split('\n').filter((line) => line.startsWith('data:')).map((line) => line.slice(5).trimStart()).join('\n');
    if (!data) return;
    if (data.trim() === '[DONE]') {
      finished = true;
      return;
    }
    let event;
    try {
      event = JSON.parse(data);
    } catch {
      throw new ChatError(502, 'STREAM_INVALID', '回答传输中断，请重试。');
    }
    if (event.error) throw new ChatError(502, 'UPSTREAM_FAILED', '模型服务暂时无法回答，请稍后重试。');
    if (event.choices?.[0]?.finish_reason) completionSeen = true;
    const content = event.choices?.[0]?.delta?.content;
    if (typeof content === 'string' && content) {
      outputLength += content.length;
      if (outputLength > 16_000) throw new ChatError(502, 'REPLY_TOO_LONG', '回答较长，已停止生成。可以继续提问。');
      emit({ type: 'delta', text: content });
    }
  };
  try {
    while (!finished) {
      if (signal.aborted) throw signal.reason;
      const { done, value } = await reader.read();
      if (done) {
        buffer += decoder.decode();
        if (buffer.trim()) consume(buffer.replace(/\r\n/g, '\n'));
        break;
      }
      buffer += decoder.decode(value, { stream: true }).replace(/\r\n/g, '\n');
      // A chunk can end in CR; normalize once more after concatenation.
      buffer = buffer.replace(/\r\n/g, '\n');
      if (buffer.length > MAX_BYTES) throw new ChatError(502, 'STREAM_INVALID', '回答传输中断，请重试。');
      let divider;
      while ((divider = buffer.indexOf('\n\n')) !== -1) {
        const block = buffer.slice(0, divider);
        buffer = buffer.slice(divider + 2);
        consume(block);
        if (finished) break;
      }
    }
    if (!outputLength) throw new ChatError(502, 'EMPTY_RESPONSE', '模型暂未给出回答，请换一种问法重试。');
    if (!finished && !completionSeen) throw new ChatError(502, 'STREAM_INTERRUPTED', '回答传输中断，请重试。');
    emit({ type: 'done' });
  } finally {
    await reader.cancel().catch(() => {});
    reader.releaseLock();
  }
}

export function createXiaojingMiddleware({
  projectRoot = fileURLToPath(new URL('../', import.meta.url)),
  environment = process.env,
  readCredential = createCredentialReader(projectRoot, environment),
  fetchImpl = globalThis.fetch,
  timeoutMs = 45_000,
  now = Date.now,
} = {}) {
  const configuredModel = environment.DEEPSEEK_MODEL?.trim();
  const model = configuredModel && /^[A-Za-z0-9_.-]{1,80}$/.test(configuredModel) ? configuredModel : DEFAULT_MODEL;
  let active = 0;
  let requestTimes = [];
  return function xiaojingMiddleware(request, response, next) {
    // Runs before Vite's source/static middleware, including /@fs/ and preview.
    if (isCredentialPath(request.url)) {
      sendJson(response, 404, { error: { code: 'NOT_FOUND', message: '未找到该资源。' } });
      return;
    }
    const path = request.url?.split('?')[0];
    if (path !== CHAT_PATH && path !== STATUS_PATH) return next();
    void (async () => {
      if (!isLocalRequest(request)) throw new ChatError(403, 'LOCAL_ONLY', '小景演示接口只接受本机页面请求。');
      if (path === STATUS_PATH) {
        if (request.method !== 'GET') throw new ChatError(405, 'METHOD_NOT_ALLOWED', '请使用 GET 查看连接状态。');
        const configured = Boolean(await readCredential());
        sendJson(response, 200, { configured, provider: 'DeepSeek', model });
        return;
      }
      if (request.method !== 'POST') throw new ChatError(405, 'METHOD_NOT_ALLOWED', '请使用 POST 发送对话。');
      if (!/^application\/json(?:;|$)/i.test(request.headers['content-type'] || '')) {
        throw new ChatError(415, 'CONTENT_TYPE', '请以 JSON 格式发送对话。');
      }
      if (Number(request.headers['content-length']) > MAX_BYTES) throw new ChatError(413, 'BODY_TOO_LARGE', '发送内容过长，请缩短后重试。');
      const { messages, courseId, persona } = validatePayload(await readBody(request));
      if (response.destroyed || request.aborted) return;
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(new Error('deadline')), timeoutMs);
      const onClose = () => { if (!response.writableEnded) controller.abort(new Error('client_closed')); };
      const onAborted = () => controller.abort(new Error('client_closed'));
      response.on('close', onClose);
      request.on('aborted', onAborted);
      let heartbeat;
      let countedActive = false;
      try {
        // Credential decryption can take time. Start the cancellation lifecycle
        // before awaiting it, then recheck before consuming a model request.
        const key = await readCredential();
        if (response.destroyed || request.aborted) return;
        if (controller.signal.aborted) throw controller.signal.reason;
        if (!key) throw new ChatError(503, 'NOT_CONFIGURED', '小景尚未连接模型，请先完成本机配置。');
        const timestamp = now();
        requestTimes = requestTimes.filter((time) => timestamp - time < 60_000);
        if (active >= 2 || requestTimes.length >= 20) throw new ChatError(429, 'RATE_LIMITED', '小景正在回答，请稍等片刻再发送。');
        requestTimes.push(timestamp);
        active += 1;
        countedActive = true;
        const upstream = await fetchImpl(UPSTREAM, {
          method: 'POST',
          headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model,
            messages: [{ role: 'system', content: buildSystemPrompt(courseId, persona) }, ...messages],
            stream: true,
            thinking: { type: 'disabled' },
            max_tokens: 1200,
            temperature: 0.6,
          }),
          signal: controller.signal,
        });
        if (!upstream.ok) {
          await upstream.body?.cancel().catch(() => {});
          throw upstreamError(upstream.status);
        }
        if (response.destroyed) return;
        response.writeHead(200, {
          'Content-Type': 'text/event-stream; charset=utf-8',
          'Cache-Control': 'no-store, no-transform',
          'X-Content-Type-Options': 'nosniff',
          'X-Accel-Buffering': 'no',
        });
        response.flushHeaders?.();
        heartbeat = setInterval(() => { if (!response.destroyed) response.write(': keepalive\n\n'); }, 12_000);
        await forwardStream(upstream.body, response, controller.signal);
        response.end();
      } catch (error) {
        if (response.destroyed) return;
        const safeError = error instanceof ChatError ? error : controller.signal.aborted
          ? new ChatError(504, 'MODEL_TIMEOUT', '小景回答超时，请稍后重试。')
          : new ChatError(502, 'CONNECTION_FAILED', '暂时无法连接模型服务，请检查网络后重试。');
        if (response.headersSent) {
          response.end(`data: ${JSON.stringify({ type: 'error', code: safeError.code, message: safeError.message })}\n\n`);
        } else sendJson(response, safeError.status, { error: { code: safeError.code, message: safeError.message } });
      } finally {
        clearTimeout(timer);
        clearInterval(heartbeat);
        response.off('close', onClose);
        request.off('aborted', onAborted);
        controller.abort();
        if (countedActive) active -= 1;
      }
    })().catch((error) => {
      const safeError = error instanceof ChatError ? error : new ChatError(500, 'LOCAL_SERVICE_FAILED', '本机对话服务暂时不可用，请稍后重试。');
      sendJson(response, safeError.status, { error: { code: safeError.code, message: safeError.message } });
    });
  };
}

export function xiaojingApiPlugin() {
  return {
    name: 'jingshan-local-xiaojing-api',
    configureServer(server) {
      server.middlewares.use(createXiaojingMiddleware({ projectRoot: server.config.root }));
    },
    configurePreviewServer(server) {
      server.middlewares.use(createXiaojingMiddleware({ projectRoot: server.config.root }));
    },
  };
}
