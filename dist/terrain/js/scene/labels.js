'use strict';

const labelElements = [];
function initLandformLabels() {
  const layer = document.getElementById('labels-layer');
  layer.innerHTML = '';
  labelElements.length = 0;

  LANDMARKS.forEach(lm => {
    const el = document.createElement('div');
    el.className = 'landform-pin';
    el.innerHTML = `
      <div class="pin-pill">
        <span class="pin-name"></span>
        <span class="pin-elev"></span>
      </div>
      <div class="pin-stem"></div>
      <div class="pin-dot"></div>
    `;
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      flyToLandmark(lm.x, lm.z, 26, 20);
    });
    layer.appendChild(el);
    labelElements.push({ lm, el });
  });
  updateLabelTexts();
}

function updateLabelTexts() {
  const isZh = state.lang === 'zh';
  labelElements.forEach(({ lm, el }) => {
    el.querySelector('.pin-name').textContent = isZh ? lm.zh : lm.en;
    const elevEl = el.querySelector('.pin-elev');
    if (lm.targetElev !== null) {
      elevEl.textContent = `${lm.targetElev}m`;
    } else if (lm.noteZh) {
      elevEl.textContent = isZh ? lm.noteZh : lm.noteEn;
    } else {
      elevEl.textContent = '';
    }
  });
}

function projectLabels() {
  const layer = document.getElementById('labels-layer');
  if (!state.toggles.labels) {
    layer.style.display = 'none';
    return;
  }
  layer.style.display = 'block';

  const vp = document.getElementById('viewport');
  const w = vp.clientWidth;
  const h = vp.clientHeight;
  const scaleY = ELEV_TO_WORLD * state.exag;
  const vec = new THREE.Vector3();

  labelElements.forEach(({ lm, el }) => {
    const rawElev = sampleHeightKm(lm.x, lm.z);
    if (state.cutAbove && rawElev > state.cutElev) {
      el.style.display = 'none';
      return;
    }
    const elev = state.toggles.terrace ? getQuantizedHeight(rawElev, state.interval) : rawElev;
    vec.set(kmToWorld(lm.x), elev * scaleY + 0.3, kmToWorld(lm.z));
    vec.project(camera);

    if (vec.z > 1 || vec.z < -1) {
      el.style.display = 'none';
      return;
    }
    const sx = (vec.x * 0.5 + 0.5) * w;
    const sy = (-vec.y * 0.5 + 0.5) * h;
    if (sx < -40 || sx > w + 40 || sy < -40 || sy > h + 40) {
      el.style.display = 'none';
      return;
    }
    el.style.display = 'flex';
    // Clamp labels to stay within viewport with some margin
    const clampX = Math.max(60, Math.min(w - 60, sx));
    const clampY = Math.max(30, Math.min(h - 20, sy));
    el.style.left = `${clampX.toFixed(1)}px`;
    el.style.top = `${clampY.toFixed(1)}px`;
  });
}
