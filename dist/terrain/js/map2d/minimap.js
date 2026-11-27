'use strict';

let minimapDrag = null;

function renderMinimap() {
  const canvas = document.getElementById('minimap-canvas');
  const wrap = canvas.parentElement;
  const size = wrap.clientWidth;
  if (size <= 0) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  if (canvas.width !== Math.round(size * dpr) || canvas.height !== Math.round(size * dpr)) {
    canvas.width = Math.round(size * dpr);
    canvas.height = Math.round(size * dpr);
  }
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  // Background relief tint
  ctx.fillStyle = '#0e1217';
  ctx.fillRect(0, 0, size, size);

  // Subtle elevation shading cells (64×64 quick heat underlay)
  const stepC = 4;
  const cellPx = (size / GRID) * stepC;
  for (let iz = 0; iz < GRID; iz += stepC) {
    for (let ix = 0; ix < GRID; ix += stepC) {
      const h = heightGrid[iz * GRID + ix];
      const t = Math.min(1, Math.max(0, (h - 35) / 1400));
      const r = Math.round(16 + t * 44);
      const g = Math.round(22 + t * 34);
      const b = Math.round(24 + t * 20);
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect((ix / (GRID - 1)) * size, (iz / (GRID - 1)) * size, cellPx + 0.6, cellPx + 0.6);
    }
  }

  // Subtle 1 km grid
  ctx.strokeStyle = 'rgba(232, 220, 200, 0.06)';
  ctx.lineWidth = 0.75;
  for (let k = 1; k < 8; k++) {
    const p = (k / 8) * size;
    ctx.beginPath(); ctx.moveTo(p, 0); ctx.lineTo(p, size); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, p); ctx.lineTo(size, p); ctx.stroke();
  }

  // Water features
  if (state.toggles.water) {
    drawWaterOn2DCanvas(ctx, size);
  }

  // Marching Squares Contours
  const contoursMap = getContoursForInterval(state.interval);
  contoursMap.forEach((segs, level) => {
    const major = isMajorLevel(level, state.interval);
    ctx.strokeStyle = major ? 'rgba(216, 179, 106, 0.85)' : 'rgba(232, 220, 200, 0.34)';
    ctx.lineWidth = major ? 1.3 : 0.65;
    ctx.beginPath();
    for (let i = 0; i < segs.length; i++) {
      const s = segs[i];
      ctx.moveTo(s[0] * size, s[1] * size);
      ctx.lineTo(s[2] * size, s[3] * size);
    }
    ctx.stroke();

    // Index contour elevation label at representative midpoint
    if (major && segs.length > 18) {
      const mid = segs[Math.floor(segs.length * 0.35)];
      const lx = (mid[0] + mid[2]) * 0.5 * size;
      const ly = (mid[1] + mid[3]) * 0.5 * size;
      ctx.save();
      ctx.fillStyle = 'rgba(14, 18, 23, 0.82)';
      ctx.fillRect(lx - 11, ly - 5, 22, 10);
      ctx.fillStyle = 'rgba(216, 179, 106, 0.92)';
      ctx.font = 'bold 8px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(level), lx, ly);
      ctx.restore();
    }
  });

  // Active slice highlight on minimap (Chapter 01)
  if (state.showCutPlane) {
    const sMap = extractContourLevels([state.cutElev]);
    const segs = sMap.get(state.cutElev) || [];
    ctx.strokeStyle = '#ffd77a';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    for (let i = 0; i < segs.length; i++) {
      const s = segs[i];
      ctx.moveTo(s[0] * size, s[1] * size);
      ctx.lineTo(s[2] * size, s[3] * size);
    }
    ctx.stroke();
  }

  // Landmark dots
  ctx.fillStyle = 'rgba(232, 220, 200, 0.72)';
  ctx.font = '9px sans-serif';
  LANDMARKS.forEach(lm => {
    if (lm.kind === 'peak' || lm.kind === 'basin' || lm.kind === 'hill') {
      const px = ((lm.x + HALF_KM) / SIZE_KM) * size;
      const py = ((lm.z + HALF_KM) / SIZE_KM) * size;
      ctx.beginPath();
      ctx.arc(px, py, 2.1, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  // Active A-B Profile line
  const prof = minimapDrag && minimapDrag.dragging ? minimapDrag : state.profile;
  if (prof && prof.a && prof.b) {
    const ax = ((prof.a[0] + HALF_KM) / SIZE_KM) * size;
    const ay = ((prof.a[1] + HALF_KM) / SIZE_KM) * size;
    const bx = ((prof.b[0] + HALF_KM) / SIZE_KM) * size;
    const by = ((prof.b[1] + HALF_KM) / SIZE_KM) * size;
    ctx.strokeStyle = '#f09d51';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#5dbb7b';
    ctx.beginPath(); ctx.arc(ax, ay, 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#d8b36a';
    ctx.beginPath(); ctx.arc(bx, by, 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 9px monospace';
    ctx.fillText('A', ax + 5, ay - 4);
    ctx.fillText('B', bx + 5, by - 4);
  }

  // Quiz beacon dot on minimap
  if (state.chapter === 9 && !state.quizFinished && QUIZ_DATA[state.quizIndex]?.beacon) {
    const q = QUIZ_DATA[state.quizIndex].beacon;
    const qx = ((q[0] + HALF_KM) / SIZE_KM) * size;
    const qy = ((q[1] + HALF_KM) / SIZE_KM) * size;
    ctx.strokeStyle = '#ffd670';
    ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.arc(qx, qy, 7, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = '#ffd670';
    ctx.beginPath(); ctx.arc(qx, qy, 2.5, 0, Math.PI * 2); ctx.fill();
  }

  // Camera look target dot
  if (controls) {
    const tx = worldToKm(controls.target.x);
    const tz = worldToKm(controls.target.z);
    if (Math.abs(tx) <= HALF_KM && Math.abs(tz) <= HALF_KM) {
      const cx = ((tx + HALF_KM) / SIZE_KM) * size;
      const cy = ((tz + HALF_KM) / SIZE_KM) * size;
      ctx.strokeStyle = 'rgba(216, 179, 106, 0.55)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, 4.5, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  // Synced hover crosshair
  if (state.hoverKm) {
    const hx = ((state.hoverKm[0] + HALF_KM) / SIZE_KM) * size;
    const hy = ((state.hoverKm[1] + HALF_KM) / SIZE_KM) * size;
    ctx.strokeStyle = 'rgba(255, 224, 140, 0.85)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(hx - 7, hy); ctx.lineTo(hx + 7, hy);
    ctx.moveTo(hx, hy - 7); ctx.lineTo(hx, hy + 7);
    ctx.stroke();
  }
}

function bindMinimapEvents() {
  // Minimap interactions (hover sync, click fly, drag profile)
  const miniCanvas = document.getElementById('minimap-canvas');
  const eventToKm = (evt) => {
    const rect = miniCanvas.getBoundingClientRect();
    const u = Math.max(0, Math.min(1, (evt.clientX - rect.left) / rect.width));
    const v = Math.max(0, Math.min(1, (evt.clientY - rect.top) / rect.height));
    return [u * SIZE_KM - HALF_KM, v * SIZE_KM - HALF_KM];
  };

  miniCanvas.addEventListener('pointerdown', (e) => {
    miniCanvas.setPointerCapture(e.pointerId);
    const km = eventToKm(e);
    minimapDrag = { startPx: [e.clientX, e.clientY], a: km, b: km, dragging: false };
  });
  miniCanvas.addEventListener('pointermove', (e) => {
    const km = eventToKm(e);
    updateHoverReadout(km[0], km[1]);
    if (!minimapDrag) return;
    const distPx = Math.hypot(e.clientX - minimapDrag.startPx[0], e.clientY - minimapDrag.startPx[1]);
    if (distPx > 6) {
      minimapDrag.dragging = true;
      minimapDrag.b = km;
      renderMinimap();
    }
  });
  miniCanvas.addEventListener('pointerup', (e) => {
    if (!minimapDrag) return;
    const km = eventToKm(e);
    if (minimapDrag.dragging) {
      computeAndShowProfile(minimapDrag.a, km);
    } else {
      flyToLandmark(km[0], km[1], 28, 22);
    }
    minimapDrag = null;
    renderMinimap();
  });
  miniCanvas.addEventListener('pointerleave', () => {
    if (!minimapDrag) updateHoverReadout(null);
  });
}
