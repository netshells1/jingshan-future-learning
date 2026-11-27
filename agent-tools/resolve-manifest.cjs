// Resolves package-manifest.json for the merge:
//   * keeps every file entry that exists on disk
//   * keeps the incoming branch's new terrain/ files
//   * refreshes bytes + sha256 for every tracked file
//   * recomputes staticFiles
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const cp = require('child_process');

const root = path.resolve(__dirname, '..');
const manifestPath = path.join(root, 'package-manifest.json');

function blob(rev, file) {
  return cp.execFileSync('git', ['cat-file', '-p', `${rev}:${file}`], { maxBuffer: 1e9 }).toString();
}

const base = JSON.parse(blob('3e5deef', 'package-manifest.json'));
const ours = JSON.parse(blob('HEAD', 'package-manifest.json'));
const inc = JSON.parse(blob('7eff753', 'package-manifest.json'));

// Collect the union of file entries. The incoming branch contributes the new
// terrain/ files; ours contributes the rover-practice page and the updated
// spaces text. Hashes are recomputed from disk below, so only the *set* of
// files matters here, not who wins on a given entry.
const order = [];
const byFile = new Set();
for (const m of [base, ours, inc]) {
  for (const f of m.files) {
    if (!byFile.has(f.file)) { byFile.add(f.file); order.push(f.file); }
  }
}

// Only keep files that actually exist in the working tree (staged additions
// from the merge are present on disk).
const files = [];
let missing = 0;
const missingList = [];
for (const file of order) {
  const abs = path.join(root, file);
  if (!fs.existsSync(abs)) { missing += 1; missingList.push(file); continue; }
  const buf = fs.readFileSync(abs);
  files.push({
    file,
    bytes: buf.length,
    sha256: crypto.createHash('sha256').update(buf).digest('hex'),
  });
}

const out = { ...ours, files };

// staticFiles counts the distributable files under dist/ that the standalone
// server must serve (see server/standalone.mjs -> staticAllowlist).
out.staticFiles = files.filter((f) => f.file.startsWith('dist/')).length;
out.builtAt = new Date().toISOString();

fs.writeFileSync(manifestPath, JSON.stringify(out, null, 2) + '\n', 'utf8');
console.log('manifest resolved: files =', files.length, '| staticFiles =', out.staticFiles, '| skipped missing =', missing);
if (missingList.length) console.log('missing on disk:', missingList.join(', '));
console.log('new vs ours:', files.filter((f) => !ours.files.some((o) => o.file === f.file)).map((f) => f.file).join(', '));
console.log('dropped vs ours:', ours.files.filter((o) => !files.some((f) => f.file === o.file)).map((o) => o.file).join(', '));
