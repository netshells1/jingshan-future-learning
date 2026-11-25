import { createHash, randomUUID } from 'node:crypto';
import { createServer } from 'node:http';
import { mkdir, readFile, readdir, rename, unlink, writeFile } from 'node:fs/promises';
import { extname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createXiaojingMiddleware, isLocalRequest } from './deepseek-plugin.mjs';
import { createMediaMiddleware } from './media-plugin.mjs';
import { createTextMiddleware } from './text-plugin.mjs';
import { sendJson, serveFile, STATIC_TYPES } from './static-files.mjs';

export function projectIdentity(projectRoot) {
  const normalized = resolve(projectRoot).replaceAll('\\', '/');
  return createHash('sha256').update(process.platform === 'win32' ? normalized.toLowerCase() : normalized).digest('hex');
}

export async function staticAllowlist(distDirectory) {
  const files = new Map();
  async function visit(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      // Distribution files only; never follow junctions or symlinks into source.
      if (entry.isSymbolicLink() || entry.name.startsWith('.')) continue;
      const path = join(directory, entry.name);
      if (entry.isDirectory()) await visit(path);
      else if (entry.isFile() && Object.hasOwn(STATIC_TYPES, extname(entry.name).toLowerCase())) {
        const route = '/' + relative(distDirectory, path).split(sep).join('/');
        files.set(route, { path, mime: STATIC_TYPES[extname(entry.name).toLowerCase()] });
      }
    }
  }
  await visit(distDirectory);
  if (!files.has('/index.html')) throw new Error('缺少 dist/index.html，请重新解压完整的一键运行包。');
  return files;
}

export async function createStandaloneServer({
  projectRoot = fileURLToPath(new URL('../', import.meta.url)),
  environment = process.env, readCredential, fetchImpl,
} = {}) {
  const assets = await staticAllowlist(join(projectRoot, 'dist'));
  const rootId = projectIdentity(projectRoot);
  const instanceId = randomUUID();
  const chat = createXiaojingMiddleware({
    projectRoot, environment,
    ...(readCredential ? { readCredential } : {}),
    ...(fetchImpl ? { fetchImpl } : {}),
  });
  const media = createMediaMiddleware({ projectRoot });
  const text = createTextMiddleware({ projectRoot });
  const server = createServer((request, response) => {
    if (!isLocalRequest(request)) {
      sendJson(response, 403, { error: { code: 'LOCAL_ONLY', message: '此演示仅允许本机访问。' } });
      return;
    }
    chat(request, response, () => media(request, response, () => text(request, response, () => {
      void (async () => {
        let route;
        try { route = decodeURIComponent((request.url || '/').split('?')[0]); } catch {
          sendJson(response, 400, { error: { code: 'INVALID_PATH', message: '资源地址不正确。' } });
          return;
        }
        if (route === '/api/local-status' && request.method === 'GET') {
          sendJson(response, 200, {
            app: 'jingshan-proposal', version: 1, rootId, instanceId,
            pid: process.pid, port: server.address()?.port,
          });
          return;
        }
        if (request.method !== 'GET' && request.method !== 'HEAD') {
          sendJson(response, 405, { error: { code: 'METHOD_NOT_ALLOWED', message: '此资源只支持读取。' } });
          return;
        }
        if (route === '/') route = '/index.html';
        const asset = assets.get(route);
        if (!asset) {
          sendJson(response, 404, { error: { code: 'NOT_FOUND', message: '未找到该资源。' } });
          return;
        }
        await serveFile(request, response, asset.path, asset.mime);
      })().catch(() => sendJson(response, 500, { error: { code: 'STATIC_FAILED', message: '页面资源暂时无法读取，请重新启动演示。' } }));
    })));
  });
  server.requestTimeout = 180_000;
  server.headersTimeout = 30_000;
  return { server, rootId, instanceId };
}

async function listenAvailable(server, startPort, maxPort) {
  for (let port = startPort; port <= maxPort; port += 1) {
    try {
      await new Promise((accept, reject) => {
        const onError = (error) => { server.off('listening', onListen); reject(error); };
        const onListen = () => { server.off('error', onError); accept(); };
        server.once('error', onError);
        server.once('listening', onListen);
        server.listen(port, '127.0.0.1');
      });
      return port;
    } catch (error) {
      if (error.code !== 'EADDRINUSE' && error.code !== 'EACCES') throw error;
    }
  }
  throw new Error(`${startPort}—${maxPort} 端口均不可用。请关闭另一份本演示后重试；不会停止其他应用。`);
}

export async function runStandalone({
  projectRoot = fileURLToPath(new URL('../', import.meta.url)),
  startPort = 1430, maxPort = 1440,
} = {}) {
  const { server, rootId, instanceId } = await createStandaloneServer({ projectRoot });
  const port = await listenAvailable(server, startPort, maxPort);
  const localDirectory = join(projectRoot, '.local');
  const statePath = join(localDirectory, 'server-state.json');
  const temporary = `${statePath}.${process.pid}.tmp`;
  try {
    await mkdir(localDirectory, { recursive: true });
    await writeFile(temporary, JSON.stringify({
      app: 'jingshan-proposal', version: 1, pid: process.pid, port, rootId, instanceId,
      startedAt: new Date().toISOString(), nodePath: process.execPath,
      serverPath: fileURLToPath(import.meta.url),
    }, null, 2) + '\n');
    await rename(temporary, statePath);
  } catch (error) { server.close(); throw error; }
  let stopping = false;
  const shutdown = async () => {
    if (stopping) return;
    stopping = true;
    try {
      const state = JSON.parse(await readFile(statePath, 'utf8'));
      if (state.instanceId === instanceId) await unlink(statePath);
    } catch { /* An already removed state file is harmless. */ }
    server.closeAllConnections();
    server.close(() => process.exit(0));
  };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
  console.log(`景山演示已启动：http://127.0.0.1:${port}/`);
  return { server, port, rootId, instanceId };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  let startPort = 1430;
  let maxPort = 1440;
  for (let index = 0; index < args.length; index += 2) {
    const value = Number(args[index + 1]);
    if (!['--port', '--max-port'].includes(args[index]) || !Number.isInteger(value) || value < 1024 || value > 65535) {
      console.error('启动参数不正确。');
      process.exit(1);
    }
    if (args[index] === '--port') startPort = value;
    else maxPort = value;
  }
  if (maxPort < startPort || maxPort - startPort > 10) {
    console.error('启动端口范围不正确。');
    process.exit(1);
  }
  runStandalone({ startPort, maxPort }).catch((error) => {
    const safe = /缺少 dist|端口均不可用/.test(error.message) ? error.message : '演示未能启动。请确认已完整解压，且所在目录允许写入。';
    console.error(safe);
    process.exitCode = 1;
  });
}
