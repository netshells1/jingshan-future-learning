const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');

const cssPath = path.join(root, 'dist', 'assets', 'index-CiwR2OEh.css');
let css = fs.readFileSync(cssPath, 'utf8');
const before = css.length;

// Remove the previous (v1) spaces block so we can install the new one cleanly.
const start = css.indexOf('._spaces_1aqkz_157{');
if (start < 0) throw new Error('old spaces css not found');
// find the start of the following rule that is not part of the spaces block
const endMarker = '._courseStory_1aqkz_131 ._description_1aqkz_25{';
const end = css.indexOf(endMarker, start);
if (end < 0) throw new Error('spaces css end marker not found');
css = css.slice(0, start) + css.slice(end);

const anchor = endMarker;
if (css.indexOf(anchor) < 0) throw new Error('css anchor not found');

const styles = [
  // ---- container: the whole slide is the photo ----
  '._spaces_1aqkz_157{box-sizing:border-box;width:100%;height:100%;min-height:0;padding:0;overflow:hidden;color:var(--ink,#f5f5f7);position:relative;isolation:isolate}',

  // ---- photo layers (one per scene, cross-faded) ----
  '._spacesLayers_1aqkz_173{position:absolute;inset:0;overflow:hidden}',
  '._spacesLayer_1aqkz_175{opacity:0;transform:scale(1.06);transition:opacity 1.05s cubic-bezier(.4,0,.2,1);position:absolute;inset:0}',
  '._spacesLayerOn_1aqkz_177{opacity:1;animation:8s linear both _spaces-drift_1aqkz_1}',

  // ---- readability scrim: dark at the bottom-left where the copy sits ----
  '._spacesScrim_1aqkz_179{background:linear-gradient(180deg,#05050599 0%,#05050526 26%,#0505051a 52%,#050505d9 88%,#050505f2 100%);position:absolute;inset:0;pointer-events:none}',

  // ---- copy block, bottom-left, like the reference ----
  '._spacesOverlay_1aqkz_181{z-index:2;flex-direction:column;justify-content:flex-end;align-items:flex-start;padding:0 4.2% 8.5%;display:flex;position:absolute;inset:0;pointer-events:none}',
  '._spacesEyebrow_1aqkz_183{color:#e8e8ec;letter-spacing:.22em;text-shadow:0 2px 14px #000a;text-transform:uppercase;margin:0 0 18px;font-size:12px;font-weight:500;line-height:1.4;display:block}',
  '._spacesCopy_1aqkz_185{max-width:26em}',
  '._spacesCopy_1aqkz_185 h2{color:#fff;text-shadow:0 2px 26px #000c;text-wrap:balance;letter-spacing:-.02em;margin:0 0 14px;font-size:clamp(38px,4.6vw,78px);font-weight:600;line-height:1.12}',
  '._spacesCopy_1aqkz_185 p{color:#e3e3e7;text-shadow:0 2px 18px #000b;text-wrap:pretty;margin:0;font-size:clamp(15px,1.15vw,19px);line-height:1.7}',
  '._spacesCaption_1aqkz_187{color:#c3c3c8;text-shadow:0 2px 14px #000a;margin:26px 0 0;font-size:12px;line-height:1.6;display:block}',

  // ---- right-edge vertical index (01 / 02 / 03) ----
  '._spacesIndex_1aqkz_189{z-index:3;justify-content:center;align-items:flex-end;gap:clamp(20px,3.2vh,38px);display:flex;flex-direction:column;position:absolute;top:0;right:clamp(20px,3.4vw,64px);bottom:0}',
  '._spacesIndexItem_1aqkz_191{color:#a9a9b0;cursor:pointer;text-align:right;background:0 0;border:0;justify-content:flex-end;align-items:center;gap:12px;min-height:44px;padding:6px 0;display:flex;transition:color .3s;position:relative}',
  '._spacesIndexItem_1aqkz_191:hover{color:#fff}',
  '._spacesIndexItem_1aqkz_191[aria-pressed=true]{color:#fff}',
  '._spacesIndexNum_1aqkz_193{font-variant-numeric:tabular-nums;letter-spacing:.04em;text-shadow:0 2px 14px #000a;font-size:clamp(20px,1.7vw,28px);font-weight:600;line-height:1;display:block}',
  '._spacesIndexLabel_1aqkz_191{text-shadow:0 2px 14px #000a;white-space:nowrap;font-size:12px;line-height:1.4;display:block}',

  // ---- responsive ----
  '@media (width>=1800px){._spacesOverlay_1aqkz_181{padding-bottom:9%}._spacesCopy_1aqkz_185 h2{font-size:clamp(48px,4.8vw,84px)}._spacesCopy_1aqkz_185 p{font-size:20px}._spacesIndexNum_1aqkz_193{font-size:30px}._spacesIndexLabel_1aqkz_195{font-size:13px}}',
  '@media (width<=1150px){._spacesOverlay_1aqkz_181{padding:0 5% 7%}._spacesCopy_1aqkz_185 h2{font-size:clamp(34px,4.4vw,58px)}._spacesCopy_1aqkz_185 p{font-size:16px}._spacesIndex_1aqkz_189{right:24px;gap:20px}._spacesIndexLabel_1aqkz_195{font-size:11px}}',
  '@media (height<=680px) and (width>=761px){._spacesOverlay_1aqkz_181{padding-bottom:5%}._spacesCopy_1aqkz_185 h2{margin-bottom:10px;font-size:clamp(30px,3.8vw,44px)}._spacesCopy_1aqkz_185 p{font-size:14px}._spacesEyebrow_1aqkz_183{margin-bottom:10px;font-size:11px}._spacesCaption_1aqkz_187{margin-top:14px;font-size:11px}._spacesIndex_1aqkz_189{gap:14px}._spacesIndexNum_1aqkz_193{font-size:20px}}',
  '@media (width<=760px){._spacesOverlay_1aqkz_181{padding:0 6% 6%}._spacesCopy_1aqkz_185{max-width:none}._spacesCopy_1aqkz_185 h2{margin-bottom:10px;font-size:34px}._spacesCopy_1aqkz_185 p{font-size:14px}._spacesEyebrow_1aqkz_183{margin-bottom:12px;font-size:10px}._spacesCaption_1aqkz_187{margin-top:16px;font-size:10px}._spacesIndex_1aqkz_189{right:16px;gap:12px;bottom:auto;top:96px;justify-content:flex-start}._spacesIndexItem_1aqkz_191{min-height:34px;gap:8px}._spacesIndexNum_1aqkz_193{font-size:16px}._spacesIndexLabel_1aqkz_195{font-size:10px}}',
  '@keyframes _spaces-drift_1aqkz_1{0%{transform:scale(1.06)}100%{transform:scale(1)}}',
  '@media (prefers-reduced-motion:reduce){._spacesLayer_1aqkz_175{transition:opacity .01s;transform:none}._spacesLayerOn_1aqkz_177{animation:none;transform:none}}',
].join('');

css = css.replace(anchor, styles + anchor);
fs.writeFileSync(cssPath, css, 'utf8');
console.log('css updated:', before, '->', css.length, 'bytes');
