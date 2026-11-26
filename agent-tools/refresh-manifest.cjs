const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const root = path.resolve(__dirname, '..');

const manifestPath = path.join(root, 'package-manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

let updated = 0;
let missing = 0;
for (const entry of manifest.files) {
  const full = path.join(root, entry.file);
  if (!fs.existsSync(full)) { missing += 1; continue; }
  const bytes = fs.statSync(full).size;
  const sha256 = crypto.createHash('sha256').update(fs.readFileSync(full)).digest('hex');
  if (bytes !== entry.bytes || sha256 !== entry.sha256) {
    console.log(`updated  ${entry.file}  ${entry.bytes} -> ${bytes}`);
    entry.bytes = bytes;
    entry.sha256 = sha256;
    updated += 1;
  }
}
manifest.builtAt = new Date().toISOString();
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
console.log(`\nupdated ${updated} entries, ${missing} missing`);
