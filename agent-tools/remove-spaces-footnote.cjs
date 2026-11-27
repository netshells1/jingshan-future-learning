// Removes the 空间场景 "参观路线" footnote from the shared text registry and
// re-embeds the registry into the production bundle.
//
// The standalone page (dist/spaces/index.html) no longer renders the caption,
// so the registry field is dropped too: leaving it would keep a dead entry in
// the 展示设置 → 文字内容 panel that no longer does anything.
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');

const textPath = path.join(root, 'shared', 'text-sections.json');
const jsPath = path.join(root, 'dist', 'assets', 'index-CEFoGbBQ.js');

// --- shared registry ---------------------------------------------------
const sections = JSON.parse(fs.readFileSync(textPath, 'utf8'));
const spaces = sections.find((s) => s.id === 'campus.spaces');
if (!spaces) throw new Error('campus.spaces section not found');
const before = spaces.fields.length;
spaces.fields = spaces.fields.filter((f) => f.id !== 'footnote');
console.log('footnote field removed:', before, '->', spaces.fields.length);
fs.writeFileSync(textPath, JSON.stringify(sections, null, 2) + '\n', 'utf8');

// --- embedded registry -------------------------------------------------
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

let js = fs.readFileSync(jsPath, 'utf8');
js = replaceEmbedded(js, 'JSON.parse(`[{"id":"concept.hero","title"', sections, 'text');
fs.writeFileSync(jsPath, js, 'utf8');
console.log('js updated:', js.length, 'bytes');
