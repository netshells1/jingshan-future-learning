const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');

// ------------------------------------------------------------------
// 1. New media slots: campus.spaces.*  (3 scenes)
// ------------------------------------------------------------------
const slotsPath = path.join(root, 'shared', 'media-slots.json');
const slots = JSON.parse(fs.readFileSync(slotsPath, 'utf8'));

const newSlots = [
  {
    id: 'campus.spaces.foyer', group: 'campus', section: '空间场景',
    title: '门厅 · 迎宾与成果', description: '门厅迎宾形象墙、数字迎宾主视角与成果展示区。',
    defaultKind: 'image', fit: 'cover', aspect: '16:9', chapter: 'campus', page: 1,
    defaultSource: '/media/final-plan-20261113/foyer-welcome.jpg',
  },
  {
    id: 'campus.spaces.foyerGallery', group: 'campus', section: '空间场景',
    title: '门厅 · 成果展示区', description: '门厅成果展示区效果图，实体展品与学生作品。',
    defaultKind: 'image', fit: 'cover', aspect: '16:9', chapter: 'campus', page: 1,
    defaultSource: '/media/final-plan-20261113/foyer-gallery.jpg',
  },
  {
    id: 'campus.spaces.production', group: 'campus', section: '空间场景',
    title: '数字智造工坊 · 主视角', description: '数字智造工坊实验室主视角：大屏、数字推演台与制造设备。',
    defaultKind: 'image', fit: 'cover', aspect: '16:9', chapter: 'campus', page: 1,
    defaultSource: '/media/final-plan-20261113/production-main.jpg',
  },
  {
    id: 'campus.spaces.productionZones', group: 'campus', section: '空间场景',
    title: '数字智造工坊 · 分区流线', description: '数字智造工坊四个功能区与教学流线示意图。',
    defaultKind: 'image', fit: 'contain', aspect: '16:9', chapter: 'campus', page: 1,
    defaultSource: '/media/final-plan-20261113/production-zones.jpg',
  },
  {
    id: 'campus.spaces.life', group: 'campus', section: '空间场景',
    title: '生活创想空间 · 主视角', description: '生活创想空间实验室主视角：中心互动台与周边体验区。',
    defaultKind: 'image', fit: 'cover', aspect: '16:9', chapter: 'campus', page: 1,
    defaultSource: '/media/final-plan-20261113/life-main.jpg',
  },
  {
    id: 'campus.spaces.lifeZones', group: 'campus', section: '空间场景',
    title: '生活创想空间 · 分区流线', description: '生活创想空间智能出行、智慧陪伴与跨学科交互三个分区。',
    defaultKind: 'image', fit: 'contain', aspect: '16:9', chapter: 'campus', page: 1,
    defaultSource: '/media/final-plan-20261113/life-zones.jpg',
  },
];

const existing = new Set(slots.map((s) => s.id));
const added = [];
for (const s of newSlots) {
  if (existing.has(s.id)) continue;
  added.push(s);
}
if (added.length) {
  // insert right after the last campus chapter slot, keeping campus grouped
  let insertAt = slots.length;
  for (let i = 0; i < slots.length; i += 1) {
    if (slots[i].chapter === 'campus') insertAt = i + 1;
  }
  slots.splice(insertAt, 0, ...added);
  fs.writeFileSync(slotsPath, JSON.stringify(slots, null, 2) + '\n', 'utf8');
}
console.log('media slots added:', added.map((s) => s.id).join(', ') || '(none)');
console.log('total slots:', slots.length);
