import { randomBytes } from 'node:crypto';
import { mkdir, readFile, rename, unlink, writeFile } from 'node:fs/promises';
import { basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { gzip, gunzip } from 'node:zlib';
import { isLocalRequest } from './deepseek-plugin.mjs';
import { sendJson, serveFile } from './static-files.mjs';

export const MEDIA_LIMITS = Object.freeze({
  file: 60 * 1024 * 1024,
  import: 160 * 1024 * 1024,
  expanded: 250 * 1024 * 1024,
});
const gzipAsync = promisify(gzip);
const gunzipAsync = promisify(gunzip);
const API = '/api/media-settings';
const FILE_PATTERN = /^[a-f0-9]{32}\.(png|jpg|webp|gif|svg|mp4|webm)$/;
const TYPES = {
  'image/png': ['png', 'image'], 'image/jpeg': ['jpg', 'image'],
  'image/webp': ['webp', 'image'], 'image/gif': ['gif', 'image'],
  'image/svg+xml': ['svg', 'image'],
  'video/mp4': ['mp4', 'video'], 'video/webm': ['webm', 'video'],
};

export class MediaError extends Error {
  constructor(status, code, message) { super(message); Object.assign(this, { status, code }); }
}
const bad = (message) => new MediaError(400, 'INVALID_MEDIA', message);
const emptySettings = () => ({ version: 1, overrides: {} });
const clone = (value) => structuredClone(value);

export function normalizeFit(value = 'contain') {
  if (value !== 'cover' && value !== 'contain') throw bad('显示方式只能选择“完整显示”或“铺满裁切”。');
  return value;
}

export function normalizePosition(value = 'center') {
  if (typeof value !== 'string' || value.length > 40) throw bad('画面位置格式不正确。');
  const result = value.trim().toLowerCase().replace(/\s+/g, ' ');
  const keywords = /^(?:center|top|bottom|left|right|(?:left|center|right) (?:top|center|bottom)|(?:top|center|bottom) (?:left|center|right))$/;
  if (keywords.test(result)) return result;
  if (/^\d{1,3}(?:\.\d{1,2})?% \d{1,3}(?:\.\d{1,2})?%$/.test(result)
    && result.split(' ').every((part) => Number.parseFloat(part) <= 100)) return result;
  throw bad('画面位置应为居中、上下左右，或 0%—100% 的两个百分比。');
}

function cleanFileName(value) {
  if (typeof value !== 'string') throw bad('素材文件名格式不正确。');
  const name = basename(value.replace(/\\/g, '/')).replace(/[\u0000-\u001f\u007f]/g, '').trim();
  if (!name || name.length > 160) throw bad('素材文件名不能为空，且不能超过 160 个字符。');
  return name;
}

export function identifyMedia(bytes, requestedMime) {
  if (!Buffer.isBuffer(bytes) || !bytes.length) throw bad('素材文件为空。');
  if (bytes.length > MEDIA_LIMITS.file) throw new MediaError(413, 'FILE_TOO_LARGE', '单个素材不能超过 60 MiB，请压缩后再上传。');
  const mime = String(requestedMime || '').split(';')[0].trim().toLowerCase();
  if (!Object.hasOwn(TYPES, mime)) throw new MediaError(415, 'UNSUPPORTED_MEDIA', '仅支持 PNG、JPEG、WebP、GIF、SVG 图片和 MP4、WebM 视频。');
  let detected;
  if (bytes.length >= 24 && bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
    && bytes.toString('ascii', 12, 16) === 'IHDR') detected = 'image/png';
  else if (bytes.length >= 4 && bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255
    && bytes[bytes.length - 2] === 255 && bytes[bytes.length - 1] === 217) detected = 'image/jpeg';
  else if (bytes.length >= 13 && /^(GIF87a|GIF89a)$/.test(bytes.toString('ascii', 0, 6))) detected = 'image/gif';
  else if (bytes.length >= 20 && bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP'
    && bytes.readUInt32LE(4) + 8 === bytes.length && /^(VP8 |VP8L|VP8X)$/.test(bytes.toString('ascii', 12, 16))) detected = 'image/webp';
  else if (bytes.length >= 16 && bytes.toString('ascii', 4, 8) === 'ftyp'
    && bytes.readUInt32BE(0) >= 16 && bytes.readUInt32BE(0) <= bytes.length
    && /^(isom|iso[2-9]|mp4[12]|avc1|M4V |MSNV|dash|cmfc|cmfs|3gp[456])$/.test(bytes.toString('ascii', 8, 12))) detected = 'video/mp4';
  else if (bytes.length >= 12 && bytes.subarray(0, 4).equals(Buffer.from([0x1a, 0x45, 0xdf, 0xa3]))
    && bytes.subarray(4, Math.min(bytes.length, 4096)).includes(Buffer.from('webm'))) detected = 'video/webm';
  else if (mime === 'image/svg+xml') {
    let header = bytes.toString('utf8', 0, 8192).trimStart().replace(/^<\?xml\s+[^?]*\?>\s*/, '');
    while (header.startsWith('<!--')) {
      const end = header.indexOf('-->');
      if (end < 0) break;
      header = header.slice(end + 3).trimStart();
    }
    const root = /^<svg(?=\s)([^<>]*)>/.exec(header);
    if (root && /\sxmlns\s*=\s*(["'])http:\/\/www\.w3\.org\/2000\/svg\1/.test(root[1])
        && (/\/\s*$/.test(root[1]) || /<\/svg\s*>\s*$/.test(bytes.toString('utf8', Math.max(0, bytes.length - 8192))))) {
      detected = mime;
    }
  }
  if (detected !== mime) throw bad('文件内容与格式不符，或文件已损坏。请重新选择支持的图片或视频。');
  return { mime, extension: TYPES[mime][0], kind: TYPES[mime][1] };
}

function filenameFromUrl(url) {
  if (typeof url !== 'string' || !url.startsWith('/user-media/')) throw bad('素材文件路径不正确。');
  const filename = url.slice('/user-media/'.length);
  if (!FILE_PATTERN.test(filename)) throw bad('素材文件路径不正确。');
  return filename;
}

export async function atomicJson(path, value) {
  const temporary = `${path}.${randomBytes(8).toString('hex')}.tmp`;
  try {
    await writeFile(temporary, JSON.stringify(value, null, 2) + '\n', { flag: 'wx' });
    await rename(temporary, path);
  } finally { await unlink(temporary).catch(() => {}); }
}

export function createMediaStore({
  projectRoot = fileURLToPath(new URL('../', import.meta.url)),
  slots,
} = {}) {
  const dataDirectory = join(projectRoot, 'user-data');
  const mediaDirectory = join(dataDirectory, 'media');
  const settingsFile = join(dataDirectory, 'media-settings.json');
  let chain = Promise.resolve();
  const registry = (async () => {
    const entries = slots ?? JSON.parse(await readFile(join(projectRoot, 'shared', 'media-slots.json'), 'utf8'));
    if (!Array.isArray(entries) || entries.some((entry) => !entry || typeof entry.id !== 'string'
      || !/^[A-Za-z0-9][A-Za-z0-9._-]{0,95}$/.test(entry.id))) throw new Error('Invalid media slot registry');
    const ids = new Set(entries.map((entry) => entry.id));
    if (ids.size !== entries.length) throw new Error('Duplicate media slot identifier');
    return ids;
  })();
  // A missing registry is reported by an API request, without an unhandled rejection.
  registry.catch(() => {});
  const requireId = async (id) => {
    if (!(await registry).has(id)) throw new MediaError(404, 'UNKNOWN_SLOT', '未找到这个素材位置，请刷新页面后重试。');
  };
  const serialize = (callback) => {
    const pending = chain.then(callback);
    chain = pending.catch(() => {});
    return pending;
  };
  async function readSettings() {
    await registry;
    let input;
    try { input = JSON.parse(await readFile(settingsFile, 'utf8')); } catch (error) {
      if (error.code === 'ENOENT') return emptySettings();
      throw new MediaError(500, 'SETTINGS_DAMAGED', '本机素材设置无法读取，请保留 user-data 文件夹并从素材包恢复。');
    }
    try {
      if (!input || input.version !== 1 || !input.overrides || typeof input.overrides !== 'object' || Array.isArray(input.overrides)) throw bad('');
      const result = emptySettings();
      for (const [id, value] of Object.entries(input.overrides)) {
        await requireId(id);
        if (!value || value.id !== id || !Object.hasOwn(TYPES, value.mime)) throw bad('');
        const filename = filenameFromUrl(value.url);
        if (!filename.endsWith(`.${TYPES[value.mime][0]}`) || value.kind !== TYPES[value.mime][1]
          || typeof value.updatedAt !== 'string' || !Number.isFinite(Date.parse(value.updatedAt))) throw bad('');
        result.overrides[id] = {
          id, url: `/user-media/${filename}`, mime: value.mime, kind: value.kind,
          fileName: cleanFileName(value.fileName), fit: normalizeFit(value.fit),
          position: normalizePosition(value.position), updatedAt: value.updatedAt,
        };
      }
      return result;
    } catch {
      throw new MediaError(500, 'SETTINGS_DAMAGED', '本机素材设置格式不正确，请保留 user-data 文件夹并从素材包恢复。');
    }
  }
  async function saveSettings(settings) {
    await mkdir(mediaDirectory, { recursive: true });
    await atomicJson(settingsFile, settings);
  }
  async function createOverride(id, bytes, metadata) {
    const type = identifyMedia(bytes, metadata.mime);
    const filename = `${randomBytes(16).toString('hex')}.${type.extension}`;
    const item = {
      id, url: `/user-media/${filename}`, mime: type.mime, kind: type.kind,
      fileName: cleanFileName(metadata.fileName), fit: normalizeFit(metadata.fit),
      position: normalizePosition(metadata.position), updatedAt: new Date().toISOString(),
    };
    await mkdir(mediaDirectory, { recursive: true });
    await writeFile(join(mediaDirectory, filename), bytes, { flag: 'wx' });
    return item;
  }
  return {
    requireId,
    getSettings: () => serialize(readSettings),
    upload(id, bytes, metadata) {
      return serialize(async () => {
        await requireId(id);
        const settings = await readSettings();
        settings.overrides[id] = await createOverride(id, bytes, metadata);
        await saveSettings(settings);
        return clone(settings);
      });
    },
    update(id, patch) {
      return serialize(async () => {
        await requireId(id);
        if (!patch || typeof patch !== 'object' || Array.isArray(patch)
          || Object.keys(patch).some((key) => key !== 'fit' && key !== 'position')
          || !Object.keys(patch).length) throw bad('只可更新素材的显示方式和画面位置。');
        const settings = await readSettings();
        const existing = settings.overrides[id];
        if (!existing) throw new MediaError(404, 'NO_OVERRIDE', '此处仍在使用默认素材，请先上传替换素材。');
        settings.overrides[id] = {
          ...existing, fit: normalizeFit(patch.fit ?? existing.fit),
          position: normalizePosition(patch.position ?? existing.position), updatedAt: new Date().toISOString(),
        };
        await saveSettings(settings);
        return clone(settings);
      });
    },
    remove(id) {
      return serialize(async () => {
        await requireId(id);
        const settings = await readSettings();
        delete settings.overrides[id];
        await saveSettings(settings);
        return clone(settings);
      });
    },
    resolveMedia(filename) {
      return serialize(async () => {
        if (!FILE_PATTERN.test(filename)) return null;
        const settings = await readSettings();
        const item = Object.values(settings.overrides).find((value) => value.url === `/user-media/${filename}`);
        return item ? { path: join(mediaDirectory, filename), mime: item.mime } : null;
      });
    },
    exportBundle() {
      return serialize(async () => {
        const settings = await readSettings();
        const items = [];
        let expanded = 1024;
        for (const item of Object.values(settings.overrides)) {
          let bytes;
          try { bytes = await readFile(join(mediaDirectory, filenameFromUrl(item.url))); } catch {
            throw new MediaError(409, 'MEDIA_MISSING', `素材“${item.fileName}”已丢失，请重新上传后再导出。`);
          }
          identifyMedia(bytes, item.mime);
          expanded += 4 * Math.ceil(bytes.length / 3) + 2048;
          if (expanded > MEDIA_LIMITS.expanded) throw new MediaError(413, 'EXPORT_TOO_LARGE', '当前素材总量过大，请压缩较大的视频后再导出素材包。');
          items.push({
            id: item.id, mime: item.mime, fileName: item.fileName,
            fit: item.fit, position: item.position, data: bytes.toString('base64'),
          });
        }
        const bundle = await gzipAsync(Buffer.from(JSON.stringify({
          format: 'jingshan-media', version: 1, exportedAt: new Date().toISOString(), items,
        })));
        if (bundle.length > MEDIA_LIMITS.import) throw new MediaError(413, 'EXPORT_TOO_LARGE', '导出素材包超过 160 MiB，请压缩较大的视频后再试。');
        return bundle;
      });
    },
    importBundle(bundle, { recover = false } = {}) {
      return serialize(async () => {
        if (!Buffer.isBuffer(bundle) || bundle.length > MEDIA_LIMITS.import) {
          throw new MediaError(413, 'IMPORT_TOO_LARGE', '素材包不能超过 160 MiB。');
        }
        let input;
        try {
          const expanded = await gunzipAsync(bundle, { maxOutputLength: MEDIA_LIMITS.expanded });
          input = JSON.parse(expanded.toString('utf8'));
        } catch {
          throw bad('素材包无法解压或内容不正确（解压后不得超过 250 MiB）。请选择导出的 .jingshan-media 文件。');
        }
        if (!input || input.format !== 'jingshan-media' || input.version !== 1 || !Array.isArray(input.items)
          || input.items.length > (await registry).size) throw bad('素材包版本或结构不正确，请选择本应用导出的素材包。');
        const seen = new Set();
        const validated = [];
        for (const item of input.items) {
          if (!item || typeof item !== 'object') throw bad('素材包中有无效的素材记录。');
          await requireId(item.id);
          if (seen.has(item.id)) throw bad('素材包中存在重复的素材位置。');
          seen.add(item.id);
          if (typeof item.data !== 'string' || item.data.length > 4 * Math.ceil(MEDIA_LIMITS.file / 3)
            || item.data.length % 4 || !/^[A-Za-z0-9+/]*={0,2}$/.test(item.data)) throw bad('素材包中的文件编码不正确，或单个素材超过 60 MiB。');
          const bytes = Buffer.from(item.data, 'base64');
          if (bytes.toString('base64') !== item.data) throw bad('素材包中的文件编码不完整。');
          identifyMedia(bytes, item.mime);
          validated.push({
            id: item.id, bytes, mime: item.mime, fileName: cleanFileName(item.fileName),
            fit: normalizeFit(item.fit), position: normalizePosition(item.position),
          });
        }
        // Validate every entry before creating files. The single final rename
        // makes a failed import leave the currently active settings untouched.
        let settings;
        let damagedBytes;
        try {
          settings = await readSettings();
        } catch (error) {
          if (!recover || !(error instanceof MediaError) || error.code !== 'SETTINGS_DAMAGED') throw error;
          damagedBytes = await readFile(settingsFile);
          settings = emptySettings();
        }
        if (recover && !damagedBytes) {
          throw new MediaError(409, 'RECOVERY_NOT_NEEDED', '当前素材设置正常，请使用常规导入；现有设置已保留。');
        }
        for (const item of validated) settings.overrides[item.id] = await createOverride(item.id, item.bytes, item);
        if (damagedBytes) {
          const stamp = new Date().toISOString().replace(/[-:.]/g, '');
          const backup = join(dataDirectory, `media-settings.corrupt-${stamp}-${randomBytes(4).toString('hex')}.json`);
          await writeFile(backup, damagedBytes, { flag: 'wx' });
        }
        await saveSettings(settings);
        return clone(settings);
      });
    },
    copyCurrentTo(targetRoot) {
      return serialize(async () => {
        const settings = await readSettings();
        const destination = join(targetRoot, 'user-data');
        await mkdir(join(destination, 'media'), { recursive: true });
        for (const item of Object.values(settings.overrides)) {
          const filename = filenameFromUrl(item.url);
          const bytes = await readFile(join(mediaDirectory, filename));
          identifyMedia(bytes, item.mime);
          await writeFile(join(destination, 'media', filename), bytes, { flag: 'wx' });
        }
        await atomicJson(join(destination, 'media-settings.json'), settings);
        return Object.keys(settings.overrides).length;
      });
    },
  };
}

function readBytes(request, limit) {
  return new Promise((resolve, reject) => {
    if (Number(request.headers['content-length']) > limit) {
      request.resume();
      reject(new MediaError(413, 'BODY_TOO_LARGE', `发送内容过大，上限为 ${limit / 1024 / 1024} MiB。`));
      return;
    }
    const parts = [];
    let size = 0;
    let finished = false;
    const timer = setTimeout(() => finish(new MediaError(408, 'BODY_TIMEOUT', '素材发送超时，请重试。')), 120_000);
    const finish = (error, bytes) => {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      request.off('data', onData);
      request.off('end', onEnd);
      request.off('aborted', onAborted);
      request.off('error', onAborted);
      if (error) { request.resume(); reject(error); } else resolve(bytes);
    };
    const onData = (chunk) => {
      size += chunk.length;
      if (size > limit) finish(new MediaError(413, 'BODY_TOO_LARGE', `发送内容过大，上限为 ${limit / 1024 / 1024} MiB。`));
      else parts.push(chunk);
    };
    const onEnd = () => finish(null, Buffer.concat(parts, size));
    const onAborted = () => finish(bad('素材未完整发送，请重试。'));
    request.on('data', onData);
    request.once('end', onEnd);
    request.once('aborted', onAborted);
    request.once('error', onAborted);
  });
}

function privateDataPath(url = '') {
  let value = url.split('?')[0];
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try { value = decodeURIComponent(value); } catch { break; }
  }
  return /(?:^|\/)user-data(?:\/|$)/i.test(value.replace(/\\/g, '/'));
}

export function createMediaMiddleware(options = {}) {
  const store = options.store ?? createMediaStore(options);
  return function mediaMiddleware(request, response, next) {
    if (privateDataPath(request.url)) {
      sendJson(response, 404, { error: { code: 'NOT_FOUND', message: '未找到该资源。' } });
      return;
    }
    const path = request.url?.split('?')[0] || '';
    if (path !== API && !path.startsWith(`${API}/`) && !path.startsWith('/user-media/')) return next();
    void (async () => {
      if (!isLocalRequest(request)) throw new MediaError(403, 'LOCAL_ONLY', '素材接口只接受本机页面的同源请求。');
      if (request.headers['content-encoding'] && request.headers['content-encoding'] !== 'identity') throw bad('不支持该请求压缩方式，请重新上传。');
      if (path.startsWith('/user-media/')) {
        if (request.method !== 'GET' && request.method !== 'HEAD') throw new MediaError(405, 'METHOD_NOT_ALLOWED', '素材资源仅支持读取。');
        const resource = await store.resolveMedia(path.slice('/user-media/'.length));
        if (!resource) throw new MediaError(404, 'NOT_FOUND', '未找到该素材。');
        if (resource.mime === 'image/svg+xml') {
          // Apply image-only restrictions even when the SVG URL is opened as a document.
          response.setHeader('Content-Security-Policy', "sandbox; default-src 'none'; style-src 'unsafe-inline'; img-src data:; base-uri 'none'; form-action 'none'; frame-ancestors 'none'");
        }
        await serveFile(request, response, resource.path, resource.mime, { cacheControl: 'private, max-age=31536000, immutable' });
        return;
      }
      if (path === API && request.method === 'GET') {
        sendJson(response, 200, await store.getSettings());
        return;
      }
      if (path === `${API}/export` && request.method === 'GET') {
        const bytes = await store.exportBundle();
        response.writeHead(200, {
          'Content-Type': 'application/octet-stream', 'Content-Length': String(bytes.length),
          'Content-Disposition': `attachment; filename="jingshan-media-${new Date().toISOString().slice(0, 10)}.jingshan-media"`,
          'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff',
        });
        response.end(bytes);
        return;
      }
      if (path === `${API}/import` && request.method === 'POST') {
        const recover = new URL(request.url, 'http://127.0.0.1').searchParams.get('recover') === '1';
        sendJson(response, 200, await store.importBundle(await readBytes(request, MEDIA_LIMITS.import), { recover }));
        return;
      }
      if (path === API || path === `${API}/export` || path === `${API}/import`) {
        throw new MediaError(405, 'METHOD_NOT_ALLOWED', '此操作的请求方式不正确。');
      }
      let id;
      try { id = decodeURIComponent(path.slice(API.length + 1)); } catch { throw bad('素材位置格式不正确。'); }
      await store.requireId(id);
      if (request.method === 'PUT') {
        let fileName;
        try { fileName = decodeURIComponent(request.headers['x-file-name'] || ''); } catch { throw bad('素材文件名编码不正确。'); }
        const url = new URL(request.url, 'http://127.0.0.1');
        const metadata = {
          fileName: cleanFileName(fileName), mime: request.headers['content-type'],
          fit: normalizeFit(url.searchParams.get('fit') ?? 'contain'),
          position: normalizePosition(url.searchParams.get('position') ?? 'center'),
        };
        sendJson(response, 200, await store.upload(id, await readBytes(request, MEDIA_LIMITS.file), metadata));
      } else if (request.method === 'PATCH') {
        if (!/^application\/json(?:;|$)/i.test(request.headers['content-type'] || '')) throw bad('请以 JSON 格式更新显示设置。');
        let patch;
        try { patch = JSON.parse((await readBytes(request, 2048)).toString('utf8')); } catch (error) {
          if (error instanceof MediaError) throw error;
          throw bad('显示设置不是有效的 JSON。');
        }
        sendJson(response, 200, await store.update(id, patch));
      } else if (request.method === 'DELETE') sendJson(response, 200, await store.remove(id));
      else throw new MediaError(405, 'METHOD_NOT_ALLOWED', '请使用上传、更新显示设置或恢复默认操作。');
    })().catch((error) => {
      const safe = error instanceof MediaError ? error : new MediaError(500, 'MEDIA_SERVICE_FAILED', '本机素材服务暂时不可用，请检查目录写入权限后重试。');
      // An early rejection can leave a declared upload body unread. Do not
      // reuse that connection for another HTTP request.
      if (!request.complete) { response.shouldKeepAlive = false; request.resume(); }
      sendJson(response, safe.status, { error: { code: safe.code, message: safe.message } });
    });
  };
}

export function mediaApiPlugin() {
  return {
    name: 'jingshan-local-media-api',
    configureServer(server) {
      server.middlewares.use(createMediaMiddleware({ projectRoot: server.config.root }));
    },
    configurePreviewServer(server) {
      server.middlewares.use(createMediaMiddleware({ projectRoot: server.config.root }));
    },
  };
}
