const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');

const jsPath = path.join(root, 'dist', 'assets', 'index-CEFoGbBQ.js');
const bakPath = path.join(__dirname, 'index-CEFoGbBQ.js.bak');
let js = fs.readFileSync(bakPath, 'utf8'); // start from pristine backup
const before = js.length;

function must(needle, label) {
  const i = js.indexOf(needle);
  if (i < 0) throw new Error('NOT FOUND: ' + label);
  if (js.indexOf(needle, i + 1) >= 0) throw new Error('NOT UNIQUE: ' + label);
  return i;
}

// A. tab label array
const tabOld = 'it=[`小景智能中枢`,`数字智造工坊`,`生活创想空间`,`实验创课空间`,`全域中心`]';
must(tabOld, 'tab array');
js = js.replace(tabOld, 'it=[`小景智能中枢`,`空间场景`,`数字智造工坊`,`生活创想空间`,`实验创课空间`,`全域中心`]');

// B. CSS module map
const cssOld = 'questAction:`_questAction_1aqkz_153`,foundationLinks:`_foundationLinks_1aqkz_155`';
must(cssOld, 'css module map');
js = js.replace(cssOld, 'questAction:`_questAction_1aqkz_153`,foundationLinks:`_foundationLinks_1aqkz_155`,spaces:`_spaces_1aqkz_157`,spacesLayers:`_spacesLayers_1aqkz_173`,spacesLayer:`_spacesLayer_1aqkz_175`,spacesLayerOn:`_spacesLayerOn_1aqkz_177`,spacesScrim:`_spacesScrim_1aqkz_179`,spacesOverlay:`_spacesOverlay_1aqkz_181`,spacesEyebrow:`_spacesEyebrow_1aqkz_183`,spacesCopy:`_spacesCopy_1aqkz_185`,spacesCaption:`_spacesCaption_1aqkz_187`,spacesIndex:`_spacesIndex_1aqkz_189`,spacesIndexItem:`_spacesIndexItem_1aqkz_191`,spacesIndexNum:`_spacesIndexNum_1aqkz_193`,spacesIndexLabel:`_spacesIndexLabel_1aqkz_195`');

// C. component injection
const component = fs.readFileSync(path.join(__dirname, 'spaces-component.js.txt'), 'utf8').trim();
const anchor = 'function ct({initialPage:e=0,index:t,onIndexChange:n,onBoundary:r,onOpen:i})';
must(anchor, 'campus component');
js = js.replace(anchor, component + anchor);

// D. panel insertion
const panelOld = 'p=[(0,_.jsx)($e,{onOpen:i}),(0,_.jsxs)(xe,{images:nt,';
must(panelOld, 'panel array');
js = js.replace(panelOld, 'p=[(0,_.jsx)($e,{onOpen:i}),(0,_.jsx)(spacesPanel,{}),(0,_.jsxs)(xe,{images:nt,');

// D2. chapter page counts: campus gains the new 空间场景 page (5 -> 6)
const urOld = 'var ur=[5,5,3,8]';
must(urOld, 'chapter page counts');
js = js.replace(urOld, 'var ur=[5,6,3,8]');

// E. re-embed registries
function buildLiteral(obj) {
  return JSON.stringify(obj).replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}
function replaceEmbedded(source, marker, obj, label) {
  const at = source.indexOf(marker);
  if (at < 0) throw new Error('registry not found: ' + label);
  const start = source.indexOf('JSON.parse(`', at) + 'JSON.parse(`'.length;
  let i = start;
  for (; i < source.length; i += 1) {
    if (source[i] === '`') {
      let bs = 0, j = i - 1;
      while (source[j] === '\\') { bs += 1; j -= 1; }
      if (bs % 2 === 0) break;
    }
  }
  if (i >= source.length) throw new Error('unterminated literal: ' + label);
  return source.slice(0, start) + buildLiteral(obj) + source.slice(i);
}

const sharedText = JSON.parse(fs.readFileSync(path.join(root, 'shared', 'text-sections.json'), 'utf8'));
const sharedMedia = JSON.parse(fs.readFileSync(path.join(root, 'shared', 'media-slots.json'), 'utf8'));

js = replaceEmbedded(js, 'JSON.parse(`[{"id":"concept.hero","title"', sharedText, 'text');
js = replaceEmbedded(js, 'JSON.parse(`[{"id":"concept.hero","group":"concept","section"', sharedMedia, 'media');

fs.writeFileSync(jsPath, js, 'utf8');
console.log('bundle updated:', before, '->', js.length, 'bytes');
