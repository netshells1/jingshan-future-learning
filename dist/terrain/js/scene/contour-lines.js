'use strict';

let contourMinorLines, contourMajorLines;

function buildContourLines3D() {
  const minorMat = new THREE.LineBasicMaterial({ color: 0xe8dcc8, transparent: true, opacity: 0.42 });
  const majorMat = new THREE.LineBasicMaterial({ color: 0xd8b36a, transparent: true, opacity: 0.88 });
  contourMinorLines = new THREE.LineSegments(new THREE.BufferGeometry(), minorMat);
  contourMajorLines = new THREE.LineSegments(new THREE.BufferGeometry(), majorMat);
  scene.add(contourMinorLines);
  scene.add(contourMajorLines);
  updateContourLines3D();
}

function updateContourLines3D() {
  const contoursMap = getContoursForInterval(state.interval);
  const scaleY = ELEV_TO_WORLD * state.exag;
  const minorPos = [];
  const majorPos = [];
  const yLift = state.toggles.terrace ? 0.14 : 0.09;

  contoursMap.forEach((segs, level) => {
    if (state.cutAbove && level > state.cutElev + 0.5) return;
    const target = isMajorLevel(level, state.interval) ? majorPos : minorPos;
    const y = level * scaleY + yLift;
    for (let i = 0; i < segs.length; i++) {
      const s = segs[i];
      const x0 = -HALF_WORLD + s[0] * WORLD_SIZE;
      const z0 = -HALF_WORLD + s[1] * WORLD_SIZE;
      const x1 = -HALF_WORLD + s[2] * WORLD_SIZE;
      const z1 = -HALF_WORLD + s[3] * WORLD_SIZE;
      target.push(x0, y, z0, x1, y, z1);
    }
  });

  contourMinorLines.geometry.dispose();
  contourMinorLines.geometry = new THREE.BufferGeometry();
  contourMinorLines.geometry.setAttribute('position', new THREE.Float32BufferAttribute(minorPos, 3));

  contourMajorLines.geometry.dispose();
  contourMajorLines.geometry = new THREE.BufferGeometry();
  contourMajorLines.geometry.setAttribute('position', new THREE.Float32BufferAttribute(majorPos, 3));

  contourMinorLines.visible = state.toggles.contours;
  contourMajorLines.visible = state.toggles.contours;
}
