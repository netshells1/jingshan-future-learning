// Rewrite the campus.spaces text section for the new full-bleed editorial layout:
// shorter copy, per-scene label/title/body, no long paragraphs.
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');

const textPath = path.join(root, 'shared', 'text-sections.json');
const text = JSON.parse(fs.readFileSync(textPath, 'utf8'));
const section = text.find((s) => s.id === 'campus.spaces');
if (!section) throw new Error('campus.spaces section missing');

const SCENES = {
  foyer: {
    label: '门厅 · 迎宾与成果',
    title: '门厅与迎宾展示',
    body: '迎宾、导览与成果展示，不计入两间实验室教学面积。',
  },
  production: {
    label: '数字智造工坊',
    title: 'AI＋生产实验室',
    body: '四个功能区协同，完成设计—制作—验证的完整链路。',
  },
  life: {
    label: '生活创想空间',
    title: 'AI＋生活实验室',
    body: '三个功能区，让身边物品回应一次有依据的操作。',
  },
};

const fields = [
  {
    id: 'heading.1',
    label: '页眉 · 一门一厅 · 三处场景',
    defaultText: '一门一厅 · 三处场景',
    maxLength: 120,
  },
  {
    id: 'body.1',
    label: '页眉说明 · 门厅统领导览，两间实验室分别承接生产与生活主题教学。',
    defaultText: '门厅统领导览与成果展示，两间实验室分别承接生产与生活主题教学。',
    maxLength: 300,
  },
];

for (const [key, s] of Object.entries(SCENES)) {
  fields.push({ id: `${key}.label`, label: `场景 · ${s.label} · 标签`, defaultText: s.label, maxLength: 60 });
}
for (const [key, s] of Object.entries(SCENES)) {
  fields.push({ id: `${key}.title`, label: `场景 · ${s.label} · 标题`, defaultText: s.title, maxLength: 60 });
}
for (const [key, s] of Object.entries(SCENES)) {
  fields.push({ id: `${key}.body`, label: `场景 · ${s.label} · 说明`, defaultText: s.body, maxLength: 120 });
}
fields.push({
  id: 'footnote',
  label: '底部署名 · 参观路线',
  defaultText: '参观路线：门厅 → 数字智造工坊 → 生活创想空间',
  maxLength: 200,
});

section.fields = fields;
section.title = '空间场景';
fs.writeFileSync(textPath, JSON.stringify(text, null, 2) + '\n', 'utf8');
console.log('campus.spaces fields:', fields.map((f) => f.id).join(', '));
