'use strict';

function applyI18n() {
  const dict = I18N[state.lang];
  document.getElementById('brand-title-cn').textContent = dict.brandCn;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.dataset.i18n;
    if (dict[k]) el.textContent = dict[k];
  });
  const enlBtn = document.getElementById('btn-minimap-enlarge');
  enlBtn.textContent = state.minimapEnlarged ? dict.shrink : dict.enlarge;
  buildNavigationUI();
  updateNavHighlights();
  updateLabelTexts();
  renderLesson();
  if (state.profile) renderProfileChart();
}
