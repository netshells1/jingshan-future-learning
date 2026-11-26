// Builds the v3 CSS for the campus.spaces 3D panel and patches it into
// dist/assets/index-CiwR2OEh.css, plus rewrites the CSS module map in the JS
// bundle.
//
// The motion profile was measured off the reference video with optical flow:
//   * camera dolly   scale 0.96 -> 1.08 over ~1.5 s
//   * roll           up to ~5 deg
//   * pan            up to ~7% of the frame width
//   * parallax       left / centre / right regions moving at different rates
// So the CSS layers: perspective -> tilt (pointer) -> orbit (slow) ->
// depth (fly-through on scene change) -> photo card + blurred depth copy.
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');

const cssPath = path.join(root, 'dist', 'assets', 'index-CiwR2OEh.css');
const jsPath = path.join(root, 'dist', 'assets', 'index-CEFoGbBQ.js');

let css = fs.readFileSync(cssPath, 'utf8');
let js = fs.readFileSync(jsPath, 'utf8');

// ---------------------------------------------------------------- CSS block
const CSS = `
._spaces_1aqkz_157{--px:0;--py:0;box-sizing:border-box;width:100%;height:100%;min-height:0;padding:0;overflow:hidden;color:var(--ink,#f5f5f7);position:relative;isolation:isolate;perspective:1400px;perspective-origin:50% 50%}
._spacesLayers_1aqkz_173{position:absolute;inset:0;overflow:hidden;transform-style:preserve-3d}
._spacesScene_1aqkz_197{position:absolute;inset:0;opacity:0;visibility:hidden;transform-style:preserve-3d;transition:opacity .9s cubic-bezier(.4,0,.2,1),visibility 0s linear .9s}
._spacesScene_1aqkz_197[data-active=true]{opacity:1;visibility:visible;transition:opacity .9s cubic-bezier(.4,0,.2,1),visibility 0s}
._spacesTilt_1aqkz_199{position:absolute;inset:0;transform-style:preserve-3d;transform:rotateX(calc(var(--py) * -3.4deg)) rotateY(calc(var(--px) * 5.2deg));transition:transform .5s cubic-bezier(.22,.61,.36,1)}
._spacesOrbit_1aqkz_201{position:absolute;inset:0;transform-style:preserve-3d;animation:_spaces-orbit_1aqkz_1 26s ease-in-out infinite}
._spacesDepth_1aqkz_203{position:absolute;inset:0;transform-style:preserve-3d}
._spacesCard_1aqkz_205{position:absolute;inset:0;overflow:hidden;transform:translateZ(0) scale(1.08);backface-visibility:hidden;will-change:transform}
._spacesCard_1aqkz_205 img{transform:scale(1.02);transition:transform 1.4s cubic-bezier(.2,.7,.3,1)}
._spacesCardBack_1aqkz_207{position:absolute;inset:-3%;overflow:hidden;opacity:.55;transform:translateZ(-90px) scale(1.14);filter:blur(16px) saturate(1.15);backface-visibility:hidden;pointer-events:none}
._spacesScrim_1aqkz_179{background:linear-gradient(180deg,#05050599 0%,#05050526 26%,#0505051a 52%,#050505d9 88%,#050505f2 100%);position:absolute;inset:0;pointer-events:none;z-index:2}
._spacesOverlay_1aqkz_181{z-index:3;flex-direction:column;justify-content:flex-end;align-items:flex-start;padding:0 4.2% 8.5%;display:flex;position:absolute;inset:0;pointer-events:none;transform-style:preserve-3d;transform:translateZ(60px)}
._spacesGhost_1aqkz_209{z-index:1;color:#ffffff0f;font-variant-numeric:tabular-nums;letter-spacing:-.04em;pointer-events:none;user-select:none;position:absolute;top:50%;right:6%;font-size:clamp(200px,32vw,520px);font-weight:800;line-height:.8;transform:translateY(-50%) translateZ(-40px)}
._spacesEyebrow_1aqkz_183{color:#e8e8ec;letter-spacing:.22em;text-shadow:0 2px 14px #000a;text-transform:uppercase;margin:0 0 18px;font-size:12px;font-weight:500;line-height:1.4;display:block}
._spacesCopy_1aqkz_185{max-width:26em;animation:_spaces-rise_1aqkz_1 .95s cubic-bezier(.16,.84,.32,1) both}
._spacesCopy_1aqkz_185 h2{color:#fff;text-shadow:0 2px 26px #000c;text-wrap:balance;letter-spacing:-.02em;margin:0 0 14px;font-size:clamp(38px,4.6vw,78px);font-weight:600;line-height:1.12}
._spacesCopy_1aqkz_185 p{color:#e3e3e7;text-shadow:0 2px 18px #000b;text-wrap:pretty;margin:0;font-size:clamp(15px,1.15vw,19px);line-height:1.7}
._spacesCaption_1aqkz_187{color:#c3c3c8;text-shadow:0 2px 14px #000a;margin:26px 0 0;font-size:12px;line-height:1.6;display:block}
._spacesIndex_1aqkz_189{z-index:4;justify-content:center;align-items:flex-end;gap:clamp(20px,3.2vh,38px);display:flex;flex-direction:column;position:absolute;top:0;right:clamp(20px,3.4vw,64px);bottom:0;transform-style:preserve-3d;transform:translateZ(90px)}
._spacesIndexItem_1aqkz_191{color:#a9a9b0;cursor:pointer;text-align:right;background:0 0;border:0;justify-content:flex-end;align-items:center;gap:12px;min-height:44px;padding:6px 0;display:flex;transition:color .3s,transform .45s cubic-bezier(.2,.8,.3,1);position:relative}
._spacesIndexItem_1aqkz_191:hover{color:#fff;transform:translateX(-6px)}
._spacesIndexItem_1aqkz_191[aria-pressed=true]{color:#fff;transform:translateX(-12px)}
._spacesIndexNum_1aqkz_193{font-variant-numeric:tabular-nums;letter-spacing:.04em;text-shadow:0 2px 14px #000a;font-size:clamp(20px,1.7vw,28px);font-weight:600;line-height:1;display:block;transition:text-shadow .35s}
._spacesIndexItem_1aqkz_191[aria-pressed=true] ._spacesIndexNum_1aqkz_193{text-shadow:0 0 26px #ffffff5c}
._spacesIndexLabel_1aqkz_195{text-shadow:0 2px 14px #000a;white-space:nowrap;font-size:12px;line-height:1.4;display:block}
@keyframes _spaces-orbit_1aqkz_1{0%{transform:rotateY(-4deg) rotateX(1.6deg) scale(1.035)}50%{transform:rotateY(4deg) rotateX(-1.4deg) scale(1.085)}100%{transform:rotateY(-4deg) rotateX(1.6deg) scale(1.035)}}
@keyframes _spaces-rise_1aqkz_1{0%{opacity:0;transform:translateY(34px) rotateX(-9deg)}100%{opacity:1;transform:none}}
@keyframes _spaces-fly_1aqkz_1{0%{opacity:0;transform:translateZ(-340px) rotateY(26deg) scale(1.02)}18%{opacity:1}100%{opacity:1;transform:none}}
._spacesScene_1aqkz_197[data-active=true] ._spacesDepth_1aqkz_203{animation:_spaces-fly_1aqkz_1 1.25s cubic-bezier(.16,.84,.32,1) both}
@media (width>=1800px){._spacesOverlay_1aqkz_181{padding-bottom:9%}._spacesCopy_1aqkz_185 h2{font-size:clamp(48px,4.8vw,84px)}._spacesCopy_1aqkz_185 p{font-size:20px}._spacesIndexNum_1aqkz_193{font-size:30px}._spacesIndexLabel_1aqkz_195{font-size:13px}._spacesGhost_1aqkz_209{font-size:clamp(280px,34vw,600px)}}
@media (width<=1150px){._spacesOverlay_1aqkz_181{padding:0 5% 7%}._spacesCopy_1aqkz_185 h2{font-size:clamp(34px,4.4vw,58px)}._spacesCopy_1aqkz_185 p{font-size:16px}._spacesIndex_1aqkz_189{right:24px;gap:20px}._spacesIndexLabel_1aqkz_195{font-size:11px}._spacesGhost_1aqkz_209{right:4%;font-size:clamp(160px,30vw,320px)}}
@media (height<=680px) and (width>=761px){._spacesOverlay_1aqkz_181{padding-bottom:5%}._spacesCopy_1aqkz_185 h2{margin-bottom:10px;font-size:clamp(30px,3.8vw,44px)}._spacesCopy_1aqkz_185 p{font-size:14px}._spacesEyebrow_1aqkz_183{margin-bottom:10px;font-size:11px}._spacesCaption_1aqkz_187{margin-top:14px;font-size:11px}._spacesIndex_1aqkz_189{gap:14px}._spacesIndexNum_1aqkz_193{font-size:20px}._spacesGhost_1aqkz_209{font-size:clamp(140px,26vw,280px)}}
@media (width<=760px){._spacesOverlay_1aqkz_181{padding:0 6% 6%}._spacesCopy_1aqkz_185{max-width:none}._spacesCopy_1aqkz_185 h2{margin-bottom:10px;font-size:34px}._spacesCopy_1aqkz_185 p{font-size:14px}._spacesEyebrow_1aqkz_183{margin-bottom:12px;font-size:10px}._spacesCaption_1aqkz_187{margin-top:16px;font-size:10px}._spacesIndex_1aqkz_189{right:16px;gap:12px;bottom:auto;top:96px;justify-content:flex-start}._spacesIndexItem_1aqkz_191{min-height:34px;gap:8px}._spacesIndexNum_1aqkz_193{font-size:16px}._spacesIndexLabel_1aqkz_195{font-size:10px}._spacesGhost_1aqkz_209{display:none}._spaces_1aqkz_157{perspective:900px}}
@media (prefers-reduced-motion:reduce){._spacesTilt_1aqkz_199{transform:none!important;transition:none}._spacesOrbit_1aqkz_201{animation:none;transform:scale(1.03)}._spacesDepth_1aqkz_203{animation:none!important}._spacesCopy_1aqkz_185{animation:none}._spacesScene_1aqkz_197{transition:opacity .01s}._spacesCard_1aqkz_205 img{transition:none}}
`;

// Remove the previous spaces CSS block: everything from the old
// `._spaces_1aqkz_157{` up to (but not including) the next module's first rule.
const startMarker = '._spaces_1aqkz_157{';
const endMarker = '._courseStory_1aqkz_131 ._description_1aqkz_25{';
const sAt = css.indexOf(startMarker);
const eAt = css.indexOf(endMarker);
if (sAt < 0) throw new Error('spaces css start not found');
if (eAt < 0) throw new Error('spaces css end not found');
if (eAt < sAt) throw new Error('css markers out of order');
css = css.slice(0, sAt) + CSS.trim() + css.slice(eAt);

// ---------------------------------------------------------------- JS map
const mapOld = '';  // handled below (v2 -> v3, idempotent)

function must(src, needle, label) {
  const i = src.indexOf(needle);
  if (i < 0) throw new Error('NOT FOUND: ' + label);
  if (src.indexOf(needle, i + 1) >= 0) throw new Error('NOT UNIQUE: ' + label);
  return i;
}
// The map may already be the v3 one if the script is re-run; accept either.
const mapV2 = 'spaces:`_spaces_1aqkz_157`,spacesLayers:`_spacesLayers_1aqkz_173`,spacesLayer:`_spacesLayer_1aqkz_175`,spacesLayerOn:`_spacesLayerOn_1aqkz_177`,spacesScrim:`_spacesScrim_1aqkz_179`,spacesOverlay:`_spacesOverlay_1aqkz_181`,spacesEyebrow:`_spacesEyebrow_1aqkz_183`,spacesCopy:`_spacesCopy_1aqkz_185`,spacesCaption:`_spacesCaption_1aqkz_187`,spacesIndex:`_spacesIndex_1aqkz_189`,spacesIndexItem:`_spacesIndexItem_1aqkz_191`,spacesIndexNum:`_spacesIndexNum_1aqkz_193`,spacesIndexLabel:`_spacesIndexLabel_1aqkz_195`';
const mapV3 = 'spaces:`_spaces_1aqkz_157`,spacesLayers:`_spacesLayers_1aqkz_173`,spacesScene:`_spacesScene_1aqkz_197`,spacesTilt:`_spacesTilt_1aqkz_199`,spacesOrbit:`_spacesOrbit_1aqkz_201`,spacesDepth:`_spacesDepth_1aqkz_203`,spacesCard:`_spacesCard_1aqkz_205`,spacesCardBack:`_spacesCardBack_1aqkz_207`,spacesGhost:`_spacesGhost_1aqkz_209`,spacesScrim:`_spacesScrim_1aqkz_179`,spacesOverlay:`_spacesOverlay_1aqkz_181`,spacesEyebrow:`_spacesEyebrow_1aqkz_183`,spacesCopy:`_spacesCopy_1aqkz_185`,spacesCaption:`_spacesCaption_1aqkz_187`,spacesIndex:`_spacesIndex_1aqkz_189`,spacesIndexItem:`_spacesIndexItem_1aqkz_191`,spacesIndexNum:`_spacesIndexNum_1aqkz_193`,spacesIndexLabel:`_spacesIndexLabel_1aqkz_195`';
const mapNew = mapV3;
if (js.includes(mapV2)) js = js.replace(mapV2, mapNew);
else must(js, mapV3, 'css module map (v3)');

// ---------------------------------------------------------------- component
const component = fs.readFileSync(path.join(__dirname, 'spaces-component.js.txt'), 'utf8').trim();
const compStart = js.indexOf('function spacesPanel(){');
const compEnd = js.indexOf('function ct({initialPage');
if (compStart < 0 || compEnd < 0 || compEnd < compStart) throw new Error('component bounds not found');
js = js.slice(0, compStart) + component + js.slice(compEnd);

fs.writeFileSync(cssPath, css, 'utf8');
fs.writeFileSync(jsPath, js, 'utf8');
console.log('css updated:', css.length, 'bytes');
console.log('js updated:', js.length, 'bytes');
