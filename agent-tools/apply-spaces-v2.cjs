// Patch the v2 (full-bleed editorial) spaces component + CSS module map into the
// already-shipped v1 bundle, in place.
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');

const jsPath = path.join(root, 'dist', 'assets', 'index-CEFoGbBQ.js');
let js = fs.readFileSync(jsPath, 'utf8');
const before = js.length;

function must(needle, label) {
  const i = js.indexOf(needle);
  if (i < 0) throw new Error('NOT FOUND: ' + label);
  if (js.indexOf(needle, i + 1) >= 0) throw new Error('NOT UNIQUE: ' + label);
  return i;
}

// A. CSS module map: swap the v1 class names for the v2 set.
const mapOld = 'spaces:`_spaces_1aqkz_157`,spacesStage:`_spacesStage_1aqkz_159`,spacesMedia:`_spacesMedia_1aqkz_161`,spacesRail:`_spacesRail_1aqkz_163`,spacesCard:`_spacesCard_1aqkz_165`,spacesBody:`_spacesBody_1aqkz_167`,spacesLabel:`_spacesLabel_1aqkz_169`,spacesText:`_spacesText_1aqkz_171`';
must(mapOld, 'css module map');
const mapNew = 'spaces:`_spaces_1aqkz_157`,spacesLayers:`_spacesLayers_1aqkz_173`,spacesLayer:`_spacesLayer_1aqkz_175`,spacesLayerOn:`_spacesLayerOn_1aqkz_177`,spacesScrim:`_spacesScrim_1aqkz_179`,spacesOverlay:`_spacesOverlay_1aqkz_181`,spacesEyebrow:`_spacesEyebrow_1aqkz_183`,spacesCopy:`_spacesCopy_1aqkz_185`,spacesCaption:`_spacesCaption_1aqkz_187`,spacesIndex:`_spacesIndex_1aqkz_189`,spacesIndexItem:`_spacesIndexItem_1aqkz_191`,spacesIndexNum:`_spacesIndexNum_1aqkz_193`,spacesIndexLabel:`_spacesIndexLabel_1aqkz_195`';
js = js.replace(mapOld, mapNew);

// B. Replace the component body.
const component = fs.readFileSync(path.join(__dirname, 'spaces-component.js.txt'), 'utf8').trim();
const compOld = js.slice(js.indexOf('function spacesPanel(){'), js.indexOf('function ct({initialPage'));
js = js.replace(compOld, component);

// C. Re-embed registries.
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
