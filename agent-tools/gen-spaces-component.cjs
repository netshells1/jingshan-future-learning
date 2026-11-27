// Builds the campus.spaces component (v3) — a full-bleed 3D editorial showcase
// modelled on the reference video, whose measured motion profile was:
//   * camera dolly:  scale 0.96 -> 1.08
//   * roll:           up to ~5 deg
//   * pan:            up to ~7% of frame width
//   * parallax:       left/centre/right regions moved at different rates
// The v3 panel therefore layers:
//   .spacesLayers  perspective anchor
//   .spacesScene   per-scene 3D context
//   .spacesTilt    pointer-driven rotateY/rotateX (smoothed in rAF, no re-render)
//   .spacesOrbit   slow continuous 3D orbit
//   .spacesDepth   entry/exit fly-through (rotate + translateZ + scale)
//   .spacesCard    the photo (cross-faded)
//   .spacesCardBack a blurred, pushed-back copy -> real depth halo on tilt
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');

const S = [
  {
    key: 'foyer',
    slotId: 'campus.spaces.foyer',
    label: '门厅 · 迎宾与成果',
    image: '${tt}foyer-welcome.jpg',
    alt: '最终方案图4-4，门厅迎宾形象墙与两室导览',
    title: '门厅与迎宾展示',
    body: '迎宾、导览与成果展示，不计入两间实验室教学面积。',
    position: 'center 28%',
  },
  {
    key: 'production',
    slotId: 'campus.spaces.production',
    label: '数字智造工坊',
    image: '${tt}production-main.jpg',
    alt: '最终方案图4-1，数字智造工坊实验室大屏、协作工位与制造设备主视角',
    title: 'AI＋生产实验室',
    body: '四个功能区协同，完成设计—制作—验证的完整链路。',
    position: 'center 32%',
  },
  {
    key: 'life',
    slotId: 'campus.spaces.life',
    label: '生活创想空间',
    image: '${tt}life-main.jpg',
    alt: '最终方案图4-2，生活创想空间实验室中心互动台、周边体验区与教学屏幕',
    title: 'AI＋生活实验室',
    body: '三个功能区，让身边物品回应一次有依据的操作。',
    position: 'center 30%',
  },
];

const T = (s) => '`' + s + '`';
const scenes = S;

// --- E({section, field, as, className, children}) ---
const E = (section, field, as, cls, children) =>
  '(0,_.jsx)(E,{section:' + T(section)
  + ',field:' + T(field)
  + (as ? ',as:' + T(as) : '')
  + (cls ? ',className:' + cls : '')
  + ',children:' + children
  + '})';

const TXT = (s) => T(s);

// --- scene metadata array (literal, inlined into the bundle) ---
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

// --- one 3D scene: tilt -> orbit -> fly-through -> back card + photo card ---
// Each wrapper is (0,_.jsx)(`div`,{className:R.X,...props,children:INNER}) so the
// nesting has to be built bottom-up or the parens drift.
const div = (cls, inner, props) => (
  '(0,_.jsx)(`div`,{className:R.' + cls + (props ? ',' + props : '') + ',children:' + inner + '})'
);

const sceneNode = (sc, i) => div('spacesScene',
  div('spacesTilt',
    div('spacesOrbit',
      div('spacesDepth', '['
        // blurred depth copy behind -> real depth halo on tilt
        + '(0,_.jsx)(`div`,{className:R.spacesCardBack,children:(0,_.jsx)(ve,{slotId:' + T(sc.slotId) + ',src:' + T(sc.image) + ',alt:' + T('') + ',fit:`cover`,position:' + T(sc.position) + '},' + T(sc.key + '-back') + ')}),'
        // the photo itself
        + '(0,_.jsx)(`div`,{className:R.spacesCard,children:(0,_.jsx)(ve,{slotId:' + T(sc.slotId) + ',src:' + T(sc.image) + ',alt:' + T(sc.alt) + ',fit:`cover`,position:' + T(sc.position) + '},' + T(sc.key) + ')})'
        + ']')
    )
  ),
  '"data-active":s===' + i + '?' + T('true') + ':' + T('false') + ',"data-scene-layer":' + i
);

const layers = '(0,_.jsxs)(`div`,{className:R.spacesLayers,children:[' + scenes.map(sceneNode).join(',') + ']})';

// --- oversized ghost numeral, adds depth behind the copy ---
const ghost = '(0,_.jsx)(`div`,{className:R.spacesGhost,"aria-hidden":`true`,children:r.num})';

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

// --- big display copy (keyed so the 3D entrance replays on every scene change) ---
const bigCopy = '(0,_.jsxs)(`div`,{className:R.spacesCopy,key:r.key,children:['
  + E('campus.spaces', '${r.key}.title', 'h2', null, 'r.title') + ','
  + E('campus.spaces', '${r.key}.body', 'p', null, 'r.body')
  + ']})';

const eyebrow = '(0,_.jsx)(E,{section:' + T('campus.spaces') + ',field:' + T('heading.1')
  + ',as:`p`,className:R.spacesEyebrow,children:' + TXT('一门一厅 · 三处场景') + '})';

const caption = '(0,_.jsx)(E,{section:' + T('campus.spaces') + ',field:' + T('footnote')
  + ',as:`p`,className:R.spacesCaption,children:' + TXT('参观路线：门厅 → 数字智造工坊 → 生活创想空间') + '})';

const children = '['
  + layers + ','
  + ghost + ','
  + '(0,_.jsx)(`div`,{className:R.spacesScrim,"aria-hidden":`true`}),'
  + '(0,_.jsxs)(`div`,{className:R.spacesOverlay,children:['
  + eyebrow + ','
  + bigCopy + ','
  + caption
  + ']}),'
  + indexList
  + ']';

// --- pointer parallax: smoothed in rAF, written straight to CSS vars (no re-render) ---
const parallaxEffect = (
  '(0,l.useEffect)(()=>{'
  + 'let t=b.current;'
  + 'if(!t)return;'
  + 'let g={x:0,y:0},v={x:0,y:0},f=0,on=!1;'
  + 'let run=()=>{'
  + 'v.x+=(g.x-v.x)*.09;v.y+=(g.y-v.y)*.09;'
  + 't.style.setProperty(`--px`,v.x.toFixed(4));'
  + 't.style.setProperty(`--py`,v.y.toFixed(4));'
  + 'if(Math.abs(g.x-v.x)>.001||Math.abs(g.y-v.y)>.001||Math.abs(v.x)>.001||Math.abs(v.y)>.001)f=requestAnimationFrame(run);'
  + 'else{on=!1;f=0}'
  + '};'
  + 'let kick=()=>{if(!on){on=!0;f=requestAnimationFrame(run)}};'
  + 'let mv=e=>{'
  + 'let r=t.getBoundingClientRect();'
  + 'if(!r.width||!r.height)return;'
  + 'g.x=((e.clientX-r.left)/r.width)*2-1;'
  + 'g.y=((e.clientY-r.top)/r.height)*2-1;'
  + 'kick()'
  + '};'
  + 'let en=()=>{hv.current=!0};'
  + 'let le=()=>{hv.current=!1;g.x=0;g.y=0;kick()};'
  + 't.addEventListener(`pointerenter`,en);'
  + 't.addEventListener(`pointermove`,mv);'
  + 't.addEventListener(`pointerleave`,le);'
  + 'return()=>{'
  + 't.removeEventListener(`pointerenter`,en);'
  + 't.removeEventListener(`pointermove`,mv);'
  + 't.removeEventListener(`pointerleave`,le);'
  + 'if(f)cancelAnimationFrame(f)'
  + '}'
  + '},[])'
);

// --- gentle auto-advance: pauses while the pointer rests on the panel, when the
//     panel scrolls out of view, when the tab is hidden, and for reduced motion ---
const autoEffect = (
  '(0,l.useEffect)(()=>{'
  + 'if(typeof matchMedia==`function`&&matchMedia(`(prefers-reduced-motion: reduce)`).matches)return;'
  + 'let t=b.current;'
  + 'if(!t)return;'
  + 'let seen=!1;'
  + 'let io=new IntersectionObserver(e=>{seen=e[0].isIntersecting&&e[0].intersectionRatio>.25},{threshold:[0,.25,.6]});'
  + 'io.observe(t);'
  + 'let i=setInterval(()=>{'
  + 'if(!hv.current&&seen&&!document.hidden)n(x=>(x+1)%' + scenes.length + ')'
  + '},5000);'
  + 'return()=>{clearInterval(i);io.disconnect()}'
  + '},[])'
);

const out = 'function spacesPanel(){'
  + 'let{customized:e}=w(' + T('campus.spaces') + ');'
  + 'let[s,n]=(0,l.useState)(0);'
  + 'let b=(0,l.useRef)(null);'
  + 'let hv=(0,l.useRef)(!1);'
  + parallaxEffect + ';'
  + autoEffect + ';'
  + 'let c=' + sceneArray + ';'
  + 'let r=c[s];'
  + 'return(0,_.jsxs)(`section`,{ref:b,className:R.spaces,"aria-label":' + T('门厅与两间实验室的空间场景')
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
const stub = 'var l={useState:()=>[0,()=>{}],useRef:()=>({current:null}),useEffect:()=>{},jsx:()=>null,jsxs:()=>null};'
  + 'var _={jsx:()=>null,jsxs:()=>null};var R={};var tt="";var w=()=>({t:()=>"",customized:false});var E=()=>null,D=()=>null,ve=()=>null;';
try { new vm.Script(stub + out, { filename: 'c.js' }); console.log('syntax: OK'); }
catch (e) { console.log('syntax ERROR:', e.message); process.exit(1); }
