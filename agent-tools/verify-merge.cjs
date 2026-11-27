const fs = require('fs');
const path = require('path');
const js = fs.readFileSync(path.join(__dirname, '..', 'dist', 'assets', 'index-CEFoGbBQ.js'), 'utf8');
const checks = [
  ['no conflict markers', !/^(<<<<<<<|=======|>>>>>>>)/m.test(js)],
  ['terrain toolbar branch', js.includes('[`atmosphere`,`terrain`].includes(e)')],
  ['terrain in doc-image state', js.includes('[A,j]=(0,l.useState)(e===`atmosphere`||e===`terrain`)')],
  ['terrain skips auto-advance timer', js.includes('if(!fe||e===`atmosphere`||e===`terrain`)return;')],
  ['terrain demo link', js.includes('"./terrain/index.html"')],
  ['atmosphere demo link kept', js.includes('"./atmosphere/index.html#6"')],
  ['spaces eyebrow text', js.includes('一处门厅 · 两间实验室')],
  ['spaces auto-advance (no hover pause)', /setInterval\(\(\)=>\{if\(seen&&!document\.hidden\)/.test(js)],
  ['spaces autoplay interval 5s', js.includes('},5000);')],
  ['rover practice link kept', js.includes('开始避障练习')],
  ['rover practice page present', fs.existsSync(path.join(__dirname, '..', 'dist', 'rover-practice', 'index.html'))],
  ['terrain classroom present', fs.existsSync(path.join(__dirname, '..', 'dist', 'terrain', 'index.html'))],
];
let ok = true;
for (const [label, pass] of checks) { console.log((pass ? '  OK   ' : '  FAIL ') + label); if (!pass) ok = false; }
process.exit(ok ? 0 : 1);
