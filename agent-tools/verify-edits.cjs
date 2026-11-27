// Verifies that a revision differs from its base only by a known set of
// literal replacements. Exits non-zero if the patched result != target.
const cp = require('child_process');

function blob(rev, file) {
  return cp.execFileSync('git', ['cat-file', '-p', `${rev}:${file}`], { maxBuffer: 1e9 }).toString();
}

const [revBase, revTarget, file, editsJson] = process.argv.slice(2);
const EDITS = JSON.parse(fs_read(editsJson));

function fs_read(p) { return require('fs').readFileSync(p, 'utf8'); }

const A = blob(revBase, file);
const B = blob(revTarget, file);

for (const [oldS, newS] of EDITS) {
  const ca = A.split(oldS).length - 1;
  const cb = B.split(newS).length - 1;
  console.log(`  base occurrences=${ca}  target occurrences=${cb}  :: ${oldS.slice(0, 60)}`);
  if (ca !== 1) throw new Error('old literal count != 1 in base');
  if (cb !== 1) throw new Error('new literal count != 1 in target');
}

let patched = A;
for (const [oldS, newS] of EDITS) patched = patched.replace(oldS, newS);
console.log('\npatched === target ?', patched === B);
if (patched !== B) {
  let i = 0;
  while (i < Math.min(patched.length, B.length) && patched[i] === B[i]) i += 1;
  console.log('first diff at', i);
  console.log('patched:', JSON.stringify(patched.slice(i - 100, i + 250)));
  console.log('target :', JSON.stringify(B.slice(i - 100, i + 250)));
  process.exit(1);
}
