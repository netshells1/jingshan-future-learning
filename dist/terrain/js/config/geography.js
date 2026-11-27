'use strict';

// Key landmark definitions (coordinates in km: -X West, +X East, -Z North, +Z South)
const LANDMARKS = [
  { id: 'main_peak',  x: -2.25, z: -1.65, targetElev: 1432, zh: '主峰',       en: 'Main Peak',    kind: 'peak' },
  { id: 'mid_peak',   x:  0.15, z: -1.80, targetElev: 1057, zh: '中峰',       en: 'Central Peak', kind: 'peak' },
  { id: 'east_peak',  x:  2.25, z: -1.55, targetElev: 1268, zh: '东峰',       en: 'East Peak',    kind: 'peak' },
  { id: 'saddle_w',   x: -1.05, z: -1.72, targetElev: 747,  zh: '鞍部(西)',   en: 'West Saddle',  kind: 'saddle' },
  { id: 'saddle_e',   x:  1.20, z: -1.68, targetElev: 798,  zh: '鞍部(东)',   en: 'East Saddle',  kind: 'saddle' },
  { id: 'cliff',      x:  2.52, z: -0.56, targetElev: null, zh: '陡崖',       en: 'Fault Cliff',  kind: 'cliff', noteZh: '落差~424m', noteEn: 'Drop ~424m' },
  { id: 'ridge',      x:  0.12, z: -0.45, targetElev: null, zh: '山脊',       en: 'Ridge',        kind: 'ridge' },
  { id: 'valley',     x: -0.92, z:  0.15, targetElev: null, zh: '山谷',       en: 'Valley',       kind: 'valley' },
  { id: 'basin',      x: -1.75, z:  2.05, targetElev: 35,   zh: '盆地·湖泊',  en: 'Basin · Lake', kind: 'basin', noteZh: '最低35m', noteEn: 'Min 35m' },
  { id: 'hill',       x:  1.80, z:  2.05, targetElev: 448,  zh: '孤丘',       en: 'Isolated Hill',kind: 'hill' }
];

// River spline waypoints in km
const RIVER_PATHS = {
  west: [
    [-1.05, -1.32], [-1.04, -0.85], [-0.98, -0.35], [-0.88, 0.15], [-0.68, 0.62], [-0.45, 0.98]
  ],
  east: [
    [1.20, -1.28], [1.14, -0.80], [0.95, -0.25], [0.62, 0.28], [0.14, 0.66], [-0.45, 0.98]
  ],
  merged: [
    [-0.45, 0.98], [-0.72, 1.24], [-1.02, 1.48], [-1.32, 1.72]
  ]
};

// Preset topographic profiles in km [Ax, Az, Bx, Bz]
const PRESET_PROFILES = {
  across_range: {
    zh: '穿越山脉 (南→北)', en: 'Across Mountain Range (S→N)',
    a: [-2.25, 3.30], b: [-2.25, -3.50]
  },
  two_valleys: {
    zh: '横切两条河谷 (西→东)', en: 'Cross Two Valleys (W→E)',
    a: [-2.20, -0.10], b: [2.20, -0.10]
  },
  along_ridge: {
    zh: '纵贯山脊 (北→南)', en: 'Along Central Ridge (N→S)',
    a: [0.15, -2.50], b: [0.05, 2.20]
  },
  across_basin: {
    zh: '穿过盆地与孤丘 (西→东)', en: 'Across Basin & Hill (W→E)',
    a: [-3.65, 2.05], b: [3.20, 2.05]
  },
  across_cliff: {
    zh: '穿过断层崖 (西北→东南)', en: 'Across Fault Cliff (NW→SE)',
    a: [2.25, -1.22], b: [2.85, 0.12]
  },
  saddle_west: {
    zh: '主峰—鞍部—中峰剖面', en: 'Main Peak — Saddle — Mid Peak',
    a: [-2.90, -1.65], b: [0.85, -1.80]
  }
};
