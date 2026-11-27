'use strict';

function setIntervalValue(val) {
  state.interval = val;
  document.getElementById('lbl-interval').textContent = `${val} m`;
  document.querySelectorAll('#seg-interval .seg-btn').forEach(b => {
    b.classList.toggle('active', Number(b.dataset.val) === val);
  });
  updateContourLines3D();
  if (state.toggles.terrace) updateTerrainVertices();
  redrawProjectionBaseTexture();
  renderMinimap();
  if (state.profile) computeAndShowProfile(state.profile.a, state.profile.b, state.profile.title);
  if (state.chapter === 7) renderLesson();
}

function setSurfaceMode(mode) {
  state.surfaceMode = mode;
  terrainMat.uniforms.uSurfaceMode.value = mode === 'realistic' ? 0 : mode === 'hypsometric' ? 1 : 2;
  document.querySelectorAll('#seg-surface .seg-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.val === mode);
  });
}

function toggleSetting(key) {
  state.toggles[key] = !state.toggles[key];
  document.querySelectorAll('#view-toggles .tog-btn').forEach(b => {
    b.classList.toggle('active', state.toggles[b.dataset.key]);
  });

  if (key === 'contours') {
    contourMinorLines.visible = state.toggles.contours;
    contourMajorLines.visible = state.toggles.contours;
  } else if (key === 'terrace') {
    updateTerrainVertices();
  } else if (key === 'projBase') {
    projBaseMesh.visible = state.toggles.projBase;
    cornerDropLines.visible = state.toggles.projBase;
    updateSliceVisuals();
  } else if (key === 'water') {
    updateWaterElevations();
    redrawProjectionBaseTexture();
    renderMinimap();
    if (state.profile) renderProfileChart();
  } else if (key === 'trees') {
    updateTreeTransforms();
  } else if (key === 'clouds') {
    terrainMat.uniforms.uClouds.value = state.toggles.clouds ? 1.0 : 0.0;
  } else if (key === 'autoRotate') {
    controls.autoRotate = state.toggles.autoRotate;
  }
  if (state.chapter === 0 || state.chapter === 1) renderLesson();
}
