// Source of truth for the campus "空间场景" showcase.
//
// The showcase now lives in a standalone page (dist/spaces/index.html) that
// the campus deck embeds in an iframe. This script holds the scene metadata
// and regenerates both the JSON data file and the scene block that is
// inlined into the standalone page, so the two never drift apart.
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');

const S = [
  {
    key: 'foyer',
    slotId: 'campus.spaces.foyer',
    label: '门厅 · 迎宾与成果',
    image: '/media/final-plan-20261113/foyer-welcome.jpg',
    alt: '最终方案图4-4，门厅迎宾形象墙与两室导览',
    title: '门厅与迎宾展示',
    body: '迎宾、导览与成果展示。',
    position: 'center 28%',
  },
  {
    key: 'production',
    slotId: 'campus.spaces.production',
    label: 'AI＋生产',
    image: '/media/final-plan-20261113/production-main.jpg',
    alt: '最终方案图4-1，AI＋生产实验室大屏、协作工位与制造设备主视角',
    title: 'AI＋生产实验室',
    body: '四个功能区协同，完成设计—制作—验证的完整链路。',
    position: 'center 32%',
  },
  {
    key: 'life',
    slotId: 'campus.spaces.life',
    label: 'AI＋生活',
    image: '/media/final-plan-20261113/life-main.jpg',
    alt: '最终方案图4-2，AI＋生活实验室中心互动台、周边体验区与教学屏幕',
    title: 'AI＋生活实验室',
    body: '三个功能区，让身边物品回应一次有依据的操作。',
    position: 'center 30%',
  },
];

const eyebrow = '一处门厅 · 两间实验室';

// --- JSON data file (single source of truth for tooling) --------------
const dataPath = path.join(__dirname, 'spaces-scenes.json');
fs.writeFileSync(dataPath, JSON.stringify({ eyebrow, scenes: S }, null, 2) + '\n', 'utf8');
console.log('written', dataPath);

// --- scene block for the standalone page ------------------------------
const block = '  const SCENES = [\n'
  + S.map((s, i) => '    {\n'
    + `      key: '${s.key}',\n`
    + `      slotId: '${s.slotId}',\n`
    + `      label: '${s.label}',\n`
    + `      title: '${s.title}',\n`
    + `      body: '${s.body}',\n`
    + `      image: \`\${MEDIA_BASE}${s.image.split('/').pop()}\`,\n`
    + `      alt: '${s.alt}',\n`
    + `      position: '${s.position}',\n`
    + `      num: '0${i + 1}'\n`
    + '    }').join(',\n')
  + '\n  ];';

const pagePath = path.join(root, 'dist', 'spaces', 'index.html');
const page = fs.readFileSync(pagePath, 'utf8');
const start = page.indexOf('  const SCENES = [');
if (start < 0) throw new Error('SCENES block not found in dist/spaces/index.html');
const end = page.indexOf('\n  ];', start);
if (end < 0) throw new Error('SCENES block end not found');
const next = page.slice(0, start) + block + page.slice(end + '\n  ];'.length);
fs.writeFileSync(pagePath, next, 'utf8');
console.log('updated', pagePath);

// --- copy consistency -------------------------------------------------
const textSections = JSON.parse(fs.readFileSync(path.join(root, 'shared', 'text-sections.json'), 'utf8'));
const section = textSections.find((s) => s.id === 'campus.spaces');
const field = (id) => section.fields.find((f) => f.id === id);
const problems = [];
if (field('heading.1').defaultText !== eyebrow) problems.push('heading.1');
for (const s of S) {
  for (const part of ['title', 'body', 'label']) {
    if (field(`${s.key}.${part}`).defaultText !== s[part]) problems.push(`${s.key}.${part}`);
  }
}
if (problems.length) {
  console.error('text section mismatch:', problems.join(', '));
  process.exit(1);
}
console.log('text section in sync');
