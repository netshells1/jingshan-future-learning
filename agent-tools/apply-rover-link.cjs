// Re-apply the incoming branch's bundle change (the "开始避障练习" link) on top of
// the current worktree bundle, without clobbering our spaces 3D work.
//
// The incoming branch (MERGE_HEAD) inserted exactly one expression:
//   e===`rover`&&(0,_.jsx)(`a`,{className:U.handsOn,href:`./rover-practice/index.html`,children:`开始避障练习`}),
// right after `(0,_.jsx)(D,{section:i}),` and before the `t&&(0,_.jsxs)(`button`` that
// renders the "亲手体验" button.
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');

const jsPath = path.join(root, 'dist', 'assets', 'index-CEFoGbBQ.js');
let js = fs.readFileSync(jsPath, 'utf8');

const INS = 'e===`rover`&&(0,_.jsx)(`a`,{className:U.handsOn,href:`./rover-practice/index.html`,children:`开始避障练习`})';
const ANCHOR = '(0,_.jsx)(D,{section:i}),t&&(0,_.jsxs)(`button`,{type:`button`,className:U.handsOn,onClick:t,children:[e===`robot`';

if (js.includes(INS)) {
  console.log('already applied - nothing to do');
  process.exit(0);
}

const hits = [];
let i = 0;
while ((i = js.indexOf(ANCHOR, i)) >= 0) { hits.push(i); i += 1; }
if (hits.length !== 1) throw new Error('anchor not unique: ' + hits.length + ' hits');

const at = hits[0];
const cut = at + '(0,_.jsx)(D,{section:i}),'.length;
js = js.slice(0, cut) + INS + ',' + js.slice(cut);

fs.writeFileSync(jsPath, js, 'utf8');
console.log('rover link inserted at', cut, '-> bundle', js.length, 'chars');
