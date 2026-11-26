const fs = require('fs');
const path = require('path');
const vm = require('vm');
const root = path.resolve(__dirname, '..');
const jsPath = path.join(root, 'dist', 'assets', 'index-CEFoGbBQ.js');
const js = fs.readFileSync(jsPath, 'utf8');

if (typeof vm.SourceTextModule === 'undefined') {
  let src = js
    .replace(/import\.meta/g, '({url:"",env:{}})')
    .replace(/^\s*import[\s\S]*?;$/gm, '')
    .replace(/^\s*export\s+/gm, '');
  try { new vm.Script(src, { filename: 'b.js' }); console.log('JS syntax: OK (heuristic)'); }
  catch (e) { console.log('JS syntax ERROR:', e.message); process.exit(1); }
} else {
  try { new vm.SourceTextModule(js, { identifier: 'bundle.js' }); console.log('JS syntax: OK (module)'); }
  catch (e) { console.log('JS syntax ERROR:', e.message); process.exit(1); }
}

function extractValue(at) {
  const start = js.indexOf('JSON.parse(`', at) + 'JSON.parse(`'.length;
  let i = start;
  for (; i < js.length; i += 1) {
    if (js[i] === '`') { let bs = 0, j = i - 1; while (js[j] === '\\') { bs += 1; j -= 1; } if (bs % 2 === 0) break; }
  }
  return js.slice(start, i).replace(/\\`/g, '`').replace(/\\\$/g, '$').replace(/\\\\/g, '\\');
}
const textAt = js.indexOf('JSON.parse(`[{"id":"concept.hero","title"');
const mediaAt = js.indexOf('JSON.parse(`[{"id":"concept.hero","group":"concept","section"');
const embText = JSON.parse(extractValue(textAt));
const embMedia = JSON.parse(extractValue(mediaAt));
const sharedText = JSON.parse(fs.readFileSync(path.join(root, 'shared', 'text-sections.json'), 'utf8'));
const sharedMedia = JSON.parse(fs.readFileSync(path.join(root, 'shared', 'media-slots.json'), 'utf8'));

const checks = [];
checks.push(['text registry in sync', JSON.stringify(embText) === JSON.stringify(sharedText)]);
checks.push(['media registry in sync', JSON.stringify(embMedia) === JSON.stringify(sharedMedia)]);
checks.push(['tab array has 空间场景', js.includes('it=[`小景智能中枢`,`空间场景`,`数字智造工坊`')]);
checks.push(['css module map has spaces', js.includes('spaces:`_spaces_1aqkz_157`')]);
checks.push(['component function exists', js.includes('function spacesPanel(){let{customized:e}=w(`campus.spaces`)')]);
checks.push(['component uses 3D scene nodes', js.includes('R.spacesScene') && js.includes('R.spacesTilt') && js.includes('R.spacesOrbit') && js.includes('R.spacesDepth')]);
checks.push(['component has depth copy', js.includes('R.spacesCardBack')]);
checks.push(['component has pointer parallax', js.includes('--px') && js.includes('requestAnimationFrame')]);
checks.push(['component has fly-through keyframe hook', js.includes('data-active')]);
checks.push(['component inserted before ct', js.indexOf('function spacesPanel()') < js.indexOf('function ct({initialPage:e=0')]);
checks.push(['panel uses spacesPanel', js.includes('(0,_.jsx)(spacesPanel,{})')]);
checks.push(['no stray vt panel', !js.includes('(0,_.jsx)(vt,{})')]);
checks.push(['chapter page counts bumped', js.includes('var ur=[5,6,3,8]')]);
checks.push(['campus.spaces text section', embText.some((s) => s.id === 'campus.spaces')]);
checks.push(['spaces media slots', embMedia.filter((s) => s.id.startsWith('campus.spaces')).length === 6]);

const css = fs.readFileSync(path.join(root, 'dist', 'assets', 'index-CiwR2OEh.css'), 'utf8');
const cssClasses = [
  '_spaces_1aqkz_157', '_spacesLayers_1aqkz_173', '_spacesScene_1aqkz_197', '_spacesTilt_1aqkz_199',
  '_spacesOrbit_1aqkz_201', '_spacesDepth_1aqkz_203', '_spacesCard_1aqkz_205', '_spacesCardBack_1aqkz_207',
  '_spacesGhost_1aqkz_209', '_spacesScrim_1aqkz_179', '_spacesOverlay_1aqkz_181', '_spacesEyebrow_1aqkz_183',
  '_spacesCopy_1aqkz_185', '_spacesCaption_1aqkz_187', '_spacesIndex_1aqkz_189', '_spacesIndexItem_1aqkz_191',
  '_spacesIndexNum_1aqkz_193', '_spacesIndexLabel_1aqkz_195',
];
const missing = cssClasses.filter((c) => !css.includes('.' + c + '{'));
checks.push(['css classes present', missing.length === 0]);
if (missing.length) console.log('  missing css classes:', missing.join(', '));

// the CSS module map must reference exactly the classes that exist in the CSS
const mapAt = js.indexOf('spaces:`_spaces_1aqkz_157`');
const mapSeg = js.slice(mapAt, js.indexOf('}', mapAt));
const mapClasses = [...mapSeg.matchAll(/`(_[^`]+)`/g)].map((m) => m[1]);
const mapMissing = mapClasses.filter((c) => !css.includes('.' + c + '{'));
checks.push(['css module map resolves', mapMissing.length === 0]);
if (mapMissing.length) console.log('  unresolved map classes:', mapMissing.join(', '));

let ok = true;
for (const [label, pass] of checks) { console.log((pass ? '  OK   ' : '  FAIL ') + label); if (!pass) ok = false; }

// no duplicate identifiers introduced
const decl = new Map();
for (const m of js.matchAll(/\bfunction\s+([A-Za-z_$][\w$]*)/g)) decl.set(m[1], (decl.get(m[1]) || 0) + 1);
for (const m of js.matchAll(/\b(?:var|let|const)\s+([A-Za-z_$][\w$]*)\s*=/g)) decl.set(m[1], (decl.get(m[1]) || 0) + 1);
const dupes = [...decl].filter(([k, v]) => v > 1 && k === 'spacesPanel');
checks.push(['no duplicate spacesPanel', dupes.length === 0]);
console.log((dupes.length === 0 ? '  OK   ' : '  FAIL ') + 'no duplicate spacesPanel');

if (!ok) process.exit(1);
console.log('\nALL CHECKS PASSED');
