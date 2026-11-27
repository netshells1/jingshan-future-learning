'use strict';

let treeInstanced, treeData = [];

// Procedural Instanced Conifer Trees
function buildTrees() {
  // Deterministic pseudo-random tree placement on lower/mid gentle slopes
  const candidates = [];
  for (let i = 0; i < 4200 && candidates.length < 1150; i++) {
    const rx = (hash2(i, 17.3) * 2 - 1) * 3.85;
    const rz = (hash2(i, 91.7) * 2 - 1) * 3.85;
    const elev = sampleHeightKm(rx, rz);
    const slope = sampleSlopeKm(rx, rz);
    if (elev < LAKE_ELEV + 16 || elev > 840 || slope > 0.44) continue;
    // Avoid river beds
    const dw = closestOnPolyline(rx, rz, riverPolylines.west).dist;
    const de = closestOnPolyline(rx, rz, riverPolylines.east).dist;
    const dm = closestOnPolyline(rx, rz, riverPolylines.merged).dist;
    if (dw < 0.14 || de < 0.14 || dm < 0.18) continue;

    const s = 0.55 + hash2(i, 53.1) * 0.65;
    const rot = hash2(i, 29.4) * Math.PI * 2;
    candidates.push({ xKm: rx, zKm: rz, rawElev: elev, scale: s, rot });
  }
  treeData = candidates;

  const coneGeo = new THREE.ConeGeometry(0.32, 1.05, 6);
  coneGeo.translate(0, 0.55, 0);
  const coneMat = new THREE.MeshLambertMaterial({ color: 0x3b5e36 });
  treeInstanced = new THREE.InstancedMesh(coneGeo, coneMat, treeData.length);
  const color = new THREE.Color();
  for (let i = 0; i < treeData.length; i++) {
    const shade = 0.78 + hash2(i, 8.2) * 0.42;
    color.setRGB(0.18 * shade, 0.34 * shade, 0.18 * shade);
    treeInstanced.setColorAt(i, color);
  }
  treeInstanced.instanceColor.needsUpdate = true;
  scene.add(treeInstanced);
  updateTreeTransforms();
}

function updateTreeTransforms() {
  if (!treeInstanced) return;
  treeInstanced.visible = state.toggles.trees;
  if (!state.toggles.trees) return;

  const dummy = new THREE.Object3D();
  const scaleY = ELEV_TO_WORLD * state.exag;
  for (let i = 0; i < treeData.length; i++) {
    const t = treeData[i];
    if (state.cutAbove && t.rawElev > state.cutElev) {
      dummy.scale.set(0, 0, 0);
    } else {
      const y = getDisplayHeightKm(t.xKm, t.zKm) * scaleY;
      dummy.position.set(kmToWorld(t.xKm), y - 0.04, kmToWorld(t.zKm));
      dummy.rotation.set(0, t.rot, 0);
      dummy.scale.set(t.scale, t.scale * (0.9 + state.exag * 0.08), t.scale);
    }
    dummy.updateMatrix();
    treeInstanced.setMatrixAt(i, dummy.matrix);
  }
  treeInstanced.instanceMatrix.needsUpdate = true;
}
