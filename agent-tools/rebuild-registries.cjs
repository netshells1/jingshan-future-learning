const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');

// Restore the shared registries from HEAD, then re-apply only the intended
// changes with correct page numbers for the inserted 空间场景 page.

function readOriginal(file) {
  const p = path.join(__dirname, file);
  let text = fs.readFileSync(p, 'utf8');
  if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);
  return JSON.parse(text);
}

const origSlots = readOriginal('orig-slots.json');
const origText = readOriginal('orig-text.json');

// ---- media slots ----
const slots = origSlots.map((s) => ({ ...s }));
const campusSectionById = {
  'campus.production': 'production',
  'campus.life': 'life',
  'campus.quest': 'quest',
  'campus.control': 'control',
};

// shift non-course campus slots: pages 1..4 -> 2..5
for (const s of slots) {
  if (s.chapter !== 'campus' || s.course) continue;
  if (typeof s.page === 'number' && s.page >= 1) s.page += 1;
}

// new space slots at page 1
const newSlots = [
  { id: 'campus.spaces.foyer', group: 'campus', section: '空间场景', title: '门厅 · 迎宾与成果', description: '门厅迎宾形象墙、数字迎宾主视角与成果展示区。', defaultKind: 'image', fit: 'cover', aspect: '16:9', chapter: 'campus', page: 1, defaultSource: '/media/final-plan-20261113/foyer-welcome.jpg' },
  { id: 'campus.spaces.foyerGallery', group: 'campus', section: '空间场景', title: '门厅 · 成果展示区', description: '门厅成果展示区效果图，实体展品与学生作品。', defaultKind: 'image', fit: 'cover', aspect: '16:9', chapter: 'campus', page: 1, defaultSource: '/media/final-plan-20261113/foyer-gallery.jpg' },
  { id: 'campus.spaces.production', group: 'campus', section: '空间场景', title: '数字智造工坊 · 主视角', description: '数字智造工坊实验室主视角：大屏、数字推演台与制造设备。', defaultKind: 'image', fit: 'cover', aspect: '16:9', chapter: 'campus', page: 1, defaultSource: '/media/final-plan-20261113/production-main.jpg' },
  { id: 'campus.spaces.productionZones', group: 'campus', section: '空间场景', title: '数字智造工坊 · 分区流线', description: '数字智造工坊四个功能区与教学流线示意图。', defaultKind: 'image', fit: 'contain', aspect: '16:9', chapter: 'campus', page: 1, defaultSource: '/media/final-plan-20261113/production-zones.jpg' },
  { id: 'campus.spaces.life', group: 'campus', section: '空间场景', title: '生活创想空间 · 主视角', description: '生活创想空间实验室主视角：中心互动台与周边体验区。', defaultKind: 'image', fit: 'cover', aspect: '16:9', chapter: 'campus', page: 1, defaultSource: '/media/final-plan-20261113/life-main.jpg' },
  { id: 'campus.spaces.lifeZones', group: 'campus', section: '空间场景', title: '生活创想空间 · 分区流线', description: '生活创想空间智能出行、智慧陪伴与跨学科交互三个分区。', defaultKind: 'image', fit: 'contain', aspect: '16:9', chapter: 'campus', page: 1, defaultSource: '/media/final-plan-20261113/life-zones.jpg' },
];

// insert new slots right before the first course slot (keeps campus story slots together)
const firstCourse = slots.findIndex((s) => s.chapter === 'campus' && s.course);
const insertAt = firstCourse >= 0 ? firstCourse : slots.length;
slots.splice(insertAt, 0, ...newSlots);

fs.writeFileSync(path.join(root, 'shared', 'media-slots.json'), JSON.stringify(slots, null, 2) + '\n', 'utf8');
console.log('media slots written:', slots.length);

// ---- text sections ----
const text = origText.map((s) => ({ ...s }));
for (const s of text) {
  if (s.chapter !== 'campus') continue;
  if (s.id === 'campus.spaces') continue;
  if (typeof s.page === 'number' && s.page >= 1) s.page += 1;
}

const spacesSection = {
  id: 'campus.spaces',
  title: '空间场景',
  group: 'campus',
  chapter: 'campus',
  page: 1,
  fields: [
    { id: 'heading.1', label: '主标题 · 一门一厅，三处场景。', defaultText: '一门一厅，\n三处场景。', maxLength: 180 },
    { id: 'body.1', label: '正文 · 门厅统领导览与成果展示，两间实验室分别承接生产与生活主题教学。', defaultText: '门厅统领导览与成果展示，两间实验室分别承接生产与生活主题教学；每间约90㎡，单次安排30—40名学生。', maxLength: 1600 },
    { id: 'caption.1', label: '场景 · 门厅标签', defaultText: '门厅 · 迎宾与成果', maxLength: 120 },
    { id: 'caption.2', label: '场景 · 数字智造工坊标签', defaultText: '数字智造工坊', maxLength: 120 },
    { id: 'caption.3', label: '场景 · 生活创想空间标签', defaultText: '生活创想空间', maxLength: 120 },
    { id: 'foyer.title', label: '场景 · 门厅标题', defaultText: '门厅与迎宾展示', maxLength: 120 },
    { id: 'foyer.body', label: '场景 · 门厅说明', defaultText: '以学校项目名称、两室主题和“小景”数字形象构成迎宾画面。主屏围绕“今天可以体验什么”组织内容，以短片呈现课程片段，以作品画面展示学生的制作过程。', maxLength: 800 },
    { id: 'foyer.points', label: '场景 · 门厅要点', defaultText: '门厅承担迎宾、主题导入、课程导览和成果展示，不计入两间实验室约180㎡的教学面积。', maxLength: 800 },
    { id: 'production.title', label: '场景 · 数字智造工坊标题', defaultText: 'AI＋生产实验室', maxLength: 120 },
    { id: 'production.body', label: '场景 · 数字智造工坊说明', defaultText: '以“让设计过程和测试结果同时可见”为空间主题：文化与数据推演、工业制造与质检、结构与机器人综合测试、安全监测孪生四个功能区协同。', maxLength: 800 },
    { id: 'production.points', label: '场景 · 数字智造工坊要点', defaultText: '入场视线先落在大屏、数字推演台与代表性样件上；桥梁、琉璃工艺与果蔬分拣等项目在此完成“设计—制作—验证”。', maxLength: 800 },
    { id: 'life.title', label: '场景 · 生活创想空间标题', defaultText: 'AI＋生活实验室', maxLength: 120 },
    { id: 'life.body', label: '场景 · 生活创想空间说明', defaultText: '以“让身边物品能够回应一次有依据的操作”为空间主题：智能出行探究、智慧陪伴模拟、跨学科趣味交互三个功能区。', maxLength: 800 },
    { id: 'life.points', label: '场景 · 生活创想空间要点', defaultText: '入口主景采用可重组的街区与道路模型，展示小车感知、判断和行动的关系；测试记录与作品在回程处集中展示。', maxLength: 800 },
    { id: 'footnote', label: '场景 · 说明', defaultText: '参观路线从门厅的项目总览开始，依次进入两室观看主景与代表性互动，最后回到门厅查看学生作品和课程成果。', maxLength: 800 },
  ],
};

const spacesAt = text.findIndex((s) => s.id === 'campus.production');
text.splice(spacesAt >= 0 ? spacesAt : text.length, 0, spacesSection);

fs.writeFileSync(path.join(root, 'shared', 'text-sections.json'), JSON.stringify(text, null, 2) + '\n', 'utf8');
console.log('text sections written:', text.length);

// ---- report ----
const byPage = {};
for (const s of slots) if (s.chapter === 'campus' && !s.course) {
  (byPage[s.page] = byPage[s.page] || new Set()).add(s.section);
}
console.log('\ncampus non-course media slots by page:');
for (const k of Object.keys(byPage).sort((a, b) => a - b)) console.log('  page ' + k + ': ' + [...byPage[k]].join(', '));
console.log('\ncampus text sections:');
for (const s of text) if (s.chapter === 'campus') console.log('  ' + s.id.padEnd(22) + 'page=' + s.page);
console.log('\ncourse slot pages (unchanged):');
const coursePages = {};
for (const s of slots) if (s.course) (coursePages[s.course] = coursePages[s.course] || new Set()).add(s.page);
for (const k of Object.keys(coursePages).sort()) console.log('  ' + k.padEnd(12) + [...coursePages[k]].join(','));
