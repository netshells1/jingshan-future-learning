'use strict';

let terrainMesh, terrainMat, terrainGeo;
let wallMesh, wallGeo, wallMat;

function buildTerrainGeometry() {
  const vertCount = GRID * GRID;
  const positions = new Float32Array(vertCount * 3);
  const rawElevs = new Float32Array(vertCount);
  const slopes = new Float32Array(vertCount);
  const step = WORLD_SIZE / (GRID - 1);

  for (let iz = 0; iz < GRID; iz++) {
    const z = -HALF_WORLD + iz * step;
    for (let ix = 0; ix < GRID; ix++) {
      const x = -HALF_WORLD + ix * step;
      const idx = iz * GRID + ix;
      const h = heightGrid[idx];
      positions[idx * 3] = x;
      positions[idx * 3 + 1] = h * ELEV_TO_WORLD * state.exag;
      positions[idx * 3 + 2] = z;
      rawElevs[idx] = h;
      slopes[idx] = slopeGrid[idx];
    }
  }

  const indices = new Uint32Array((GRID - 1) * (GRID - 1) * 6);
  let ptr = 0;
  for (let iz = 0; iz < GRID - 1; iz++) {
    for (let ix = 0; ix < GRID - 1; ix++) {
      const tl = iz * GRID + ix;
      const tr = tl + 1;
      const bl = tl + GRID;
      const br = bl + 1;
      indices[ptr++] = tl;
      indices[ptr++] = bl;
      indices[ptr++] = tr;
      indices[ptr++] = tr;
      indices[ptr++] = bl;
      indices[ptr++] = br;
    }
  }

  terrainGeo = new THREE.BufferGeometry();
  terrainGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  terrainGeo.setAttribute('aRawElev', new THREE.BufferAttribute(rawElevs, 1));
  terrainGeo.setAttribute('aSlope', new THREE.BufferAttribute(slopes, 1));
  terrainGeo.setIndex(new THREE.BufferAttribute(indices, 1));
  terrainGeo.computeVertexNormals();

  terrainMat = new THREE.ShaderMaterial({
    vertexShader: TERRAIN_VERT,
    fragmentShader: TERRAIN_FRAG,
    uniforms: {
      uSurfaceMode: { value: 0 },
      uTime: { value: 0 },
      uClouds: { value: 1.0 },
      uCutActive: { value: 0.0 },
      uCutAbove: { value: 0.0 },
      uCutElev: { value: 450.0 },
      uHoverActive: { value: 0.0 },
      uHoverXZ: { value: new THREE.Vector2(0, 0) },
      uExag: { value: state.exag },
      uElevToWorld: { value: ELEV_TO_WORLD }
    },
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
    side: THREE.DoubleSide
  });

  terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
  scene.add(terrainMesh);
}

function updateTerrainVertices() {
  const posAttr = terrainGeo.getAttribute('position');
  const arr = posAttr.array;
  const scaleY = ELEV_TO_WORLD * state.exag;
  const terrace = state.toggles.terrace;
  const interval = state.interval;

  for (let i = 0; i < GRID * GRID; i++) {
    let h = heightGrid[i];
    if (terrace) h = getQuantizedHeight(h, interval);
    arr[i * 3 + 1] = h * scaleY;
  }
  posAttr.needsUpdate = true;
  terrainGeo.computeVertexNormals();
  updateSideWallsVertices();
  updateContourLines3D();
  updateWaterElevations();
  updateTreeTransforms();
  updateSliceVisuals();
  updateTransectVisual();
  updateRidgeLineGeometry();
}

// Watertight geological strata walls around all 4 edges + bottom plate
function buildSideWallsGeometry() {
  // 4 edges, each has GRID columns × 2 rows (top rim, bottom floor) + 1 bottom quad
  const edgeVerts = GRID * 2 * 4 + 4;
  const positions = new Float32Array(edgeVerts * 3);
  const indices = [];

  const step = WORLD_SIZE / (GRID - 1);
  const pushEdge = (offsetVert, getCoord) => {
    for (let i = 0; i < GRID; i++) {
      const c = getCoord(i);
      const topI = offsetVert + i * 2;
      const botI = topI + 1;
      positions[topI * 3] = c.x;
      positions[topI * 3 + 1] = c.y;
      positions[topI * 3 + 2] = c.z;
      positions[botI * 3] = c.x;
      positions[botI * 3 + 1] = BASE_FLOOR_Y;
      positions[botI * 3 + 2] = c.z;
    }
    for (let i = 0; i < GRID - 1; i++) {
      const a = offsetVert + i * 2;
      const b = a + 1;
      const c = a + 2;
      const d = a + 3;
      indices.push(a, b, c, c, b, d);
    }
  };

  const scaleY = ELEV_TO_WORLD * state.exag;
  let off = 0;
  // South wall (+Z, left to right)
  pushEdge(off, i => ({ x: -HALF_WORLD + i * step, z: HALF_WORLD, y: heightGrid[(GRID - 1) * GRID + i] * scaleY }));
  off += GRID * 2;
  // East wall (+X, front to back)
  pushEdge(off, i => ({ x: HALF_WORLD, z: HALF_WORLD - i * step, y: heightGrid[(GRID - 1 - i) * GRID + (GRID - 1)] * scaleY }));
  off += GRID * 2;
  // North wall (-Z, right to left)
  pushEdge(off, i => ({ x: HALF_WORLD - i * step, z: -HALF_WORLD, y: heightGrid[GRID - 1 - i] * scaleY }));
  off += GRID * 2;
  // West wall (-X, back to front)
  pushEdge(off, i => ({ x: -HALF_WORLD, z: -HALF_WORLD + i * step, y: heightGrid[i * GRID] * scaleY }));
  off += GRID * 2;

  // Bottom plate
  const b0 = off;
  const corners = [[-HALF_WORLD, -HALF_WORLD], [HALF_WORLD, -HALF_WORLD], [HALF_WORLD, HALF_WORLD], [-HALF_WORLD, HALF_WORLD]];
  for (let k = 0; k < 4; k++) {
    positions[(b0 + k) * 3] = corners[k][0];
    positions[(b0 + k) * 3 + 1] = BASE_FLOOR_Y;
    positions[(b0 + k) * 3 + 2] = corners[k][1];
  }
  indices.push(b0, b0 + 1, b0 + 2, b0, b0 + 2, b0 + 3);

  wallGeo = new THREE.BufferGeometry();
  wallGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  wallGeo.setIndex(indices);
  wallGeo.computeVertexNormals();

  wallMat = new THREE.ShaderMaterial({
    vertexShader: WALL_VERT,
    fragmentShader: WALL_FRAG,
    side: THREE.DoubleSide
  });
  wallMesh = new THREE.Mesh(wallGeo, wallMat);
  scene.add(wallMesh);
}

function updateSideWallsVertices() {
  const pos = wallGeo.getAttribute('position').array;
  const scaleY = ELEV_TO_WORLD * state.exag;
  const terrace = state.toggles.terrace;
  const interval = state.interval;
  const getH = (idx) => {
    let h = heightGrid[idx];
    if (terrace) h = getQuantizedHeight(h, interval);
    if (state.cutAbove && h > state.cutElev) h = state.cutElev;
    return h * scaleY;
  };

  let off = 0;
  for (let i = 0; i < GRID; i++) pos[(off + i * 2) * 3 + 1] = getH((GRID - 1) * GRID + i);
  off += GRID * 2;
  for (let i = 0; i < GRID; i++) pos[(off + i * 2) * 3 + 1] = getH((GRID - 1 - i) * GRID + (GRID - 1));
  off += GRID * 2;
  for (let i = 0; i < GRID; i++) pos[(off + i * 2) * 3 + 1] = getH(GRID - 1 - i);
  off += GRID * 2;
  for (let i = 0; i < GRID; i++) pos[(off + i * 2) * 3 + 1] = getH(i * GRID);

  wallGeo.getAttribute('position').needsUpdate = true;
  wallGeo.computeVertexNormals();
}
