'use strict';

function bindAllEvents() {
  window.addEventListener('resize', onResize);

  // Top bar
  document.getElementById('lang-select').onchange = (e) => {
    state.lang = e.target.value;
    applyI18n();
  };
  document.getElementById('btn-prev').onclick = () => goToChapter(state.chapter - 1);
  document.getElementById('btn-next').onclick = () => goToChapter(state.chapter + 1);
  document.getElementById('btn-reset-view').onclick = resetCameraView;
  document.getElementById('compass-btn').onclick = resetToNorth;

  document.getElementById('btn-classroom').onclick = (e) => {
    document.body.classList.toggle('classroom-mode');
    e.currentTarget.classList.toggle('active');
    onResize();
  };
  document.getElementById('btn-fullscreen').onclick = () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
    else document.exitFullscreen?.();
  };

  // View settings panel
  document.getElementById('view-toggle-bar').onclick = () => {
    const v = document.getElementById('view');
    v.classList.toggle('collapsed');
    document.getElementById('view-chevron').textContent = v.classList.contains('collapsed') ? '▸' : '▾';
  };

  document.querySelectorAll('#seg-interval .seg-btn').forEach(btn => {
    btn.onclick = () => setIntervalValue(Number(btn.dataset.val));
  });
  document.querySelectorAll('#seg-surface .seg-btn').forEach(btn => {
    btn.onclick = () => setSurfaceMode(btn.dataset.val);
  });

  const exagSlider = document.getElementById('slider-exag');
  exagSlider.oninput = (e) => {
    state.exag = Number(e.target.value);
    document.getElementById('lbl-exag').textContent = `${state.exag.toFixed(2).replace(/\.00$/, '.0')}x`;
    terrainMat.uniforms.uExag.value = state.exag;
    updateTerrainVertices();
    updateQuizBeacon();
  };

  document.querySelectorAll('#view-toggles .tog-btn').forEach(btn => {
    btn.onclick = () => toggleSetting(btn.dataset.key);
  });

  bindProfileEvents();

  // Minimap enlarge
  document.getElementById('btn-minimap-enlarge').onclick = () => {
    state.minimapEnlarged = !state.minimapEnlarged;
    const box = document.getElementById('minimap-box');
    const drawer = document.getElementById('profile-drawer');
    box.classList.toggle('enlarged', state.minimapEnlarged);
    drawer.classList.toggle('minimap-wide', state.minimapEnlarged);
    document.getElementById('btn-minimap-enlarge').textContent =
      state.minimapEnlarged ? I18N[state.lang].shrink : I18N[state.lang].enlarge;
    setTimeout(() => { renderMinimap(); renderProfileChart(); }, 250);
  };

  bindMinimapEvents();

  // 3D Viewport Raycast Hover Sync
  const glCanvas = document.getElementById('gl-canvas');
  const raycaster = new THREE.Raycaster();
  const pointerNDC = new THREE.Vector2();
  glCanvas.addEventListener('pointermove', (e) => {
    if (e.buttons !== 0) return;
    const rect = glCanvas.getBoundingClientRect();
    pointerNDC.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointerNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointerNDC, camera);
    const hits = raycaster.intersectObject(terrainMesh, false);
    if (hits.length > 0) {
      const pt = hits[0].point;
      const xKm = worldToKm(pt.x);
      const zKm = worldToKm(pt.z);
      if (Math.abs(xKm) <= HALF_KM && Math.abs(zKm) <= HALF_KM) {
        updateHoverReadout(xKm, zKm);
        return;
      }
    }
    updateHoverReadout(null);
  });
  glCanvas.addEventListener('pointerleave', () => updateHoverReadout(null));

  // Keyboard shortcuts
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
    const k = e.key.toLowerCase();
    if (e.key === 'ArrowRight') goToChapter(state.chapter + 1);
    else if (e.key === 'ArrowLeft') goToChapter(state.chapter - 1);
    else if (k === 'r') resetCameraView();
    else if (k === '1') setSurfaceMode('realistic');
    else if (k === '2') setSurfaceMode('hypsometric');
    else if (k === '3') setSurfaceMode('slope');
    else if (k === 'c') toggleSetting('contours');
    else if (k === 'l') toggleSetting('labels');
    else if (k === 't') toggleSetting('terrace');
    else if (k === 'b') document.getElementById('btn-classroom').click();
    else if (k === 'f') document.getElementById('btn-fullscreen').click();
    else if (e.code === 'Space') { e.preventDefault(); toggleSetting('autoRotate'); }
  });
}

function onResize() {
  const vp = document.getElementById('viewport');
  const w = vp.clientWidth;
  const h = vp.clientHeight;
  if (w > 0 && h > 0 && renderer) {
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }
  renderMinimap();
  if (state.profile) renderProfileChart();
}
