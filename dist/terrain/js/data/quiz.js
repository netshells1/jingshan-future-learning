'use strict';

const QUIZ_DATA = [
  {
    beacon: [-2.25, -1.65],
    cam: { pos: [-16, 36, 16], target: [-22.5, 18, -16.5] },
    qZh: '1. 观察金色信标所在位置：等高线呈闭合状，数值由四周向中心递增，最高海拔达 1432m。该地形部位是？',
    qEn: '1. Look at the gold beacon: closed contours increase inward to 1432m. What landform is this?',
    optsZh: ['盆地（洼地）', '山峰（山顶）', '鞍部', '陡崖'],
    optsEn: ['Basin', 'Summit / Peak', 'Saddle', 'Cliff'],
    correct: 1,
    expZh: '解析：等高线闭合且中心数值高于四周（内高外低），代表山峰（山顶）。此处为本区主峰（1432m）。',
    expEn: 'Closed contours with higher elevations inside than outside indicate a Mountain Peak (1432m).'
  },
  {
    beacon: [-1.75, 2.05],
    cam: { pos: [-14, 28, 46], target: [-17.5, 2, 20.5] },
    qZh: '2. 信标位于西南部水域附近，四周等高线数值高、中间海拔低（最低 35m 并汇水成湖），该地形部位是？',
    qEn: '2. In the SW area, contours surround a low depression (35m min) holding a lake. What is this landform?',
    optsZh: ['山谷', '山脊', '盆地', '孤丘'],
    optsEn: ['Valley', 'Ridge', 'Basin', 'Isolated Hill'],
    correct: 2,
    expZh: '解析：等高线闭合且中心数值低于四周（内低外高），为盆地地形，低洼处易积水形成湖泊。',
    expEn: 'Closed contours with lower elevation in the center ("low inside, high outside") form a Basin.'
  },
  {
    beacon: [0.12, -0.45],
    cam: { pos: [16, 26, 24], target: [1.2, 8, -4.5] },
    qZh: '3. 观察金色信标处等高线向南侧（海拔较低处）凸出。根据“凸低为脊，凸高为谷”口诀，此处是？',
    qEn: '3. Contours at the beacon bulge south toward lower elevations. Which landform is this?',
    optsZh: ['山脊（分水岭）', '山谷（集水线）', '陡崖', '盆地'],
    optsEn: ['Ridge (Watershed)', 'Valley', 'Cliff', 'Basin'],
    correct: 0,
    expZh: '解析：等高线弯曲部分向海拔低处凸出（凸低为脊），说明中间地势比两侧高，是山脊（分水岭）。',
    expEn: 'Contours bulging toward lower values indicate higher ground along the centerline: a Ridge.'
  },
  {
    beacon: [-0.90, 0.10],
    cam: { pos: [-2, 24, 24], target: [-9, 6, 1] },
    qZh: '4. 此处等高线向北侧（海拔较高处）凸出，且有蓝色河流顺势向南流淌。该地形部位是？',
    qEn: '4. Here contours bend north toward higher elevation and a river flows southward. What is this?',
    optsZh: ['山脊', '鞍部', '山谷', '山顶'],
    optsEn: ['Ridge', 'Saddle', 'Valley', 'Summit'],
    correct: 2,
    expZh: '解析：等高线向高处凸出（凸高为谷），中间低两侧高，利于径流汇集，常发育河流。',
    expEn: 'Contours curving toward higher values form a Valley where streams naturally collect.'
  },
  {
    beacon: [-1.05, -1.72],
    cam: { pos: [-10, 26, 6], target: [-10.5, 11, -17.2] },
    qZh: '5. 信标位于主峰（1432m）与中峰（1057m）之间地势相对较低平的马鞍形部位（747m），它是？',
    qEn: '5. Positioned at 747m between Main Peak (1432m) and Central Peak (1057m), what is this pass?',
    optsZh: ['陡崖', '鞍部', '盆地', '山谷'],
    optsEn: ['Cliff', 'Saddle', 'Basin', 'Valley'],
    correct: 1,
    expZh: '解析：位于两座相邻山峰之间呈马鞍状的部位称为鞍部，是翻越山脉修路或登山的理想通道。',
    expEn: 'A low pass between two adjacent mountain summits is a Saddle.'
  },
  {
    beacon: [2.52, -0.56],
    cam: { pos: [44, 24, 18], target: [25.2, 10, -5.6] },
    qZh: '6. 信标处约有 n = 4 条等高线（按等高距 d = 100m）高度密集/重合，该部位是陡崖。其相对高差 ΔH 范围约为？',
    qEn: '6. About n = 4 contours (d = 100m) converge tightly at this Cliff. What is its drop range ΔH?',
    optsZh: ['100m ≤ ΔH < 300m', '200m ≤ ΔH < 400m', '300m ≤ ΔH < 500m', '400m ≤ ΔH < 600m'],
    optsEn: ['100m ≤ ΔH < 300m', '200m ≤ ΔH < 400m', '300m ≤ ΔH < 500m', '400m ≤ ΔH < 600m'],
    correct: 2,
    expZh: '解析：代入陡崖相对高差公式 (n-1)·d ≤ ΔH < (n+1)·d，当 n=4、d=100m 时，(4-1)×100 ≤ ΔH < (4+1)×100，即 300m ≤ ΔH < 500m（本崖实测约 424m）。',
    expEn: 'Formula (n-1)·d ≤ ΔH < (n+1)·d gives 300m ≤ ΔH < 500m (actual scarp drop is ~424m).'
  },
  {
    beacon: [1.80, 2.05],
    cam: { pos: [26, 22, 42], target: [18, 6, 20.5] },
    qZh: '7. 已知南部孤丘（信标处）海拔为 448m，北部主峰海拔为 1432m，两地的相对高度是多少？',
    qEn: '7. If this Isolated Hill is 448m and Main Peak is 1432m, what is their relative height?',
    optsZh: ['1880 m', '984 m', '1057 m', '820 m'],
    optsEn: ['1880 m', '984 m', '1057 m', '820 m'],
    correct: 1,
    expZh: '解析：相对高度 = 海拔高 − 海拔低 = 1432 − 448 = 984 m。',
    expEn: 'Relative Height = Higher Elevation − Lower Elevation = 1432 − 448 = 984 m.'
  },
  {
    beacon: [0.40, 1.40],
    cam: { pos: [18, 34, 48], target: [4, 4, 14] },
    qZh: '8. 在同一幅等高距相同的地形图上，想要选择一条省力、坡度最缓的登山路线，应优先沿等高线什么特征的区域行进？',
    qEn: '8. On a map with uniform contour interval, which area offers the gentlest, easiest hiking slope?',
    optsZh: ['等高线密集处', '等高线稀疏处', '等高线重合处', '等高线完全闭合的中心'],
    optsEn: ['Dense contours', 'Sparse contours', 'Overlapping contours', 'Closed peak center'],
    correct: 1,
    expZh: '解析：记忆口诀“密陡·疏缓”。等高距相同，等高线越稀疏表示水平距离越长、坡度越缓，攀登更省力。',
    expEn: '"Dense = steep, Sparse = gentle." Wider contour spacing means a gentler climb.'
  }
];
