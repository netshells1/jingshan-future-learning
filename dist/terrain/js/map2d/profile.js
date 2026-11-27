'use strict';

function computeAndShowProfile(aKm, bKm, customTitle) {
  const dx = bKm[0] - aKm[0];
  const dz = bKm[1] - aKm[1];
  const distKm = Math.hypot(dx, dz);
  if (distKm < 0.12) return;

  const N = 160;
  const samples = [];
  let minH = Infinity, maxH = -Infinity;
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const x = aKm[0] + dx * t;
    const z = aKm[1] + dz * t;
    const h = sampleHeightKm(x, z);
    const inBasinLake = x < 0 && z > 0.6 && h < LAKE_ELEV;
    samples.push({ t, d: t * distKm, h, inLake: inBasinLake });
    if (h < minH) minH = h;
    if (h > maxH) maxH = h;
  }

  // Contour intersection dots along profile
  const crossings = [];
  const interval = state.interval;
  for (let i = 0; i < N; i++) {
    const p0 = samples[i];
    const p1 = samples[i + 1];
    const lo = Math.min(p0.h, p1.h);
    const hi = Math.max(p0.h, p1.h);
    const startLvl = Math.ceil(lo / interval) * interval;
    for (let lvl = startLvl; lvl <= hi; lvl += interval) {
      if (Math.abs(p1.h - p0.h) < 1e-4) continue;
      const frac = (lvl - p0.h) / (p1.h - p0.h);
      if (frac >= 0 && frac <= 1) {
        crossings.push({ d: p0.d + (p1.d - p0.d) * frac, h: lvl, t: p0.t + (p1.t - p0.t) * frac });
      }
    }
  }

  // Intervisibility / Line of Sight (observer +2m at A to target +2m at B)
  const hA = samples[0].h + 2.0;
  const hB = samples[N].h + 2.0;
  let clear = true;
  let blockSample = null;
  let maxExceed = 0;
  for (let i = 2; i < N - 1; i++) {
    const s = samples[i];
    const losH = hA + (hB - hA) * s.t;
    if (s.h > losH) {
      clear = false;
      if (s.h - losH > maxExceed) {
        maxExceed = s.h - losH;
        blockSample = { d: s.d, h: s.h, losH, t: s.t };
      }
    }
  }

  state.profile = {
    a: [...aKm],
    b: [...bKm],
    title: customTitle || (state.lang === 'zh' ? '自定义地形剖面 A — B' : 'Custom Profile A — B'),
    distKm,
    minH,
    maxH,
    samples,
    crossings,
    los: { clear, hA, hB, blockSample }
  };

  const drawer = document.getElementById('profile-drawer');
  drawer.classList.add('open');
  document.getElementById('profile-title').textContent = state.profile.title;
  document.getElementById('profile-stats').innerHTML = `
    <span>${state.lang === 'zh' ? '距离' : 'Dist'} <b>${distKm.toFixed(2)} km</b></span>
    <span>${state.lang === 'zh' ? '最高' : 'Max'} <b>${Math.round(maxH)} m</b></span>
    <span>${state.lang === 'zh' ? '最低' : 'Min'} <b>${Math.round(minH)} m</b></span>
    <span>ΔH <b>${Math.round(maxH - minH)} m</b></span>
  `;
  const badge = document.getElementById('los-badge');
  badge.className = 'los-badge ' + (clear ? 'clear' : 'blocked');
  badge.textContent = clear
    ? (state.lang === 'zh' ? '通视良好 ✓' : 'Clear LOS ✓')
    : (state.lang === 'zh' ? '视线受阻 ✕' : 'Blocked LOS ✕');

  updateTransectVisual();
  renderMinimap();
  renderProfileChart();
}

function renderProfileChart() {
  if (!state.profile) return;
  const canvas = document.getElementById('profile-canvas');
  const wrap = canvas.parentElement;
  const w = wrap.clientWidth - 16;
  const h = wrap.clientHeight - 10;
  if (w <= 40 || h <= 40) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);

  const padL = 44, padR = 18, padT = 14, padB = 24;
  const cw = w - padL - padR;
  const ch = h - padT - padB;
  const { distKm, samples, crossings, los, minH, maxH } = state.profile;
  const yMin = Math.max(0, Math.floor((minH - 60) / 100) * 100);
  const yMax = Math.ceil((maxH + 80) / 100) * 100;

  const toX = (d) => padL + (d / distKm) * cw;
  const toY = (elev) => padT + ch - ((elev - yMin) / Math.max(100, yMax - yMin)) * ch;

  // Horizontal grid lines & Y axis labels
  ctx.font = '10px monospace';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  const yStep = (yMax - yMin) > 800 ? 300 : 200;
  for (let elev = Math.ceil(yMin / yStep) * yStep; elev <= yMax; elev += yStep) {
    const py = toY(elev);
    ctx.strokeStyle = 'rgba(232, 220, 200, 0.09)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(padL, py); ctx.lineTo(w - padR, py); ctx.stroke();
    ctx.fillStyle = '#8a8d94';
    ctx.fillText(`${elev}m`, padL - 6, py);
  }

  // Water fill if crossing SW lake
  const hasLake = samples.some(s => s.inLake);
  if (hasLake && state.toggles.water) {
    const yLake = toY(LAKE_ELEV);
    ctx.fillStyle = 'rgba(58, 150, 209, 0.35)';
    samples.forEach((s, i) => {
      if (s.inLake && i < samples.length - 1) {
        const x0 = toX(s.d);
        const x1 = toX(samples[i + 1].d);
        const yBot = toY(s.h);
        if (yBot > yLake) ctx.fillRect(x0, yLake, x1 - x0 + 1, yBot - yLake);
      }
    });
  }

  // Terrain filled silhouette
  const grad = ctx.createLinearGradient(0, padT, 0, padT + ch);
  grad.addColorStop(0, 'rgba(216, 179, 106, 0.44)');
  grad.addColorStop(1, 'rgba(40, 44, 52, 0.35)');
  ctx.beginPath();
  ctx.moveTo(toX(0), padT + ch);
  samples.forEach(s => ctx.lineTo(toX(s.d), toY(s.h)));
  ctx.lineTo(toX(distKm), padT + ch);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Terrain curve stroke
  ctx.strokeStyle = '#e8dcc8';
  ctx.lineWidth = 2;
  ctx.beginPath();
  samples.forEach((s, i) => {
    const px = toX(s.d), py = toY(s.h);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  });
  ctx.stroke();

  // Gold dots at contour intersections
  ctx.fillStyle = '#d8b36a';
  crossings.forEach(c => {
    ctx.beginPath();
    ctx.arc(toX(c.d), toY(c.h), 2.8, 0, Math.PI * 2);
    ctx.fill();
  });

  // Intervisibility Line of Sight
  if (state.showLOS && los) {
    ctx.save();
    ctx.strokeStyle = los.clear ? '#5dbb7b' : '#e06154';
    ctx.lineWidth = 1.6;
    ctx.setLineDash([5, 4]);
    ctx.beginPath();
    ctx.moveTo(toX(0), toY(los.hA));
    ctx.lineTo(toX(distKm), toY(los.hB));
    ctx.stroke();
    ctx.restore();

    if (!los.clear && los.blockSample) {
      const bx = toX(los.blockSample.d);
      const by = toY(los.blockSample.losH);
      ctx.fillStyle = '#e06154';
      ctx.beginPath(); ctx.arc(bx, by, 4.5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#ffd3ce';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(state.lang === 'zh' ? '遮挡点' : 'Blocked', bx, by - 10);
    }
  }

  // Distance axis labels
  ctx.fillStyle = '#8a8d94';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.font = '10px monospace';
  const dTicks = 4;
  for (let k = 0; k <= dTicks; k++) {
    const d = (k / dTicks) * distKm;
    ctx.fillText(`${d.toFixed(1)}km`, toX(d), padT + ch + 6);
  }
  // A & B labels
  ctx.fillStyle = '#5dbb7b'; ctx.textAlign = 'left'; ctx.fillText('A', padL + 2, padT);
  ctx.fillStyle = '#d8b36a'; ctx.textAlign = 'right'; ctx.fillText('B', w - padR - 2, padT);

  // Interactive Hover Crosshair on Profile Chart
  if (state.profileHoverT !== null) {
    const idxF = Math.max(0, Math.min(samples.length - 1, state.profileHoverT * (samples.length - 1)));
    const i0 = Math.floor(idxF);
    const i1 = Math.min(samples.length - 1, i0 + 1);
    const frac = idxF - i0;
    const curD = samples[i0].d * (1 - frac) + samples[i1].d * frac;
    const curH = samples[i0].h * (1 - frac) + samples[i1].h * frac;
    const px = toX(curD);
    const py = toY(curH);

    ctx.strokeStyle = 'rgba(255, 224, 140, 0.6)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(px, padT); ctx.lineTo(px, padT + ch); ctx.stroke();

    ctx.fillStyle = '#ffd77a';
    ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();

    const lbl = `${curD.toFixed(2)}km · ${Math.round(curH)}m`;
    const tx = Math.min(w - padR - 50, Math.max(padL + 50, px));
    ctx.fillStyle = 'rgba(18, 21, 26, 0.9)';
    ctx.fillRect(tx - 46, padT + 2, 92, 16);
    ctx.fillStyle = '#ffd77a';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(lbl, tx, padT + 10);
  }
}

function closeProfileDrawer() {
  state.profile = null;
  document.getElementById('profile-drawer').classList.remove('open');
  updateTransectVisual();
  renderMinimap();
}

function bindProfileEvents() {
  // Profile drawer controls & hover sync
  document.getElementById('btn-profile-clear').onclick = closeProfileDrawer;
  document.getElementById('btn-los-toggle').onclick = (e) => {
    state.showLOS = !state.showLOS;
    e.currentTarget.classList.toggle('active', state.showLOS);
    updateTransectVisual();
    renderProfileChart();
  };
  const profCanvas = document.getElementById('profile-canvas');
  profCanvas.addEventListener('pointermove', (e) => {
    if (!state.profile) return;
    const rect = profCanvas.getBoundingClientRect();
    const padL = 44, padR = 18;
    const cw = rect.width - padL - padR;
    if (cw <= 10) return;
    const t = Math.max(0, Math.min(1, (e.clientX - rect.left - padL) / cw));
    state.profileHoverT = t;
    const { a, b } = state.profile;
    updateHoverReadout(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t);
    renderProfileChart();
  });
  profCanvas.addEventListener('pointerleave', () => {
    state.profileHoverT = null;
    updateHoverReadout(null);
    renderProfileChart();
  });
}
