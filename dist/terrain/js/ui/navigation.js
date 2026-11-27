'use strict';

function buildNavigationUI() {
  const list = document.getElementById('chapter-list');
  const prog = document.getElementById('progress-bar');
  list.innerHTML = '';
  prog.innerHTML = '';

  CHAPTERS.forEach((ch, idx) => {
    const btn = document.createElement('button');
    btn.className = 'chapter-item' + (idx === state.chapter ? ' active' : '');
    btn.dataset.idx = idx;
    btn.innerHTML = `
      <span class="ch-num">${ch.num}</span>
      <span class="ch-meta">
        <span class="ch-title">${state.lang === 'zh' ? ch.zh : ch.en}</span>
        <span class="ch-sub">${state.lang === 'zh' ? ch.en : ch.zh}</span>
      </span>
    `;
    btn.onclick = () => goToChapter(idx);
    list.appendChild(btn);

    const seg = document.createElement('div');
    seg.className = 'prog-seg' + (idx === state.chapter ? ' active' : state.visited.has(idx) ? ' visited' : '');
    seg.title = `${ch.num} ${ch.zh}`;
    seg.onclick = () => goToChapter(idx);
    prog.appendChild(seg);
  });
}

function updateNavHighlights() {
  document.querySelectorAll('.chapter-item').forEach((el, idx) => {
    el.classList.toggle('active', idx === state.chapter);
  });
  document.querySelectorAll('.prog-seg').forEach((el, idx) => {
    el.classList.toggle('active', idx === state.chapter);
    el.classList.toggle('visited', state.visited.has(idx) && idx !== state.chapter);
  });
  document.getElementById('ch-counter').textContent = `${String(state.chapter).padStart(2, '0')}/09`;
  document.getElementById('btn-prev').disabled = state.chapter === 0;
  document.getElementById('btn-next').disabled = state.chapter === CHAPTERS.length - 1;
}

function goToChapter(idx) {
  if (idx < 0 || idx >= CHAPTERS.length) return;
  const wasCutAbove = state.cutAbove;
  state.chapter = idx;
  state.visited.add(idx);
  state.sweeping = false;
  const ch = CHAPTERS[idx];
  // Close profile drawer when leaving chapter 08
  if (state.profile) closeProfileDrawer();
  // Restore landform labels when leaving quiz (chapter 09)
  if (idx !== 9 && !state.toggles.labels) {
    state.toggles.labels = true;
    document.querySelectorAll('#view-toggles .tog-btn').forEach(b => {
      b.classList.toggle('active', state.toggles[b.dataset.key]);
    });
  }
  ch.onEnter();
  if (wasCutAbove && !state.cutAbove) {
    updateSideWallsVertices();
    updateContourLines3D();
    updateWaterElevations();
    updateTreeTransforms();
  }
  flyTo(ch.cam.pos, ch.cam.target, 850);
  updateNavHighlights();
  renderLesson();
  updateQuizBeacon();
  renderMinimap();
}
