// 校园空间改名：数字智造工坊 -> AI＋生产，生活创想空间 -> AI＋生活
//
// 覆盖范围与上一次改名（94e0616）保持一致：
// - 校园章节标签页、全域中心地图示意图文字、空间画面标题
// - 课程目录分组标题、课程入口与 CTA
// - 黑客松创作方向三条赛项主线
// - shared/*.json 文本、素材槽位配置
// - server/project-context.mjs 小景知识库口径
// - dist/media 各 manifest 与素材索引页的图片标题
// - package-manifest.json 文件哈希同步更新（由 add-standalone-files.cjs 完成）
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');

const RENAMES = [
  ['数字智造工坊', 'AI＋生产'],
  ['生活创想空间', 'AI＋生活'],
];

const FILES = [
  'dist/assets/index-CEFoGbBQ.js',
  'shared/text-sections.json',
  'shared/media-slots.json',
  'shared/course-text-sections.json',
  'server/project-context.mjs',
  'dist/media/20261112/assets-manifest.json',
  'dist/media/20261112/classroom/classroom-manifest.json',
  'dist/media/20261112/hackathon/hackathon-manifest.json',
  'dist/media/20261112/index.html',
  'dist/media/classroom-design-20261112/manifest.json',
  'dist/media/life-classroom-20261112/manifest.json',
];

const report = [];
let totalChanges = 0;

for (const file of FILES) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) { report.push(`SKIP (missing): ${file}`); continue; }
  const before = fs.readFileSync(full, 'utf8');
  let after = before;
  for (const [from, to] of RENAMES) {
    const parts = after.split(from);
    if (parts.length > 1) {
      totalChanges += parts.length - 1;
      after = parts.join(to);
    }
  }
  if (after !== before) {
    fs.writeFileSync(full, after, 'utf8');
    report.push(`OK  ${file}`);
  } else {
    report.push(`--  ${file} (no change)`);
  }
}

console.log(report.join('\n'));
console.log('total replacements:', totalChanges);
