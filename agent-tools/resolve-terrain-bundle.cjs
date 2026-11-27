// Resolves the bundle conflict by taking ours (HEAD) and applying the three
// literal edits that the incoming branch (7eff753) introduced for the
// contour-3d / terrain classroom.
const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, '..', 'dist', 'assets', 'index-CEFoGbBQ.js');
let js = fs.readFileSync(jsPath, 'utf8');

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

for (const [oldS, newS] of EDITS) {
  const count = js.split(oldS).length - 1;
  if (count !== 1) throw new Error('expected exactly 1 occurrence, got ' + count + ' for: ' + oldS.slice(0, 70));
  js = js.replace(oldS, newS);
}

fs.writeFileSync(jsPath, js, 'utf8');
console.log('bundle resolved:', js.length, 'bytes');
