'use strict';

let projBaseMesh, projBaseCanvas, projBaseTex, cornerDropLines;

// Floating 2D Projection Base beneath the 3D terrain block
function buildProjectionBase() {
  projBaseCanvas = document.createElement('canvas');
  projBaseCanvas.width = 1024;
  projBaseCanvas.height = 1024;
  projBaseTex = new THREE.CanvasTexture(projBaseCanvas);
  projBaseTex.anisotropy = 4;

  const geom = new THREE.PlaneGeometry(WORLD_SIZE, WORLD_SIZE);
  geom.rotateX(-Math.PI / 2);
  const mat = new THREE.MeshBasicMaterial({
    map: projBaseTex,
    transparent: true,
    opacity: 0.92,
    side: THREE.DoubleSide
  });
  projBaseMesh = new THREE.Mesh(geom, mat);
  projBaseMesh.position.y = PROJ_BASE_Y;
  scene.add(projBaseMesh);

  // 4 subtle vertical dashed drop lines at corners connecting terrain base to 2D projection base
  const cornerPts = [
    -HALF_WORLD, BASE_FLOOR_Y, -HALF_WORLD, -HALF_WORLD, PROJ_BASE_Y, -HALF_WORLD,
     HALF_WORLD, BASE_FLOOR_Y, -HALF_WORLD,  HALF_WORLD, PROJ_BASE_Y, -HALF_WORLD,
     HALF_WORLD, BASE_FLOOR_Y,  HALF_WORLD,  HALF_WORLD, PROJ_BASE_Y,  HALF_WORLD,
    -HALF_WORLD, BASE_FLOOR_Y,  HALF_WORLD, -HALF_WORLD, PROJ_BASE_Y,  HALF_WORLD
  ];
  const dropGeo = new THREE.BufferGeometry();
  dropGeo.setAttribute('position', new THREE.Float32BufferAttribute(cornerPts, 3));
  cornerDropLines = new THREE.LineSegments(dropGeo, new THREE.LineBasicMaterial({
    color: 0xd8b36a, transparent: true, opacity: 0.28
  }));
  scene.add(cornerDropLines);

  redrawProjectionBaseTexture();
}

function redrawProjectionBaseTexture() {
  const ctx = projBaseCanvas.getContext('2d');
  const S = projBaseCanvas.width;
  ctx.clearRect(0, 0, S, S);

  ctx.fillStyle = 'rgba(15, 18, 24, 0.94)';
  ctx.fillRect(0, 0, S, S);

  // Subtle 1 km grid
  ctx.strokeStyle = 'rgba(232, 220, 200, 0.07)';
  ctx.lineWidth = 1;
  for (let k = 1; k < 8; k++) {
    const p = (k / 8) * S;
    ctx.beginPath(); ctx.moveTo(p, 0); ctx.lineTo(p, S); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, p); ctx.lineTo(S, p); ctx.stroke();
  }

  // Lake mask
  if (state.toggles.water) {
    drawWaterOn2DCanvas(ctx, S);
  }

  // Marching Squares Contours
  const contoursMap = getContoursForInterval(state.interval);
  ctx.lineCap = 'round';
  contoursMap.forEach((segs, level) => {
    const major = isMajorLevel(level, state.interval);
    ctx.strokeStyle = major ? 'rgba(216, 179, 106, 0.85)' : 'rgba(232, 220, 200, 0.34)';
    ctx.lineWidth = major ? 2.2 : 1.0;
    ctx.beginPath();
    for (let i = 0; i < segs.length; i++) {
      const s = segs[i];
      ctx.moveTo(s[0] * S, s[1] * S);
      ctx.lineTo(s[2] * S, s[3] * S);
    }
    ctx.stroke();
  });

  // Border & N label
  ctx.strokeStyle = 'rgba(216, 179, 106, 0.55)';
  ctx.lineWidth = 4;
  ctx.strokeRect(2, 2, S - 4, S - 4);
  ctx.fillStyle = 'rgba(216, 179, 106, 0.8)';
  ctx.font = 'bold 28px monospace';
  ctx.fillText('N ↑', 24, 42);

  projBaseTex.needsUpdate = true;
}
