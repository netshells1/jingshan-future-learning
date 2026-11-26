const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');

const cssPath = path.join(root, 'dist', 'assets', 'index-CiwR2OEh.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Tighten the base spacing so the page fits a 1080p viewport without scrolling.
const replacements = [
  // base: reduce top padding, gap and margins
  ['._spaces_1aqkz_157{box-sizing:border-box;width:100%;height:100%;min-height:0;padding:174px 4.2% 50px;overflow:auto;display:flex;flex-direction:column;justify-content:center;position:relative}',
   '._spaces_1aqkz_157{box-sizing:border-box;width:100%;height:100%;min-height:0;padding:150px 4.2% 40px;overflow:auto;display:flex;flex-direction:column;justify-content:center;position:relative}'],
  ['._spaces_1aqkz_157 h2{letter-spacing:-.035em;color:var(--ink,#f5f5f7);text-wrap:balance;margin:0 0 24px;font-size:clamp(36px,3.4vw,62px);font-weight:600;line-height:1.2}',
   '._spaces_1aqkz_157 h2{letter-spacing:-.035em;color:var(--ink,#f5f5f7);text-wrap:balance;margin:0 0 18px;font-size:clamp(34px,3vw,54px);font-weight:600;line-height:1.2}'],
  ['._spaces_1aqkz_157 ._description_1aqkz_25{color:var(--secondary,#b9b9bd);text-wrap:pretty;max-width:34em;margin:0 0 30px;font-size:clamp(15px,1.2vw,19px);line-height:1.8}',
   '._spaces_1aqkz_157 ._description_1aqkz_25{color:var(--secondary,#b9b9bd);text-wrap:pretty;max-width:34em;margin:0 0 22px;font-size:clamp(15px,1.2vw,18px);line-height:1.75}'],
  ['._spacesRail_1aqkz_163{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-bottom:26px}',
   '._spacesRail_1aqkz_163{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-bottom:20px}'],
  ['._spacesMedia_1aqkz_161{background:#171b20;border-radius:12px;min-height:clamp(240px,38vh,420px);overflow:hidden;position:relative}',
   '._spacesMedia_1aqkz_161{background:#171b20;border-radius:12px;min-height:clamp(220px,34vh,360px);overflow:hidden;position:relative}'],
  ['._spaces_1aqkz_157 ._footnote_1aqkz_35{color:var(--muted,#92929a);margin:30px 0 0;font-size:13px;line-height:1.7}',
   '._spaces_1aqkz_157 ._footnote_1aqkz_35{color:var(--muted,#92929a);margin:22px 0 0;font-size:13px;line-height:1.7}'],
  // >=1800 override
  ['@media (width>=1800px){._spaces_1aqkz_157{padding:190px 4.2% 56px}._spaces_1aqkz_157 h2{margin-bottom:26px;font-size:clamp(38px,3.5vw,64px)}._spaces_1aqkz_157 ._description_1aqkz_25{margin-bottom:34px;font-size:18px}._spacesLabel_1aqkz_169{font-size:19px}._spacesText_1aqkz_171{font-size:14px}._spacesBody_1aqkz_167 p{font-size:16px}._spaces_1aqkz_157 ._footnote_1aqkz_35{margin-top:32px;font-size:14px}}',
   '@media (width>=1800px){._spaces_1aqkz_157{padding:164px 4.2% 46px}._spaces_1aqkz_157 h2{margin-bottom:20px;font-size:clamp(36px,3.2vw,56px)}._spaces_1aqkz_157 ._description_1aqkz_25{margin-bottom:24px;font-size:18px}._spacesLabel_1aqkz_169{font-size:19px}._spacesText_1aqkz_171{font-size:14px}._spacesBody_1aqkz_167 p{font-size:16px}._spaces_1aqkz_157 ._footnote_1aqkz_35{margin-top:24px;font-size:14px}}'],
];

let applied = 0;
for (const [oldStr, newStr] of replacements) {
  if (!css.includes(oldStr)) { console.log('MISS: ' + oldStr.slice(0, 70)); continue; }
  css = css.replace(oldStr, newStr);
  applied += 1;
}
fs.writeFileSync(cssPath, css, 'utf8');
console.log('applied ' + applied + '/' + replacements.length + ' spacing tweaks');
