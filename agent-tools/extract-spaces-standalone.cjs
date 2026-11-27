// Moves the campus "空间场景" showcase out of the monolithic bundle into a
// standalone page (dist/spaces/index.html).
//
// The bundle keeps a thin iframe shell so the campus deck can still show the
// full-bleed 3D panel, while the page itself becomes an independent file that
// can be opened directly, shared, or edited on its own.
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');

const cssPath = path.join(root, 'dist', 'assets', 'index-CiwR2OEh.css');
const jsPath = path.join(root, 'dist', 'assets', 'index-CEFoGbBQ.js');

let css = fs.readFileSync(cssPath, 'utf8');
let js = fs.readFileSync(jsPath, 'utf8');

function must(source, needle, label, { unique = true } = {}) {
  const at = source.indexOf(needle);
  if (at < 0) throw new Error('NOT FOUND: ' + label);
  if (unique && source.indexOf(needle, at + 1) >= 0) throw new Error('NOT UNIQUE: ' + label);
  return at;
}

// ---------------------------------------------------------------- CSS block
const CSS_START = '._spaces_1aqkz_157{';
const CSS_END = '@media (prefers-reduced-motion:reduce){._spacesTilt_1aqkz_199{transform:none!important;transition:none}'
  + '._spacesOrbit_1aqkz_201{animation:none;transform:scale(1.03)}._spacesDepth_1aqkz_203{animation:none!important}'
  + '._spacesCopy_1aqkz_185{animation:none}._spacesScene_1aqkz_197{transition:opacity .01s}'
  + '._spacesCard_1aqkz_205 img{transition:none}}';

const cssStart = must(css, CSS_START, 'spaces css start', { unique: false });
const cssEnd = must(css, CSS_END, 'spaces css end', { unique: false });
if (cssEnd < cssStart) throw new Error('css markers out of order');

const FRAME_CSS = '._spacesFrame_1aqkz_211{border:0;background:#050505;display:block;width:100%;height:100%;min-height:0}';

css = css.slice(0, cssStart) + FRAME_CSS + css.slice(cssEnd + CSS_END.length);

// ---------------------------------------------------------------- JS map
// Drop the class names that only the inline panel used.
const DEAD_KEYS = [
  'spaces:`_spaces_1aqkz_157`',
  'spacesLayers:`_spacesLayers_1aqkz_173`', 'spacesScene:`_spacesScene_1aqkz_197`',
  'spacesTilt:`_spacesTilt_1aqkz_199`', 'spacesOrbit:`_spacesOrbit_1aqkz_201`',
  'spacesDepth:`_spacesDepth_1aqkz_203`', 'spacesCard:`_spacesCard_1aqkz_205`',
  'spacesCardBack:`_spacesCardBack_1aqkz_207`', 'spacesGhost:`_spacesGhost_1aqkz_209`',
  'spacesScrim:`_spacesScrim_1aqkz_179`', 'spacesOverlay:`_spacesOverlay_1aqkz_181`',
  'spacesEyebrow:`_spacesEyebrow_1aqkz_183`', 'spacesCopy:`_spacesCopy_1aqkz_185`',
  'spacesCaption:`_spacesCaption_1aqkz_187`', 'spacesIndex:`_spacesIndex_1aqkz_189`',
  'spacesIndexItem:`_spacesIndexItem_1aqkz_191`', 'spacesIndexNum:`_spacesIndexNum_1aqkz_193`',
  'spacesIndexLabel:`_spacesIndexLabel_1aqkz_195`',
];
for (const key of DEAD_KEYS) {
  const at = must(js, ',' + key, 'dead map key ' + key);
  js = js.slice(0, at) + js.slice(at + key.length + 1);
}

// Re-attach the frame class next to the last surviving campus key.
const MAP_ANCHOR = 'foundationLinks:`_foundationLinks_1aqkz_155`';
const mapAt = must(js, MAP_ANCHOR, 'css module map anchor');
js = js.slice(0, mapAt + MAP_ANCHOR.length) + ',spacesFrame:`_spacesFrame_1aqkz_211`' + js.slice(mapAt + MAP_ANCHOR.length);

// ---------------------------------------------------------------- component
const COMPONENT = 'function spacesPanel(){'
  + 'let b=(0,l.useRef)(null);'
  + '(0,l.useEffect)(()=>{'
  + 'let t=b.current;'
  + 'if(!t)return;'
  + 'let send=e=>{try{t.contentWindow?.postMessage(e,location.origin)}catch{}};'
  + 'let slide=t;'
  + 'while(slide&&!slide.hasAttribute(`data-active`))slide=slide.parentElement;'
  + 'let sync=()=>send({type:`jingshan:spaces-visible`,visible:slide?slide.getAttribute(`data-active`)===`true`:!0});'
  + 'let mo;'
  + 'if(slide&&typeof MutationObserver==`function`){mo=new MutationObserver(sync);mo.observe(slide,{attributes:!0,attributeFilter:[`data-active`]})}'
  + 't.addEventListener(`load`,sync);'
  + 'sync();'
  + 'let onMessage=e=>{'
  + 'if(e.origin!==location.origin||!e.data||e.data.type!==`jingshan:spaces-key`)return;'
  + 'let deck=t.closest(`[data-presentation-deck]`);'
  + 'if(!deck)return;'
  + 'deck.dispatchEvent(new KeyboardEvent(`keydown`,{key:e.data.key,bubbles:!0,cancelable:!0}))'
  + '};'
  + 'window.addEventListener(`message`,onMessage);'
  + 'return()=>{mo?.disconnect();window.removeEventListener(`message`,onMessage);t.removeEventListener(`load`,sync)}'
  + '},[]);'
  + 'return(0,_.jsx)(`iframe`,{ref:b,className:R.spacesFrame,src:`./spaces/index.html`,'
  + 'title:`空间场景 · 一处门厅 · 两间实验室`,"data-deck-interactive":!0});'
  + '}';

const compStart = must(js, 'function spacesPanel(){', 'component start');
const compEnd = must(js, 'function ct({initialPage', 'component end');
if (compEnd < compStart) throw new Error('component bounds out of order');
js = js.slice(0, compStart) + COMPONENT + js.slice(compEnd);

fs.writeFileSync(cssPath, css, 'utf8');
fs.writeFileSync(jsPath, js, 'utf8');
console.log('css updated:', css.length, 'bytes');
console.log('js updated:', js.length, 'bytes');
