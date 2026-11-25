import { mkdir, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { isLocalRequest } from './deepseek-plugin.mjs';
import { atomicJson } from './media-plugin.mjs';
import { sendJson } from './static-files.mjs';

export const TEXT_LIMIT = 1024 * 1024;
const API = '/api/text-settings';
const validId = (value) => typeof value === 'string' && /^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/.test(value);
const empty = () => ({ version: 1, overrides: {} });
const isObject = (value) => Boolean(value) && typeof value === 'object' && !Array.isArray(value);

export class TextError extends Error {
  constructor(status, code, message) { super(message); Object.assign(this, { status, code }); }
}
const bad = (message) => new TextError(400, 'INVALID_TEXT', message);

export function createTextStore({
  projectRoot = fileURLToPath(new URL('../', import.meta.url)),
  sections,
} = {}) {
  const directory = join(projectRoot, 'user-data');
  const settingsFile = join(directory, 'text-settings.json');
  let chain = Promise.resolve();
  let registry;
  let registryFingerprint;
  const registryFiles = ['text-sections.json', 'course-text-sections.json'];
  async function loadRegistry() {
    const entries = sections ?? (await Promise.all(
      registryFiles.map(async (file) => {
        const parsed = JSON.parse(await readFile(join(projectRoot, 'shared', file), 'utf8'));
        if (!Array.isArray(parsed)) throw new Error('Invalid text section registry');
        return parsed;
      }),
    )).flat();
    if (!Array.isArray(entries)) throw new Error('Invalid text section registry');
    const result = new Map();
    for (const section of entries) {
      if (!section || !validId(section.id) || result.has(section.id) || !Array.isArray(section.fields)) throw new Error('Invalid text section');
      const fields = new Map();
      for (const field of section.fields) {
        if (!field || !validId(field.id) || fields.has(field.id) || typeof field.defaultText !== 'string'
          || (field.maxLength !== undefined && (!Number.isInteger(field.maxLength) || field.maxLength < 1 || field.maxLength > 20000))) {
          throw new Error('Invalid text field');
        }
        fields.set(field.id, { ...field, maxLength: field.maxLength || 1000 });
      }
      result.set(section.id, fields);
    }
    return result;
  }
  async function getRegistry() {
    const fingerprint = sections ? 'injected' : (await Promise.all(
      registryFiles.map(async (file) => {
        const info = await stat(join(projectRoot, 'shared', file));
        return `${info.mtimeMs}:${info.size}`;
      }),
    )).join('|');
    if (!registry || fingerprint !== registryFingerprint) {
      registryFingerprint = fingerprint;
      const pending = loadRegistry();
      registry = pending;
      pending.catch(() => { if (registry === pending) registry = undefined; });
    }
    return registry;
  }
  const serialize = (callback) => {
    const pending = chain.then(callback);
    chain = pending.catch(() => {});
    return pending;
  };
  async function requireSection(id) {
    const fields = (await getRegistry()).get(id);
    if (!fields) throw new TextError(404, 'UNKNOWN_SECTION', '未找到这个文字栏目，请刷新页面后重试。');
    return fields;
  }
  async function validateSection(id, input, { stored = false } = {}) {
    const fields = await requireSection(id);
    if (!isObject(input) || !isObject(input.values) || !Array.isArray(input.additions)
      || Object.keys(input).some((key) => !['values', 'additions', ...(stored ? ['updatedAt'] : [])].includes(key))) {
      throw bad('文字设置应包含字段内容和补充条目列表。');
    }
    const values = {};
    for (const [fieldId, value] of Object.entries(input.values)) {
      const field = fields.get(fieldId);
      if (!field) throw bad('文字设置包含未知字段，请刷新页面后重试。');
      if (typeof value !== 'string' || value.length > field.maxLength) throw bad(`“${field.label || fieldId}”须为文本，最多 ${field.maxLength} 个字符。`);
      values[fieldId] = value;
    }
    if (input.additions.length > 8) throw bad('每个栏目最多添加 8 个补充条目。');
    const seen = new Set();
    const additions = input.additions.map((item) => {
      if (!isObject(item) || Object.keys(item).some((key) => !['id', 'title', 'body'].includes(key))
        || typeof item.id !== 'string' || !/^[A-Za-z0-9_-]{1,80}$/.test(item.id) || seen.has(item.id)
        || typeof item.title !== 'string' || item.title.length > 80 || typeof item.body !== 'string' || item.body.length > 600) {
        throw bad('补充条目格式不正确：标识不可重复，标题最多 80 字，正文最多 600 字。');
      }
      seen.add(item.id);
      return { id: item.id, title: item.title, body: item.body };
    });
    if (stored && (typeof input.updatedAt !== 'string' || !Number.isFinite(Date.parse(input.updatedAt)))) throw bad('文字设置时间格式不正确。');
    return { values, additions, updatedAt: stored ? input.updatedAt : new Date().toISOString() };
  }
  async function readSettings() {
    await getRegistry();
    let input;
    try {
      const text = await readFile(settingsFile, 'utf8');
      if (Buffer.byteLength(text) > TEXT_LIMIT) throw bad('');
      input = JSON.parse(text);
    } catch (error) {
      if (error.code === 'ENOENT') return empty();
      throw new TextError(500, 'TEXT_SETTINGS_DAMAGED', '本机文字设置无法读取，请保留 user-data 文件夹并检查备份。');
    }
    try {
      if (!isObject(input) || input.version !== 1 || !isObject(input.overrides)) throw bad('');
      const settings = empty();
      for (const [id, value] of Object.entries(input.overrides)) settings.overrides[id] = await validateSection(id, value, { stored: true });
      return settings;
    } catch {
      throw new TextError(500, 'TEXT_SETTINGS_DAMAGED', '本机文字设置格式不正确，请保留 user-data 文件夹并检查备份。');
    }
  }
  async function saveSettings(settings) {
    // Keep the complete export importable under the same 1 MiB boundary.
    if (Buffer.byteLength(JSON.stringify(settings, null, 2)) > TEXT_LIMIT - 4096) throw new TextError(413, 'TEXT_TOO_LARGE', '文字设置总量超过 1 MiB，请缩短部分内容后再保存。');
    await mkdir(directory, { recursive: true });
    await atomicJson(settingsFile, settings);
  }
  return {
    requireSection,
    getSettings: () => serialize(readSettings),
    update(id, input) {
      return serialize(async () => {
        const value = await validateSection(id, input);
        const settings = await readSettings();
        settings.overrides[id] = value;
        await saveSettings(settings);
        return structuredClone(settings);
      });
    },
    remove(id) {
      return serialize(async () => {
        await requireSection(id);
        const settings = await readSettings();
        delete settings.overrides[id];
        await saveSettings(settings);
        return structuredClone(settings);
      });
    },
    exportBundle() {
      return serialize(async () => {
        const settings = await readSettings();
        return {
          format: 'jingshan-text', version: 1, exportedAt: new Date().toISOString(),
          overrides: settings.overrides,
        };
      });
    },
    importBundle(input) {
      return serialize(async () => {
        if (!isObject(input) || input.format !== 'jingshan-text' || input.version !== 1 || !isObject(input.overrides)) {
          throw bad('文字包版本或结构不正确，请选择本应用导出的 .jingshan-text 文件。');
        }
        const replacements = {};
        for (const [id, value] of Object.entries(input.overrides)) {
          if (!isObject(value)) throw bad('文字包中的栏目格式不正确。');
          const validated = await validateSection(id, value, { stored: true });
          replacements[id] = { ...validated, updatedAt: new Date().toISOString() };
        }
        const settings = await readSettings();
        Object.assign(settings.overrides, replacements);
        await saveSettings(settings);
        return structuredClone(settings);
      });
    },
    copyCurrentTo(targetRoot) {
      return serialize(async () => {
        const settings = await readSettings();
        const destination = join(targetRoot, 'user-data');
        await mkdir(destination, { recursive: true });
        await atomicJson(join(destination, 'text-settings.json'), settings);
        return Object.keys(settings.overrides).length;
      });
    },
  };
}

async function readJson(request) {
  if (!/^application\/json(?:;|$)/i.test(request.headers['content-type'] || '')) throw new TextError(415, 'CONTENT_TYPE', '请以 JSON 格式发送文字设置。');
  const tooLarge = () => new TextError(413, 'TEXT_TOO_LARGE', '文字设置或文字包不能超过 1 MiB。');
  if (Number(request.headers['content-length']) > TEXT_LIMIT) throw tooLarge();
  const bytes = await new Promise((accept, reject) => {
    const chunks = [];
    let size = 0;
    let finished = false;
    const timer = setTimeout(() => finish(new TextError(408, 'BODY_TIMEOUT', '文字设置发送超时，请重试。')), 15_000);
    const finish = (error, value) => {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      request.off('data', onData);
      request.off('end', onEnd);
      request.off('error', onAbort);
      request.off('aborted', onAbort);
      if (error) { request.resume(); reject(error); } else accept(value);
    };
    const onData = (chunk) => {
      size += chunk.length;
      if (size > TEXT_LIMIT) finish(tooLarge());
      else chunks.push(chunk);
    };
    const onEnd = () => finish(null, Buffer.concat(chunks, size));
    const onAbort = () => finish(bad('文字设置未完整发送，请重试。'));
    request.on('data', onData);
    request.once('end', onEnd);
    request.once('error', onAbort);
    request.once('aborted', onAbort);
  });
  try { return JSON.parse(bytes.toString('utf8')); } catch { throw bad('文字设置不是有效的 JSON。'); }
}

export function createTextMiddleware(options = {}) {
  const store = options.store ?? createTextStore(options);
  return function textMiddleware(request, response, next) {
    const path = request.url?.split('?')[0] || '';
    if (path !== API && !path.startsWith(`${API}/`)) return next();
    void (async () => {
      if (!isLocalRequest(request)) throw new TextError(403, 'LOCAL_ONLY', '文字设置只接受本机页面的同源请求。');
      if (request.headers['content-encoding'] && request.headers['content-encoding'] !== 'identity') throw bad('请发送未压缩的 JSON 文字包。');
      if (path === API && request.method === 'GET') {
        sendJson(response, 200, await store.getSettings());
        return;
      }
      if (path === `${API}/export` && request.method === 'GET') {
        const bytes = Buffer.from(JSON.stringify(await store.exportBundle(), null, 2) + '\n');
        response.writeHead(200, {
          'Content-Type': 'application/json; charset=utf-8', 'Content-Length': String(bytes.length),
          'Content-Disposition': `attachment; filename="jingshan-text-${new Date().toISOString().slice(0, 10)}.jingshan-text"`,
          'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff',
        });
        response.end(bytes);
        return;
      }
      if (path === `${API}/import` && request.method === 'POST') {
        sendJson(response, 200, await store.importBundle(await readJson(request)));
        return;
      }
      if (path === API || path === `${API}/export` || path === `${API}/import`) throw new TextError(405, 'METHOD_NOT_ALLOWED', '此文字操作的请求方式不正确。');
      let id;
      try { id = decodeURIComponent(path.slice(API.length + 1)); } catch { throw bad('文字栏目地址不正确。'); }
      await store.requireSection(id);
      if (request.method === 'PUT') sendJson(response, 200, await store.update(id, await readJson(request)));
      else if (request.method === 'DELETE') sendJson(response, 200, await store.remove(id));
      else throw new TextError(405, 'METHOD_NOT_ALLOWED', '请使用保存文字或恢复默认操作。');
    })().catch((error) => {
      const safe = error instanceof TextError ? error : new TextError(500, 'TEXT_SERVICE_FAILED', '本机文字设置暂时不可用，请检查目录写入权限后重试。');
      if (!request.complete) { response.shouldKeepAlive = false; request.resume(); }
      sendJson(response, safe.status, { error: { code: safe.code, message: safe.message } });
    });
  };
}

export function textApiPlugin() {
  return {
    name: 'jingshan-local-text-api',
    configureServer(server) {
      server.middlewares.use(createTextMiddleware({ projectRoot: server.config.root }));
    },
    configurePreviewServer(server) {
      server.middlewares.use(createTextMiddleware({ projectRoot: server.config.root }));
    },
  };
}
