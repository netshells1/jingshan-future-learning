const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const jsPath = path.join(root, 'dist', 'assets', 'index-CEFoGbBQ.js');
const js = fs.readFileSync(jsPath, 'utf8');
const standalonePath = path.join(root, 'dist', 'spaces', 'index.html');
const standalone = fs.readFileSync(standalonePath, 'utf8');

// Syntax check: write the bundle out as an ES module and let node parse it.
{
  const tmp = path.join(require('os').tmpdir(), 'bundle-check-' + Date.now() + '.mjs');
  fs.writeFileSync(tmp, js, 'utf8');
  const { execFileSync } = require('child_process');
  try {
    execFileSync(process.execPath, ['--check', tmp], { stdio: 'pipe' });
    console.log('JS syntax: OK (module)');
  } catch (e) {
    console.log('JS syntax ERROR:', (e.stderr || '').toString().split('\n').slice(0, 4).join(' '));
    process.exit(1);
  } finally {
    fs.unlinkSync(tmp);
  }
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
checks.push(['tab array has 空间场景', js.includes('it=[`小景智能中枢`,`空间场景`,`AI＋生产`')]);
checks.push(['chapter page counts bumped', js.includes('var ur=[5,6,3,8]')]);
checks.push(['campus.spaces text section', embText.some((s) => s.id === 'campus.spaces')]);
checks.push(['spaces media slots', embMedia.filter((s) => s.id.startsWith('campus.spaces')).length === 6]);

// --- the panel is now a thin iframe shell ---------------------------
checks.push(['panel function exists', js.includes('function spacesPanel({onStep:e}){')]);
checks.push(['panel embeds the standalone file', js.includes('src:`./spaces/index.html`')]);
checks.push(['panel uses the frame class', js.includes('R.spacesFrame')]);
checks.push(['panel syncs visibility', js.includes('jingshan:spaces-visible')]);
checks.push(['panel forwards step requests', js.includes('jingshan:spaces-step')]);
checks.push(['panel wires the step callback', js.includes('jsx)(spacesPanel,{onStep:')]);
checks.push(['component inserted before ct', js.indexOf('function spacesPanel(') < js.indexOf('function ct({initialPage:e=0')]);
checks.push(['panel used by campus deck', js.includes('jsx)(spacesPanel,{onStep:')]);
checks.push(['no duplicate spacesPanel', (js.match(/function spacesPanel\(/g) || []).length === 1]);
checks.push(['no stale arrow-key forwarding', !js.includes('jingshan:spaces-key')]);

// --- the inline 3D implementation must be gone from the bundle ------
for (const dead of ['R.spacesScene', 'R.spacesTilt', 'R.spacesOrbit', 'R.spacesDepth', 'R.spacesCardBack', 'R.spacesIndex']) {
  checks.push([`bundle no longer inlines ${dead}`, !js.includes(dead)]);
}

// --- the standalone file carries the full implementation ------------
for (const cls of ['spaces', 'spacesLayers', 'spacesScene', 'spacesTilt', 'spacesOrbit', 'spacesDepth',
  'spacesCard', 'spacesCardBack', 'spacesScrim', 'spacesOverlay', 'spacesGhost', 'spacesEyebrow',
  'spacesCopy', 'spacesCaption', 'spacesIndex', 'spacesIndexItem', 'spacesIndexNum', 'spacesIndexLabel']) {
  checks.push([`standalone has .${cls}`, standalone.includes(`.${cls}`)]);
}
checks.push(['standalone has 3 scenes', ['foyer', 'production', 'life'].every((k) => standalone.includes(`key: '${k}'`))]);
checks.push(['standalone auto-advances every 5s', standalone.includes('const INTERVAL = 5000')]);
checks.push(['standalone has no hover pause', !standalone.includes('pointerenter') && !standalone.includes('onMouseEnter')]);
checks.push(['standalone keeps keyboard focus pause', standalone.includes('focusin') && standalone.includes('focusout')]);
checks.push(['standalone respects reduced motion', standalone.includes('prefers-reduced-motion')]);
checks.push(['standalone has pointer parallax', standalone.includes('requestAnimationFrame') && standalone.includes('--px')]);
checks.push(['standalone has fly-through keyframes', standalone.includes('@keyframes spaces-fly')]);
checks.push(['standalone has orbit keyframes', standalone.includes('@keyframes spaces-orbit')]);
checks.push(['standalone loads text overrides', standalone.includes('/api/text-settings')]);
checks.push(['standalone loads media overrides', standalone.includes('/api/media-settings')]);
checks.push(['standalone reads the text section', standalone.includes('campus.spaces')]);
checks.push(['standalone links back to campus', standalone.includes('../#/campus')]);
checks.push(['standalone drops the open-window link', !standalone.includes('在新窗口打开') && !standalone.includes('spacesOpen')]);
checks.push(['standalone handles iframe embedding', standalone.includes('jingshan:spaces-visible')]);
checks.push(['standalone forwards step requests', standalone.includes('jingshan:spaces-step')]);
checks.push(['standalone switches scenes on wheel', standalone.includes("addEventListener('wheel'")]);
checks.push(['standalone switches scenes on mouse drag', standalone.includes("addEventListener('pointerdown'") && standalone.includes("addEventListener('pointerup'")]);
checks.push(['standalone switches scenes on touch', standalone.includes('touchmove')]);
checks.push(['standalone defaults all three images', ['foyer-welcome.jpg', 'production-main.jpg', 'life-main.jpg'].every((f) => standalone.includes(f))]);

// --- CSS -------------------------------------------------------------
const css = fs.readFileSync(path.join(root, 'dist', 'assets', 'index-CiwR2OEh.css'), 'utf8');
checks.push(['css has the frame class', css.includes('._spacesFrame_1aqkz_211{')]);
checks.push(['css no longer carries the inline 3D rules', !css.includes('._spacesOrbit_1aqkz_201') && !css.includes('._spacesCopy_1aqkz_185')]);

// the CSS module map must reference exactly the classes that exist in the CSS
const mapAt = js.indexOf('spacesFrame:`_spacesFrame_1aqkz_211`');
checks.push(['css module map has the frame', mapAt > 0]);
if (mapAt > 0) {
  // The map is one flat object literal; scan it from its opening brace.
  const objStart = js.lastIndexOf('{', mapAt);
  const mapSeg = js.slice(objStart, js.indexOf('}', mapAt));
  const mapClasses = [...mapSeg.matchAll(/`(_[^`]+)`/g)].map((m) => m[1]);
  // `_cameraReveal_...` names an @keyframes rule, not a class.
  const mapMissing = mapClasses.filter((c) => !css.includes('.' + c) && !css.includes(c));
  checks.push(['css module map resolves', mapMissing.length === 0]);
  if (mapMissing.length) console.log('  unresolved map classes:', mapMissing.join(', '));
}

// --- package manifest ------------------------------------------------
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'package-manifest.json'), 'utf8'));
checks.push(['manifest tracks the standalone file', manifest.files.some((f) => f.file === 'dist/spaces/index.html')]);
checks.push(['manifest staticFiles matches dist', manifest.staticFiles === manifest.files.filter((f) => f.file.startsWith('dist/')).length]);

let ok = true;
for (const [label, pass] of checks) { console.log((pass ? '  OK   ' : '  FAIL ') + label); if (!pass) ok = false; }

if (!ok) process.exit(1);
console.log('\nALL CHECKS PASSED');
