'use strict';

let slicePlaneMesh, sliceRingLines, sliceProjRingLines, sliceRaysLines;
let seaLevelMesh;
let ridgeLineMesh;
let transectGroup;
let quizBeaconGroup, quizBeamMesh, quizRing1, quizRing2;

// Chapter overlays: Cutting Plane, Sea Level Plane, Gold Ridge Line, Transect Line, Quiz Beacon
function buildInteractiveOverlays() {
  // 1. Cutting plane (Ch 01)
  const sliceGeo = new THREE.PlaneGeometry(WORLD_SIZE + 2, WORLD_SIZE + 2);
  sliceGeo.rotateX(-Math.PI / 2);
  const sliceMat = new THREE.MeshBasicMaterial({
    color: 0xd8b36a, transparent: true, opacity: 0.16, side: THREE.DoubleSide, depthWrite: false
  });
  slicePlaneMesh = new THREE.Mesh(sliceGeo, sliceMat);
  const borderGeo = new THREE.EdgesGeometry(sliceGeo);
  slicePlaneMesh.add(new THREE.LineSegments(borderGeo, new THREE.LineBasicMaterial({ color: 0xd8b36a, transparent: true, opacity: 0.65 })));
  slicePlaneMesh.visible = false;
  scene.add(slicePlaneMesh);

  sliceRingLines = new THREE.LineSegments(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: 0xffd77a }));
  sliceProjRingLines = new THREE.LineSegments(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: 0xffd77a }));
  sliceRaysLines = new THREE.LineSegments(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: 0xd8b36a, transparent: true, opacity: 0.35 }));
  scene.add(sliceRingLines);
  scene.add(sliceProjRingLines);
  scene.add(sliceRaysLines);

  // 2. Sea level plane (Ch 02)
  const seaGeo = new THREE.PlaneGeometry(WORLD_SIZE + 6, WORLD_SIZE + 6);
  seaGeo.rotateX(-Math.PI / 2);
  seaLevelMesh = new THREE.Mesh(seaGeo, new THREE.MeshBasicMaterial({
    color: 0x3a96d1, transparent: true, opacity: 0.22, side: THREE.DoubleSide, depthWrite: false
  }));
  seaLevelMesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(seaGeo), new THREE.LineBasicMaterial({
    color: 0x56b6f0, transparent: true, opacity: 0.6
  })));
  seaLevelMesh.position.y = 0;
  seaLevelMesh.visible = false;
  scene.add(seaLevelMesh);

  // 3. Gold 3D Ridge Line (Ch 05)
  ridgeLineMesh = new THREE.Line(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({
    color: 0xffcf6e, linewidth: 2
  }));
  // Thicker visible ribbon tube built dynamically
  ridgeLineMesh = new THREE.Group();
  scene.add(ridgeLineMesh);
  updateRidgeLineGeometry();

  // 4. Transect Group (A-B profile on 3D terrain)
  transectGroup = new THREE.Group();
  scene.add(transectGroup);

  // 5. Quiz Pulsing Gold Beacon (Ch 09)
  quizBeaconGroup = new THREE.Group();
  const beamGeo = new THREE.CylinderGeometry(0.14, 0.32, 18, 16, 1, true);
  beamGeo.translate(0, 9, 0);
  quizBeamMesh = new THREE.Mesh(beamGeo, new THREE.MeshBasicMaterial({
    color: 0xd8b36a, transparent: true, opacity: 0.55, side: THREE.DoubleSide, depthWrite: false
  }));
  const ringGeo1 = new THREE.RingGeometry(0.7, 1.05, 32);
  ringGeo1.rotateX(-Math.PI / 2);
  quizRing1 = new THREE.Mesh(ringGeo1, new THREE.MeshBasicMaterial({
    color: 0xffd670, transparent: true, opacity: 0.9, side: THREE.DoubleSide, depthWrite: false
  }));
  quizRing2 = new THREE.Mesh(ringGeo1.clone(), new THREE.MeshBasicMaterial({
    color: 0xd8b36a, transparent: true, opacity: 0.6, side: THREE.DoubleSide, depthWrite: false
  }));
  quizBeaconGroup.add(quizBeamMesh, quizRing1, quizRing2);
  quizBeaconGroup.visible = false;
  scene.add(quizBeaconGroup);
}

function updateSliceVisuals() {
  const active = state.showCutPlane;
  slicePlaneMesh.visible = active;
  sliceRingLines.visible = active;
  sliceProjRingLines.visible = active && state.toggles.projBase;
  sliceRaysLines.visible = active && state.projectRays && state.toggles.projBase;

  terrainMat.uniforms.uCutActive.value = active ? 1.0 : 0.0;
  terrainMat.uniforms.uCutAbove.value = (active && state.cutAbove) ? 1.0 : 0.0;
  terrainMat.uniforms.uCutElev.value = state.cutElev;

  if (!active) return;

  const scaleY = ELEV_TO_WORLD * state.exag;
  const ySlice = state.cutElev * scaleY;
  slicePlaneMesh.position.y = ySlice;

  // Extract single exact iso-contour at state.cutElev
  const segsMap = extractContourLevels([state.cutElev]);
  const segs = segsMap.get(state.cutElev) || [];
  const ringPos = [];
  const projPos = [];
  const rayPos = [];

  for (let i = 0; i < segs.length; i++) {
    const s = segs[i];
    const x0 = -HALF_WORLD + s[0] * WORLD_SIZE;
    const z0 = -HALF_WORLD + s[1] * WORLD_SIZE;
    const x1 = -HALF_WORLD + s[2] * WORLD_SIZE;
    const z1 = -HALF_WORLD + s[3] * WORLD_SIZE;
    ringPos.push(x0, ySlice + 0.14, z0, x1, ySlice + 0.14, z1);
    projPos.push(x0, PROJ_BASE_Y + 0.12, z0, x1, PROJ_BASE_Y + 0.12, z1);
    if (i % 7 === 0) {
      rayPos.push(x0, ySlice + 0.1, z0, x0, PROJ_BASE_Y + 0.1, z0);
    }
  }

  sliceRingLines.geometry.dispose();
  sliceRingLines.geometry = new THREE.BufferGeometry();
  sliceRingLines.geometry.setAttribute('position', new THREE.Float32BufferAttribute(ringPos, 3));

  sliceProjRingLines.geometry.dispose();
  sliceProjRingLines.geometry = new THREE.BufferGeometry();
  sliceProjRingLines.geometry.setAttribute('position', new THREE.Float32BufferAttribute(projPos, 3));

  sliceRaysLines.geometry.dispose();
  sliceRaysLines.geometry = new THREE.BufferGeometry();
  sliceRaysLines.geometry.setAttribute('position', new THREE.Float32BufferAttribute(rayPos, 3));
}

function updateRidgeLineGeometry() {
  while (ridgeLineMesh.children.length > 0) {
    const c = ridgeLineMesh.children.pop();
    c.geometry.dispose();
  }
  ridgeLineMesh.visible = state.showRidgeLine;
  if (!state.showRidgeLine) return;

  const scaleY = ELEV_TO_WORLD * state.exag;
  const makeRidgeTube = (ptsKm) => {
    const curvePts = [];
    for (let i = 0; i <= 40; i++) {
      const t = i / 40;
      const x = ptsKm[0][0] * (1 - t) + ptsKm[1][0] * t;
      const z = ptsKm[0][1] * (1 - t) + ptsKm[1][1] * t;
      const y = getDisplayHeightKm(x, z) * scaleY + 0.25;
      curvePts.push(new THREE.Vector3(kmToWorld(x), y, kmToWorld(z)));
    }
    const curve = new THREE.CatmullRomCurve3(curvePts);
    const geo = new THREE.TubeGeometry(curve, 48, 0.22, 8, false);
    const mat = new THREE.MeshBasicMaterial({ color: 0xffcf60 });
    ridgeLineMesh.add(new THREE.Mesh(geo, mat));
  };

  // Main South Spur Ridge from 中峰 (+0.15, -1.80) down to (+0.10, +0.55)
  makeRidgeTube([[0.15, -1.80], [0.10, 0.55]]);
  // West Spur Ridge from 主峰 (-2.25, -1.65) down SW to (-3.05, -0.20)
  makeRidgeTube([[-2.25, -1.65], [-3.05, -0.20]]);
}

function updateTransectVisual() {
  while (transectGroup.children.length > 0) {
    const c = transectGroup.children.pop();
    if (c.geometry) c.geometry.dispose();
  }
  if (!state.profile) return;

  const scaleY = ELEV_TO_WORLD * state.exag;
  const { a, b, los } = state.profile;
  const pts = [];
  const steps = 64;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const xKm = a[0] + (b[0] - a[0]) * t;
    const zKm = a[1] + (b[1] - a[1]) * t;
    const y = getDisplayHeightKm(xKm, zKm) * scaleY + 0.25;
    pts.push(new THREE.Vector3(kmToWorld(xKm), y, kmToWorld(zKm)));
  }

  const curve = new THREE.CatmullRomCurve3(pts);
  const tube = new THREE.Mesh(
    new THREE.TubeGeometry(curve, 72, 0.20, 8, false),
    new THREE.MeshBasicMaterial({ color: 0xf09d51 })
  );
  transectGroup.add(tube);

  // Pin markers A and B
  const addPin = (km, col) => {
    const y = getDisplayHeightKm(km[0], km[1]) * scaleY;
    const wx = kmToWorld(km[0]);
    const wz = kmToWorld(km[1]);
    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.12, 4.5, 10),
      new THREE.MeshBasicMaterial({ color: col })
    );
    pole.position.set(wx, y + 2.25, wz);
    const cap = new THREE.Mesh(
      new THREE.SphereGeometry(0.45, 14, 14),
      new THREE.MeshBasicMaterial({ color: col })
    );
    cap.position.set(wx, y + 4.6, wz);
    transectGroup.add(pole, cap);
  };
  addPin(a, 0x5dbb7b);
  addPin(b, 0xd8b36a);

  // Line-of-sight 3D ray if enabled
  if (state.showLOS && los) {
    const yA = (sampleHeightKm(a[0], a[1]) + 2) * scaleY + 0.25;
    const yB = (sampleHeightKm(b[0], b[1]) + 2) * scaleY + 0.25;
    const losGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(kmToWorld(a[0]), yA, kmToWorld(a[1])),
      new THREE.Vector3(kmToWorld(b[0]), yB, kmToWorld(b[1]))
    ]);
    const losLine = new THREE.Line(losGeo, new THREE.LineBasicMaterial({
      color: los.clear ? 0x5dbb7b : 0xe06154
    }));
    transectGroup.add(losLine);
  }
}

function updateQuizBeacon() {
  if (state.chapter !== 9 || state.quizFinished) {
    quizBeaconGroup.visible = false;
    return;
  }
  const q = QUIZ_DATA[state.quizIndex];
  if (!q || !q.beacon) {
    quizBeaconGroup.visible = false;
    return;
  }
  quizBeaconGroup.visible = true;
  const scaleY = ELEV_TO_WORLD * state.exag;
  const y = getDisplayHeightKm(q.beacon[0], q.beacon[1]) * scaleY;
  quizBeaconGroup.position.set(kmToWorld(q.beacon[0]), y + 0.15, kmToWorld(q.beacon[1]));
}

// Quiz beacon pulse, advanced once per frame
function animateQuizBeacon(elapsed) {
  if (quizBeaconGroup && quizBeaconGroup.visible) {
    const p1 = (elapsed * 0.9) % 1;
    const p2 = (elapsed * 0.9 + 0.5) % 1;
    quizRing1.scale.setScalar(1 + p1 * 3.2);
    quizRing1.material.opacity = (1 - p1) * 0.9;
    quizRing2.scale.setScalar(1 + p2 * 3.2);
    quizRing2.material.opacity = (1 - p2) * 0.7;
    quizBeamMesh.material.opacity = 0.42 + 0.18 * Math.sin(elapsed * 4.0);
  }
}
