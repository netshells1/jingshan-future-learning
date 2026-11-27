// Resolves package-manifest.json for a merge:
//   * keeps the union of file entries from both sides
//   * only keeps files that exist on disk
//   * refreshes bytes + sha256 for every tracked file
//   * recomputes staticFiles (the count of distributable files under dist/)
//
// Usage: node agent-tools/resolve-manifest.cjs <baseRev> <oursRev> <incomingRev>
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const cp = require('child_process');

const root = path.resolve(__dirname, '..');
const manifestPath = path.join(root, 'package-manifest.json');

function blob(rev, file) {
  return cp.execFileSync('git', ['cat-file', '-p', `${rev}:${file}`], { maxBuffer: 1e9 }).toString();
}

const [revBase, revOurs, revInc] = process.argv.slice(2);
if (!revBase || !revOurs || !revInc) {
  throw new Error('usage: node resolve-manifest.cjs <baseRev> <oursRev> <incomingRev>');
}

const base = JSON.parse(blob(revBase, 'package-manifest.json'));
const ours = JSON.parse(blob(revOurs, 'package-manifest.json'));
const inc = JSON.parse(blob(revInc, 'package-manifest.json'));

// Union of file paths; only the *set* matters, hashes are recomputed below.
const order = [];
const seen = new Set();
for (const m of [base, ours, inc]) {
  for (const f of m.files) {
    if (!seen.has(f.file)) { seen.add(f.file); order.push(f.file); }
  }
}

const files = [];
const missingList = [];
for (const file of order) {
  const abs = path.join(root, file);
  if (!fs.existsSync(abs)) { missingList.push(file); continue; }
  const buf = fs.readFileSync(abs);
  files.push({
    file,
    bytes: buf.length,
    sha256: crypto.createHash('sha256').update(buf).digest('hex'),
  });
}

const out = { ...ours, files };
out.staticFiles = files.filter((f) => f.file.startsWith('dist/')).length;
out.builtAt = new Date().toISOString();

fs.writeFileSync(manifestPath, JSON.stringify(out, null, 2) + '\n', 'utf8');
console.log('manifest resolved: files =', files.length, '| staticFiles =', out.staticFiles);
if (missingList.length) console.log('missing on disk:', missingList.join(', '));
console.log('new vs ours:', files.filter((f) => !ours.files.some((o) => o.file === f.file)).map((f) => f.file).join(', ') || '(none)');
console.log('dropped vs ours:', ours.files.filter((o) => !files.some((f) => f.file === o.file)).map((o) => o.file).join(', ') || '(none)');
