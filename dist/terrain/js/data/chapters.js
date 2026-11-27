'use strict';

const CHAPTERS = [
  {
    num: '00',
    zh: '认识等高线地形图',
    en: 'Overview',
    cam: { pos: [52, 46, 68], target: [0, 6, 0] },
    onEnter() {
      state.showCutPlane = false;
      state.cutAbove = false;
      state.showSeaLevel = false;
      state.showRidgeLine = false;
      updateSliceVisuals();
      seaLevelMesh.visible = false;
      updateRidgeLineGeometry();
    }
  },
  {
    num: '01',
    zh: '等高线的形成',
    en: 'How Contours Form',
    cam: { pos: [48, 36, 56], target: [-6, 8, -4] },
    onEnter() {
      state.showCutPlane = true;
      state.showSeaLevel = false;
      state.showRidgeLine = false;
      updateSliceVisuals();
      seaLevelMesh.visible = false;
      updateRidgeLineGeometry();
    }
  },
  {
    num: '02',
    zh: '海拔与相对高度',
    en: 'Elevation & Relief',
    cam: { pos: [46, 32, 62], target: [-4, 8, -4] },
    onEnter() {
      state.showCutPlane = false;
      state.cutAbove = false;
      state.showSeaLevel = true;
      state.showRidgeLine = false;
      updateSliceVisuals();
      seaLevelMesh.visible = true;
      updateRidgeLineGeometry();
    }
  },
  {
    num: '03',
    zh: '等高距与坡度',
    en: 'Interval & Slope',
    cam: { pos: [54, 42, 54], target: [4, 7, -4] },
    onEnter() {
      state.showCutPlane = false;
      state.cutAbove = false;
      state.showSeaLevel = false;
      state.showRidgeLine = false;
      setSurfaceMode('slope');
      updateSliceVisuals();
      seaLevelMesh.visible = false;
      updateRidgeLineGeometry();
    }
  },
  {
    num: '04',
    zh: '山顶与盆地',
    en: 'Summit & Basin',
    cam: { pos: [-38, 42, 60], target: [-15, 7, 4] },
    onEnter() {
      state.showCutPlane = false;
      state.cutAbove = false;
      state.showSeaLevel = false;
      state.showRidgeLine = false;
      if (state.surfaceMode === 'slope') setSurfaceMode('realistic');
      updateSliceVisuals();
      seaLevelMesh.visible = false;
      updateRidgeLineGeometry();
    }
  },
  {
    num: '05',
    zh: '山脊与山谷',
    en: 'Ridge & Valley',
    cam: { pos: [14, 40, 44], target: [-2, 8, -4] },
    onEnter() {
      state.showCutPlane = false;
      state.cutAbove = false;
      state.showSeaLevel = false;
      state.showRidgeLine = true;
      if (state.surfaceMode === 'slope') setSurfaceMode('realistic');
      updateSliceVisuals();
      seaLevelMesh.visible = false;
      updateRidgeLineGeometry();
    }
  },
  {
    num: '06',
    zh: '鞍部',
    en: 'Saddle',
    cam: { pos: [-8, 32, 24], target: [-10.5, 11, -17.2] },
    onEnter() {
      state.showCutPlane = false;
      state.cutAbove = false;
      state.showSeaLevel = false;
      state.showRidgeLine = false;
      updateSliceVisuals();
      seaLevelMesh.visible = false;
      updateRidgeLineGeometry();
    }
  },
  {
    num: '07',
    zh: '陡崖',
    en: 'Cliff',
    cam: { pos: [48, 26, 22], target: [25.2, 10, -5.6] },
    onEnter() {
      state.showCutPlane = false;
      state.cutAbove = false;
      state.showSeaLevel = false;
      state.showRidgeLine = false;
      updateSliceVisuals();
      seaLevelMesh.visible = false;
      updateRidgeLineGeometry();
    }
  },
  {
    num: '08',
    zh: '地形剖面图',
    en: 'Topographic Profile',
    cam: { pos: [46, 52, 62], target: [0, 5, 4] },
    onEnter() {
      state.showCutPlane = false;
      state.cutAbove = false;
      state.showSeaLevel = false;
      state.showRidgeLine = false;
      updateSliceVisuals();
      seaLevelMesh.visible = false;
      updateRidgeLineGeometry();
      if (!state.profile) {
        const p = PRESET_PROFILES.two_valleys;
        computeAndShowProfile(p.a, p.b, state.lang === 'zh' ? p.zh : p.en);
      }
    }
  },
  {
    num: '09',
    zh: '随堂检测',
    en: 'Quiz',
    cam: { pos: [-16, 36, 16], target: [-22.5, 18, -16.5] },
    onEnter() {
      state.showCutPlane = false;
      state.cutAbove = false;
      state.showSeaLevel = false;
      state.showRidgeLine = false;
      updateSliceVisuals();
      seaLevelMesh.visible = false;
      updateRidgeLineGeometry();
      // Hide landform labels during quiz to avoid giving away answers
      if (state.toggles.labels) {
        state.toggles.labels = false;
        document.querySelectorAll('#view-toggles .tog-btn').forEach(b => {
          b.classList.toggle('active', state.toggles[b.dataset.key]);
        });
      }
      updateQuizBeacon();
      if (!state.quizFinished && QUIZ_DATA[state.quizIndex]?.cam) {
        const c = QUIZ_DATA[state.quizIndex].cam;
        flyTo(c.pos, c.target, 750);
      }
    }
  }
];
