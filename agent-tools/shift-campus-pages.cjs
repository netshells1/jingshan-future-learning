const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');

// The new 空间场景 page is inserted at campus index 1.
// All existing campus pages >= 1 must shift +1 so that
// (a) the settings panel "当前页面" filter, and
// (b) the "定位到此处" (onLocate) jump
// still point at the right slide.

function shift(file, label) {
  const p = path.join(root, 'shared', file);
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  let changed = 0;
  for (const entry of data) {
    if (entry.chapter !== 'campus') continue;
    if (typeof entry.page !== 'number') continue;
    if (entry.page >= 1) {
      entry.page += 1;
      changed += 1;
    }
  }
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(label + ': shifted ' + changed + ' entries');
}

shift('media-slots.json', 'media-slots');
shift('text-sections.json', 'text-sections');

// Report resulting campus pages
const slots = JSON.parse(fs.readFileSync(path.join(root, 'shared', 'media-slots.json'), 'utf8'));
const text = JSON.parse(fs.readFileSync(path.join(root, 'shared', 'text-sections.json'), 'utf8'));
const byPage = {};
for (const s of slots) if (s.chapter === 'campus' && !s.course) {
  (byPage[s.page] = byPage[s.page] || new Set()).add(s.section);
}
console.log('\ncampus media slots by page:');
for (const k of Object.keys(byPage).sort((a, b) => a - b)) {
  console.log('  page ' + k + ': ' + [...byPage[k]].join(', '));
}
console.log('\ncampus text sections by page:');
for (const s of text) if (s.chapter === 'campus') console.log('  ' + s.id.padEnd(22) + 'page=' + s.page);
