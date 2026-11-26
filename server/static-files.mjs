import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';

export const STATIC_TYPES = Object.freeze({
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.pdf': 'application/pdf',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.gif': 'image/gif', '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon', '.mp4': 'video/mp4', '.webm': 'video/webm',
  '.glb': 'model/gltf-binary', '.gltf': 'model/gltf+json',
  '.bin': 'application/octet-stream', '.f32': 'application/octet-stream', '.woff': 'font/woff',
  '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.otf': 'font/otf',
});

export function sendJson(response, status, body) {
  if (response.destroyed || response.writableEnded) return;
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff',
  });
  response.end(JSON.stringify(body));
}

export function parseRange(value, size) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(value || '');
  if (!match || (!match[1] && !match[2]) || size < 1) return null;
  let start;
  let end;
  if (!match[1]) {
    const suffix = Number(match[2]);
    if (!Number.isSafeInteger(suffix) || suffix < 1) return null;
    start = Math.max(0, size - suffix);
    end = size - 1;
  } else {
    start = Number(match[1]);
    end = match[2] ? Number(match[2]) : size - 1;
    if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start >= size || start > end) return null;
    end = Math.min(end, size - 1);
  }
  return { start, end };
}

export async function serveFile(request, response, filePath, mime, { cacheControl = 'no-cache' } = {}) {
  let info;
  try { info = await stat(filePath); } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  if (!info?.isFile()) {
    sendJson(response, 404, { error: { code: 'NOT_FOUND', message: '未找到该资源。' } });
    return;
  }
  const headers = {
    'Content-Type': mime, 'X-Content-Type-Options': 'nosniff',
    'Accept-Ranges': 'bytes', 'Cache-Control': cacheControl,
    'Cross-Origin-Resource-Policy': 'same-origin',
  };
  let range;
  if (request.headers.range !== undefined) {
    range = parseRange(request.headers.range, info.size);
    if (!range) {
      response.writeHead(416, { ...headers, 'Content-Range': `bytes */${info.size}`, 'Content-Length': '0' });
      response.end();
      return;
    }
    headers['Content-Range'] = `bytes ${range.start}-${range.end}/${info.size}`;
  }
  headers['Content-Length'] = String(range ? range.end - range.start + 1 : info.size);
  response.writeHead(range ? 206 : 200, headers);
  if (request.method === 'HEAD') { response.end(); return; }
  const stream = createReadStream(filePath, range || undefined);
  stream.once('error', () => response.destroy());
  response.once('close', () => stream.destroy());
  stream.pipe(response);
}
