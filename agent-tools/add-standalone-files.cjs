// Registers newly added distributable files in package-manifest.json and
// recomputes bytes + sha256 + staticFiles from the files actually on disk.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.resolve(__dirname, '..');
const manifestPath = path.join(root, 'package-manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

// Every file that ships inside dist/ must be tracked.
const distFiles = [];
function walk(directory, prefix) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const abs = path.join(directory, entry.name);
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) walk(abs, rel);
    else if (entry.isFile()) distFiles.push(`dist/${rel}`);
  }
}
walk(path.join(root, 'dist'), '');

const tracked = new Map(manifest.files.map((f) => [f.file, f]));
const order = [];
for (const f of manifest.files) if (f.file.startsWith('dist/')) order.push(f.file);
for (const f of distFiles) if (!tracked.has(f)) order.push(f);

const files = [];
for (const file of order) {
  const abs = path.join(root, file);
  if (!fs.existsSync(abs)) continue;
  const buf = fs.readFileSync(abs);
  files.push({
    file,
    bytes: buf.length,
    sha256: crypto.createHash('sha256').update(buf).digest('hex'),
  });
}

const nonDist = manifest.files.filter((f) => !f.file.startsWith('dist/'));
for (const f of nonDist) {
  const abs = path.join(root, f.file);
  if (!fs.existsSync(abs)) continue;
  const buf = fs.readFileSync(abs);
  files.push({
    file: f.file,
    bytes: buf.length,
    sha256: crypto.createHash('sha256').update(buf).digest('hex'),
  });
}

manifest.files = files;
manifest.staticFiles = files.filter((f) => f.file.startsWith('dist/')).length;
manifest.builtAt = new Date().toISOString();
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
console.log('manifest updated: files =', files.length, '| staticFiles =', manifest.staticFiles);
console.log('added:', distFiles.filter((f) => !tracked.has(f)).join(', ') || '(none)');
