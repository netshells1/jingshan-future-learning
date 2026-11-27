'use strict';

function animate() {
  requestAnimationFrame(animate);
  const elapsed = clock.getElapsedTime();

  // Update shaders
  terrainMat.uniforms.uTime.value = elapsed;
  if (lakeMesh) lakeMesh.material.uniforms.uTime.value = elapsed;

  // Chapter 01 cutting plane sweep animation
  if (state.chapter === 1 && state.sweeping) {
    state.cutElev += state.sweepDir * 3.2;
    if (state.cutElev >= 950) { state.cutElev = 950; state.sweepDir = -1; }
    if (state.cutElev <= 80)  { state.cutElev = 80;  state.sweepDir = 1; }
    const slider = document.getElementById('slider-cut');
    const lbl = document.getElementById('cut-elev-lbl');
    if (slider) slider.value = Math.round(state.cutElev);
    if (lbl) lbl.textContent = `${Math.round(state.cutElev)} m`;
    updateSliceVisuals();
    if (state.cutAbove) { updateSideWallsVertices(); updateContourLines3D(); updateWaterElevations(); updateTreeTransforms(); }
    renderMinimap();
  }

  animateQuizBeacon(elapsed);
  stepCameraAnimation();

  controls.update();
  updateCompass();
  projectLabels();
  renderer.render(scene, camera);
}

function bootstrap() {
  buildHeightmap();
  buildNavigationUI();
  initThree();
  initLandformLabels();
  bindAllEvents();
  goToChapter(0);
  renderMinimap();
  animate();
}

window.addEventListener('DOMContentLoaded', bootstrap);
