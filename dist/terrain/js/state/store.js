'use strict';

const state = {
  lang: 'zh',
  chapter: 0,
  visited: new Set([0]),
  interval: 100,        // 50, 100, 200
  surfaceMode: 'realistic', // realistic | hypsometric | slope
  exag: 1.5,
  toggles: {
    contours: true,
    terrace: false,
    labels: true,
    projBase: true,
    water: true,
    trees: true,
    clouds: true,
    autoRotate: false
  },
  // Chapter 01 slice plane state
  cutElev: 450,
  showCutPlane: false,
  cutAbove: false,
  projectRays: false,
  sweeping: false,
  sweepDir: 1,
  // Chapter 02 sea level
  showSeaLevel: false,
  // Chapter 05 gold ridge line
  showRidgeLine: false,
  // Profile state
  profile: null, // { a:[x,z], b:[x,z], title, showLOS:true, samples:[], crossings:[], los:{} }
  showLOS: true,
  minimapEnlarged: false,
  // Hover state
  hoverKm: null,
  profileHoverT: null,
  // Quiz state
  quizIndex: 0,
  quizAnswers: Array(8).fill(null),
  quizFinished: false
};
