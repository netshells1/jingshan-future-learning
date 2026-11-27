// Verifies that the incoming bundle revision differs from base only by a known
// set of literal replacements.
const cp = require('child_process');

function blob(rev, file) {
  return cp.execFileSync('git', ['cat-file', '-p', `${rev}:${file}`], { maxBuffer: 1e9 }).toString();
}

const [revBase, revInc, file] = process.argv.slice(2);
const A = blob(revBase, file);
const B = blob(revInc, file);

const EDITS = [
  [
    '[A,j]=(0,l.useState)(e===`atmosphere`)',
    '[A,j]=(0,l.useState)(e===`atmosphere`||e===`terrain`)',
  ],
  [
    'if(!fe||e===`atmosphere`)return;',
    'if(!fe||e===`atmosphere`||e===`terrain`)return;',
  ],
  [
    'children:e===`atmosphere`?[(0,_.jsx)(`button`,{type:`button`,"aria-pressed":A,onClick:()=>{V.current=!0,j(!0)},children:`文档配图`}),(0,_.jsx)(`button`,{type:`button`,onClick:()=>{V.current=!0,window.location.assign("./atmosphere/index.html#6")},children:`自动演示`})]',
    'children:[`atmosphere`,`terrain`].includes(e)?[(0,_.jsx)(`button`,{type:`button`,"aria-pressed":A,onClick:()=>{V.current=!0,j(!0)},children:`文档配图`}),(0,_.jsx)(`button`,{type:`button`,onClick:()=>{V.current=!0,window.location.assign(e===`atmosphere`?"./atmosphere/index.html#6":"./terrain/index.html")},children:`自动演示`})]',
  ],
];

// Work out how many times each old literal appears in A.
for (const [oldS, newS] of EDITS) {
  const countA = A.split(oldS).length - 1;
  const countB = B.split(newS).length - 1;
  console.log(`old count in base: ${countA} | new count in inc: ${countB}`);
  if (countA !== 1) throw new Error('old literal not unique in base: ' + oldS.slice(0, 60));
  if (countB !== 1) throw new Error('new literal not unique in inc: ' + newS.slice(0, 60));
}

// Apply the edits to A and compare with B.
let patched = A;
for (const [oldS, newS] of EDITS) patched = patched.replace(oldS, newS);
console.log('\npatched === inc ?', patched === B);
if (patched !== B) {
  // locate the residual difference
  let i = 0;
  while (i < Math.min(patched.length, B.length) && patched[i] === B[i]) i += 1;
  console.log('first difference at', i);
  console.log('patched:', JSON.stringify(patched.slice(i - 80, i + 200)));
  console.log('inc    :', JSON.stringify(B.slice(i - 80, i + 200)));
}
