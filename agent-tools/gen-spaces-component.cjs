// Builds the campus.spaces component: a full-bleed editorial showcase in the
// style of the reference video —
//   * the photo fills the whole panel (cover, no letterbox)
//   * a slow cross-fade + gentle Ken-Burns drift between the three scenes
//   * a right-edge vertical index (01 / 02 / 03) that drives the scene
//   * large display typography, short copy
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');

const S = {
  foyer: {
    key: 'foyer',
    slotId: 'campus.spaces.foyer',
    label: '门厅 · 迎宾与成果',
    image: '${tt}foyer-welcome.jpg',
    alt: '最终方案图4-4，门厅迎宾形象墙与两室导览',
    title: '门厅与迎宾展示',
    body: '迎宾、导览与成果展示，不计入两间实验室教学面积。',
    position: 'center 28%',
  },
  production: {
    key: 'production',
    slotId: 'campus.spaces.production',
    label: '数字智造工坊',
    image: '${tt}production-main.jpg',
    alt: '最终方案图4-1，数字智造工坊实验室大屏、协作工位与制造设备主视角',
    title: 'AI＋生产实验室',
    body: '四个功能区协同，完成设计—制作—验证的完整链路。',
    position: 'center 32%',
  },
  life: {
    key: 'life',
    slotId: 'campus.spaces.life',
    label: '生活创想空间',
    image: '${tt}life-main.jpg',
    alt: '最终方案图4-2，生活创想空间实验室中心互动台、周边体验区与教学屏幕',
    title: 'AI＋生活实验室',
    body: '三个功能区，让身边物品回应一次有依据的操作。',
    position: 'center 30%',
  },
};

const T = (s) => '`' + s + '`';
const scenes = Object.values(S);

// --- E({section, field, as, className, children}) ---
const E = (section, field, as, cls, children) =>
  '(0,_.jsx)(E,{section:' + T(section)
  + ',field:' + T(field)
  + (as ? ',as:' + T(as) : '')
  + (cls ? ',className:' + cls : '')
  + ',children:' + children
  + '})';

const TXT = (s) => T(s);

// --- scene metadata array ---
const sceneArray = '[' + scenes.map((s, i) => (
  '{key:' + T(s.key)
  + ',slotId:' + T(s.slotId)
  + ',label:' + T(s.label)
  + ',image:' + T(s.image)
  + ',alt:' + T(s.alt)
  + ',title:' + T(s.title)
  + ',body:' + T(s.body)
  + ',position:' + T(s.position)
  + ',num:' + T('0' + (i + 1))
  + '}'
)).join(',') + ']';

// --- background layers: every scene rendered as its own <img> so we can cross-fade ---
const layer = (sc, i) => (
  '(0,_.jsx)(`div`,{className:R.spacesLayer+(s===' + i + '?' + T(' ') + 'R.spacesLayerOn' + T('') + ':' + T('') + '`+R.spacesLayer+``,children:(0,_.jsx)(ve,{slotId:' + sc.slotId + ',src:' + sc.image + ',alt:' + sc.alt + ',fit:`cover`,position:' + sc.position + '},' + sc.slotId + ')})'
);

// Build layer markup more carefully as plain strings.
const layerSrc = (sc, i) => (
  '(0,_.jsx)(`div`,{className:`${R.spacesLayer} ${s===' + i + '?R.spacesLayerOn:``}`,'
  + '"data-scene-layer":' + i + ','
  + 'children:(0,_.jsx)(ve,{slotId:' + T(sc.slotId) + ',src:' + T(sc.image) + ',alt:' + T(sc.alt)
  + ',fit:`cover`,position:' + T(sc.position) + '},' + T(sc.slotId) + ')})'
);
const layers = '(0,_.jsxs)(`div`,{className:R.spacesLayers,children:[' + scenes.map(layerSrc).join(',') + ']})';

// --- right-edge vertical index ---
const indexItem = (sc, i) => (
  '(0,_.jsxs)(`button`,{type:`button`,"aria-pressed":s===' + i
  + ',onClick:()=>n(' + i + '),className:R.spacesIndexItem,children:['
  + '(0,_.jsx)(`span`,{className:R.spacesIndexNum,children:' + T('0' + (i + 1)) + '}),'
  + '(0,_.jsx)(`span`,{className:R.spacesIndexLabel,children:' + E('campus.spaces', sc.key + '.label', null, null, TXT(sc.label)) + '})'
  + ']})'
);
const indexList = '(0,_.jsxs)(`div`,{className:R.spacesIndex,role:`group`,"aria-label":' + T('选择空间场景')
  + ',"data-deck-interactive":!0,children:[' + scenes.map(indexItem).join(',') + ']})';

// --- big display copy ---
const bigCopy = '(0,_.jsxs)(`div`,{className:R.spacesCopy,children:['
  + E('campus.spaces', '${r.key}.title', 'h2', null, 'r.title') + ','
  + E('campus.spaces', '${r.key}.body', 'p', null, 'r.body')
  + ']})';

const eyebrow = '(0,_.jsx)(E,{section:' + T('campus.spaces') + ',field:' + T('heading.1')
  + ',as:`p`,className:R.spacesEyebrow,children:' + TXT('一门一厅 · 三处场景') + '})';

const caption = '(0,_.jsx)(E,{section:' + T('campus.spaces') + ',field:' + T('footnote')
  + ',as:`p`,className:R.spacesCaption,children:' + TXT('参观路线：门厅 → 数字智造工坊 → 生活创想空间') + '})';

const children = '['
  + layers + ','
  + '(0,_.jsx)(`div`,{className:R.spacesScrim,"aria-hidden":`true`}),'
  + '(0,_.jsxs)(`div`,{className:R.spacesOverlay,children:['
  + eyebrow + ','
  + bigCopy + ','
  + caption
  + ']}),'
  + indexList
  + ']';

const out = 'function spacesPanel(){'
  + 'let{customized:e}=w(' + T('campus.spaces') + '),'
  + '[s,n]=(0,l.useState)(0),'
  + 'c=' + sceneArray + ','
  + 'r=c[s];'
  + 'return(0,_.jsxs)(`section`,{className:R.spaces,"aria-label":' + T('门厅与两间实验室的空间场景')
  + ',"data-text-customized":e||void 0,children:' + children + '})}';

const outPath = path.join(__dirname, 'spaces-component.js.txt');
if (!/function spacesPanel\(\)/.test(out)) throw new Error('rename failed');
fs.writeFileSync(outPath, out, 'utf8');
console.log('written', outPath, out.length, 'bytes');

// balance check
let depth = 0; let inStr = null;
for (let i = 0; i < out.length; i++) {
  const c = out[i];
  if (inStr) { if (c === '\\') { i++; continue; } if (c === inStr) inStr = null; continue; }
  if (c === '`' || c === '"' || c === "'") { inStr = c; continue; }
  if (c === '(') depth++; else if (c === ')') depth--;
}
console.log('paren balance:', depth);

// syntax check
const vm = require('vm');
const stub = 'var l={useState:()=>[0,()=>{}],jsx:()=>null,jsxs:()=>null};var _={jsx:()=>null,jsxs:()=>null};var R={};var tt="";var w=()=>({t:()=>"",customized:false});var E=()=>null,D=()=>null,ve=()=>null;';
try { new vm.Script(stub + out, { filename: 'c.js' }); console.log('syntax: OK'); }
catch (e) { console.log('syntax ERROR:', e.message); process.exit(1); }
