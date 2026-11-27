'use strict';

let renderer, scene, camera, controls;
const clock = new THREE.Clock();

function initThree() {
  const canvas = document.getElementById('gl-canvas');
  const vp = document.getElementById('viewport');

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(vp.clientWidth, vp.clientHeight, false);
  renderer.setClearColor(0x0b0d10, 1);

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0b0d10, 0.0022);

  camera = new THREE.PerspectiveCamera(42, vp.clientWidth / vp.clientHeight, 0.5, 500);
  camera.position.set(52, 46, 68);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 6, 0);
  controls.enableDamping = true;
  controls.dampingFactor = 0.075;
  controls.maxPolarAngle = Math.PI * 0.49;
  controls.minDistance = 18;
  controls.maxDistance = 175;
  controls.autoRotateSpeed = 0.65;

  controls.addEventListener('start', cancelCameraAnimation);

  // Subtle museum lighting for non-shader meshes (trees, pins, beacons)
  const amb = new THREE.HemisphereLight(0xdde8f5, 0x201d19, 0.72);
  scene.add(amb);
  const dir = new THREE.DirectionalLight(0xfff1d6, 1.05);
  dir.position.set(55, 70, 38);
  scene.add(dir);

  buildTerrainGeometry();
  buildSideWallsGeometry();
  buildContourLines3D();
  buildProjectionBase();
  buildWaterFeatures();
  buildTrees();
  buildInteractiveOverlays();
}
