'use strict';

let lakeMesh, riverGroup;

// Rivers & SW Basin Lake in 3D
function buildWaterFeatures() {
  // Lake water plane inside SW basin at LAKE_ELEV, masked by true basin shoreline depth
  const lakeW = 19, lakeH = 17, segs = 64;
  const centerKmX = -1.60, centerKmZ = 1.95;
  const lakeGeo = new THREE.PlaneGeometry(lakeW, lakeH, segs, segs);
  lakeGeo.rotateX(-Math.PI / 2);
  const lPos = lakeGeo.getAttribute('position');
  const shoreDepth = new Float32Array(lPos.count);
  for (let i = 0; i < lPos.count; i++) {
    const wx = kmToWorld(centerKmX) + lPos.getX(i);
    const wz = kmToWorld(centerKmZ) + lPos.getZ(i);
    shoreDepth[i] = LAKE_ELEV - sampleHeightKm(worldToKm(wx), worldToKm(wz));
  }
  lakeGeo.setAttribute('aShoreDepth', new THREE.BufferAttribute(shoreDepth, 1));

  const lakeMat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: LAKE_VERT,
    fragmentShader: LAKE_FRAG,
    transparent: true,
    depthWrite: false
  });
  lakeMesh = new THREE.Mesh(lakeGeo, lakeMat);
  lakeMesh.position.set(kmToWorld(centerKmX), LAKE_ELEV * ELEV_TO_WORLD * state.exag, kmToWorld(centerKmZ));
  scene.add(lakeMesh);

  riverGroup = new THREE.Group();
  scene.add(riverGroup);
  rebuildRiverRibbons();
}

function rebuildRiverRibbons() {
  while (riverGroup.children.length > 0) {
    const c = riverGroup.children.pop();
    c.geometry.dispose();
  }
  const mat = new THREE.MeshBasicMaterial({
    color: 0x43a3dd,
    transparent: true,
    opacity: 0.9,
    side: THREE.DoubleSide
  });

  const addRibbon = (pts, wStart, wEnd) => {
    const pos = [];
    const indices = [];
    const scaleY = ELEV_TO_WORLD * state.exag;
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      const prev = pts[Math.max(0, i - 1)];
      const next = pts[Math.min(pts.length - 1, i + 1)];
      const tx = next[0] - prev[0];
      const tz = next[1] - prev[1];
      const len = Math.hypot(tx, tz) || 1;
      const nx = -tz / len;
      const nz = tx / len;
      const t = i / (pts.length - 1);
      const halfW = (wStart * (1 - t) + wEnd * t) * 0.5;
      const cx = kmToWorld(p[0]);
      const cz = kmToWorld(p[1]);
      const y = getDisplayHeightKm(p[0], p[1]) * scaleY + 0.11;
      pos.push(cx - nx * halfW, y, cz - nz * halfW);
      pos.push(cx + nx * halfW, y, cz + nz * halfW);
      if (i < pts.length - 1) {
        const b = i * 2;
        indices.push(b, b + 1, b + 2, b + 1, b + 3, b + 2);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setIndex(indices);
    riverGroup.add(new THREE.Mesh(g, mat));
  };

  addRibbon(riverPolylines.west, 0.24, 0.44);
  addRibbon(riverPolylines.east, 0.24, 0.44);
  addRibbon(riverPolylines.merged, 0.46, 0.72);
}

function updateWaterElevations() {
  lakeMesh.position.y = LAKE_ELEV * ELEV_TO_WORLD * state.exag;
  lakeMesh.visible = state.toggles.water && (!state.cutAbove || LAKE_ELEV <= state.cutElev);
  riverGroup.visible = state.toggles.water;
  rebuildRiverRibbons();
}
