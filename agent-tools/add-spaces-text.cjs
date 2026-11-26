const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const textPath = path.join(root, 'shared', 'text-sections.json');
const text = JSON.parse(fs.readFileSync(textPath, 'utf8'));

const ID = 'campus.spaces';

const section = {
  id: ID,
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
    { id: 'production.body', label: '场景 · 数字智造工坊说明', defaultText: '以“让设计过程和测试结果同时可见”为空间主题：文化与数据推演、工业制造与质检、结构与机器人综合测试、安全监测孪生四个功能区。', maxLength: 800 },
    { id: 'production.points', label: '场景 · 数字智造工坊要点', defaultText: '入场视线先落在大屏、数字推演台与代表性样件上；桥梁、琉璃工艺、果蔬分拣等项目在此完成“设计—制作—验证”。', maxLength: 800 },
    { id: 'life.title', label: '场景 · 生活创想空间标题', defaultText: 'AI＋生活实验室', maxLength: 120 },
    { id: 'life.body', label: '场景 · 生活创想空间说明', defaultText: '以“让身边物品能够回应一次有依据的操作”为空间主题：智能出行探究、智慧陪伴模拟、跨学科趣味交互三个功能区。', maxLength: 800 },
    { id: 'life.points', label: '场景 · 生活创想空间要点', defaultText: '入口主景采用可重组的街区与道路模型，展示小车感知、判断和行动的关系；测试记录、英文故事与植物观察结果在回程处展示。', maxLength: 800 },
    { id: 'footnote', label: '场景 · 说明', defaultText: '参观路线从门厅的项目总览开始，依次进入两室观看主景与代表性互动，最后回到门厅查看学生作品和课程成果。', maxLength: 800 },
  ],
};

const index = text.findIndex((s) => s.id === ID);
if (index >= 0) text[index] = section;
else {
  const at = text.findIndex((s) => s.id === 'campus.production');
  text.splice(at >= 0 ? at : text.length, 0, section);
}
fs.writeFileSync(textPath, JSON.stringify(text, null, 2) + '\n', 'utf8');
console.log('text section written:', ID);
console.log('total sections:', text.length);
