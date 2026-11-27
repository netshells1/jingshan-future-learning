'use strict';

function renderLesson() {
  const ch = CHAPTERS[state.chapter];
  const isZh = state.lang === 'zh';
  document.getElementById('lesson-kicker').textContent = `SECTION ${ch.num} · ${ch.en.toUpperCase()}`;
  document.getElementById('lesson-title').textContent = isZh ? ch.zh : ch.en;

  const overlayKicker = document.getElementById('overlay-kicker');
  const overlayTitle = document.getElementById('overlay-title');
  const overlaySub = document.getElementById('overlay-sub');
  overlayKicker.textContent = `CHAPTER ${ch.num} · SCALE 1:50,000`;
  overlayTitle.textContent = isZh ? ch.zh : ch.en;
  overlaySub.textContent = isZh
    ? `${ch.en} · 8 km × 8 km 合成山地教学模型`
    : `${ch.zh} · 8 km × 8 km Synthetic Terrain Block`;

  const body = document.getElementById('lesson-body');

  if (state.chapter === 0) {
    body.innerHTML = isZh ? `
      <p>欢迎进入 <b>CONTOUR·3D 等高线地形三维教学实验室</b>。眼前是一块按 <b>1:50,000</b> 比例尺构建的 <b>8 km × 8 km</b> 合成山地模型，下方同步悬浮着它的二维等高线投影底图。</p>
      <p>模型完整包含七种典型基本地貌：北部东西向山脉上的<b>主峰（1432m）</b>、<b>中峰（1057m）</b>与<b>东峰（1268m）</b>，其间夹有两个<b>鞍部（747m / 798m）</b>；东峰东南侧发育有约 <b>424m</b> 落差的<b>陡崖</b>；两条河流自鞍部南侧<b>山谷</b>发源并汇流注入西南<b>盆地湖泊（最低35m）</b>；东南部矗立着一座<b>孤丘（448m）</b>。</p>
      <div class="kpi-grid">
        <div class="kpi-card"><div class="kpi-label">区域范围</div><div class="kpi-val">8 × 8 km</div><div class="kpi-sub">比例尺 1:50,000</div></div>
        <div class="kpi-card"><div class="kpi-label">海拔跨度</div><div class="kpi-val">35–1432 m</div><div class="kpi-sub">相对高差 1397 m</div></div>
      </div>
      <div class="lesson-actions">
        <button class="action-btn ${state.toggles.autoRotate ? 'active' : ''}" id="act-orbit">环绕观察</button>
        <button class="action-btn primary" id="act-start">进入第一节 →</button>
      </div>
    ` : `
      <p>Welcome to <b>CONTOUR·3D</b>, a <b>1:50,000</b> synthetic <b>8 km × 8 km</b> terrain model paired with a floating 2D contour projection base below.</p>
      <p>It integrates seven classic landforms: three northern peaks (<b>1432m, 1057m, 1268m</b>), two saddles (<b>747m, 798m</b>), a <b>424m</b> SE fault cliff, twin south-flowing valleys merging into a SW basin lake (<b>35m</b> min), and a southern isolated hill (<b>448m</b>).</p>
      <div class="lesson-actions">
        <button class="action-btn ${state.toggles.autoRotate ? 'active' : ''}" id="act-orbit">Orbit View</button>
        <button class="action-btn primary" id="act-start">Start Chapter 01 →</button>
      </div>
    `;
    body.querySelector('#act-orbit').onclick = () => toggleSetting('autoRotate');
    body.querySelector('#act-start').onclick = () => goToChapter(1);
  }

  else if (state.chapter === 1) {
    body.innerHTML = `
      <p>${isZh
        ? '<b>等高线</b>是把地面海拔高度相同的相邻各点连接而成的闭合曲线。想像用一个水平面（<b>等高面</b>）横切山体，交线垂直投影到平面上就得到等高线。'
        : 'A <b>contour line</b> connects points of equal elevation formed where a horizontal cutting plane intersects terrain and projects vertically onto a flat map.'}</p>
      <div class="lesson-slider-box">
        <div class="slider-head">
          <span>${isZh ? '等高面海拔' : 'Cutting Plane Elevation'}</span>
          <span class="slider-val" id="cut-elev-lbl">${state.cutElev} m</span>
        </div>
        <input id="slider-cut" type="range" min="0" max="950" step="10" value="${state.cutElev}" />
      </div>
      <div class="lesson-actions">
        <button class="action-btn ${state.sweeping ? 'active' : 'primary'}" id="act-sweep">${isZh ? (state.sweeping ? '暂停扫描' : '扫描切面') : 'Sweep Plane'}</button>
        <button class="action-btn ${state.projectRays ? 'active' : ''}" id="act-proj">${isZh ? '投影到平面' : 'Project Rays'}</button>
        <button class="action-btn ${state.toggles.terrace ? 'active' : ''}" id="act-terrace">${isZh ? '阶梯模型' : 'Terrace Model'}</button>
        <button class="action-btn ${state.cutAbove ? 'active' : ''}" id="act-cut-above">${isZh ? '切除上方' : 'Slice Top'}</button>
      </div>
      <ul class="prop-list">
        <li><b>${isZh ? '1. 同线等高：' : '1. Equal Elevation:'}</b> ${isZh ? '同一条等高线上各点海拔均相等。' : 'Every point along one contour shares the same elevation.'}</li>
        <li><b>${isZh ? '2. 等高距一致：' : '2. Uniform Interval:'}</b> ${isZh ? '同一幅图中相邻两条等高线高差（d）相同。' : 'Adjacent contour lines keep a constant vertical spacing d.'}</li>
        <li><b>${isZh ? '3. 闭合曲线：' : '3. Closed Loops:'}</b> ${isZh ? '所有等高线理论上均为闭合曲线（图边未闭是受图幅所限）。' : 'All contour lines form closed loops (clipped only at map borders).'}</li>
        <li><b>${isZh ? '4. 一般不相交：' : '4. Non-intersecting:'}</b> ${isZh ? '正常山坡等高线永不相交，仅在陡崖处重合或重叠。' : 'Contours never cross except overlapping at vertical cliffs.'}</li>
      </ul>
    `;
    const cutSlider = body.querySelector('#slider-cut');
    cutSlider.oninput = (e) => {
      state.sweeping = false;
      state.cutElev = Number(e.target.value);
      body.querySelector('#cut-elev-lbl').textContent = `${state.cutElev} m`;
      updateSliceVisuals();
      if (state.cutAbove) { updateSideWallsVertices(); updateContourLines3D(); updateWaterElevations(); updateTreeTransforms(); }
      renderMinimap();
    };
    body.querySelector('#act-sweep').onclick = () => {
      state.sweeping = !state.sweeping;
      renderLesson();
    };
    body.querySelector('#act-proj').onclick = () => {
      state.projectRays = !state.projectRays;
      if (state.projectRays && !state.toggles.projBase) toggleSetting('projBase');
      updateSliceVisuals();
      renderLesson();
    };
    body.querySelector('#act-terrace').onclick = () => {
      toggleSetting('terrace');
      renderLesson();
    };
    body.querySelector('#act-cut-above').onclick = () => {
      state.cutAbove = !state.cutAbove;
      updateSliceVisuals();
      updateSideWallsVertices();
      updateContourLines3D();
      updateWaterElevations();
      updateTreeTransforms();
      renderLesson();
    };
  }

  else if (state.chapter === 2) {
    body.innerHTML = `
      <p>${isZh
        ? '<b>海拔（绝对高度）</b>是某地点高出海平面的垂直距离；<b>相对高度</b>则是两个地点之间的海拔高差。'
        : '<b>Absolute Elevation</b> is height above mean sea level (0 m). <b>Relative Height</b> is the elevation difference between two points.'}</p>
      <div class="formula-card">
        <div class="formula-expr">${isZh ? '相对高度 = 海拔高 − 海拔低' : 'Relative Height = Elev(high) − Elev(low)'}</div>
        <div class="formula-note">${isZh ? '例：主峰（1432m）相对西南盆底（35m）高出 1397m；相对中峰（1057m）高出 375m。' : 'Example: Main Peak (1432m) − Basin Floor (35m) = 1397 m relief.'}</div>
      </div>
      <div class="kpi-grid">
        <div class="kpi-card"><div class="kpi-label">${isZh ? '主峰海拔' : 'Main Peak'}</div><div class="kpi-val">1432 m</div><div class="kpi-sub">${isZh ? '全区最高点' : 'Highest Summit'}</div></div>
        <div class="kpi-card"><div class="kpi-label">${isZh ? '东峰海拔' : 'East Peak'}</div><div class="kpi-val">1268 m</div><div class="kpi-sub">${isZh ? '与主峰差 164 m' : 'Diff 164 m'}</div></div>
        <div class="kpi-card"><div class="kpi-label">${isZh ? '中峰 / 孤丘' : 'Mid / Hill'}</div><div class="kpi-val">1057 / 448 m</div><div class="kpi-sub">${isZh ? '相对高差 609 m' : 'Diff 609 m'}</div></div>
        <div class="kpi-card"><div class="kpi-label">${isZh ? '盆底最低' : 'Basin Min'}</div><div class="kpi-val">35 m</div><div class="kpi-sub">${isZh ? '湖面海拔 92 m' : 'Lake Level 92 m'}</div></div>
      </div>
      <div class="lesson-actions">
        <button class="action-btn ${state.showSeaLevel ? 'active' : 'primary'}" id="act-sea">${isZh ? '显示海平面 (0 m)' : 'Toggle Sea Level (0 m)'}</button>
        <button class="action-btn" id="act-fly-main">${isZh ? '看主峰' : 'Main Peak'}</button>
        <button class="action-btn" id="act-fly-basin">${isZh ? '看盆地' : 'Basin'}</button>
      </div>
    `;
    body.querySelector('#act-sea').onclick = () => {
      state.showSeaLevel = !state.showSeaLevel;
      seaLevelMesh.visible = state.showSeaLevel;
      renderLesson();
    };
    body.querySelector('#act-fly-main').onclick = () => flyToLandmark(-2.25, -1.65, 28, 22);
    body.querySelector('#act-fly-basin').onclick = () => flyToLandmark(-1.75, 2.05, 30, 22);
  }

  else if (state.chapter === 3) {
    body.innerHTML = `
      <div class="mnemonic-box">
        <div class="mnemonic-text">${isZh ? '密陡 · 疏缓' : 'Dense = Steep · Sparse = Gentle'}</div>
        <div class="mnemonic-sub">${isZh ? '等高距相同时，等高线越密集坡度越陡，越稀疏坡度越缓' : 'With uniform interval, closer lines mean steeper slopes'}</div>
      </div>
      <p>${isZh
        ? '本节已为您开启<b>坡度着色</b>（蓝绿为缓坡，橙红为陡坡）。尝试切换右侧的<b>等高距（50m / 100m / 200m）</b>，体会等高线疏密随等高距变化的视觉规律——注意山体实际坡度本身并未改变！'
        : '<b>Slope heatmap</b> is active (cool teal = flat, orange/crimson = steep). Switch intervals (50m/100m/200m) to see contour spacing change while true terrain slope remains unchanged.'}</p>
      <div class="lesson-actions">
        <button class="action-btn ${state.surfaceMode === 'slope' ? 'active' : ''}" id="act-slope">${isZh ? '坡度着色' : 'Slope Coloring'}</button>
        <button class="action-btn primary" id="act-steep">${isZh ? '看最陡处' : 'Steepest Face'}</button>
        <button class="action-btn" id="act-gentle">${isZh ? '看缓坡' : 'Gentle Slope'}</button>
      </div>
    `;
    body.querySelector('#act-slope').onclick = () => {
      setSurfaceMode(state.surfaceMode === 'slope' ? 'realistic' : 'slope');
      renderLesson();
    };
    body.querySelector('#act-steep').onclick = () => flyToLandmark(2.52, -0.56, 22, 16);
    body.querySelector('#act-gentle').onclick = () => flyToLandmark(0.45, 2.65, 30, 20);
  }

  else if (state.chapter === 4) {
    body.innerHTML = `
      <p>${isZh
        ? '山顶与盆地在二维图上都表现为<b>一组闭合的同心等高线</b>，区别关键在于数值的递增方向：'
        : 'Both Summits and Basins form <b>concentric closed contour rings</b>; they differ by elevation direction:'}</p>
      <div class="svg-diagram-row">
        <div class="svg-card">
          <svg width="72" height="72" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="32" fill="none" stroke="#8a8d94" stroke-width="1.3"/>
            <circle cx="40" cy="40" r="22" fill="none" stroke="#d8b36a" stroke-width="1.5"/>
            <circle cx="40" cy="40" r="11" fill="none" stroke="#e8dcc8" stroke-width="1.6"/>
            <polygon points="40,36 37,43 43,43" fill="#d8b36a"/>
            <text x="40" y="13" text-anchor="middle" font-size="8" fill="#8a8d94">200</text>
            <text x="40" y="25" text-anchor="middle" font-size="8" fill="#d8b36a">400</text>
          </svg>
          <div class="svg-card-cap">${isZh ? '内高外低 → 山顶' : 'High Center → Peak'}</div>
        </div>
        <div class="svg-card">
          <svg width="72" height="72" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="32" fill="none" stroke="#e8dcc8" stroke-width="1.6"/>
            <circle cx="40" cy="40" r="22" fill="none" stroke="#d8b36a" stroke-width="1.5"/>
            <circle cx="40" cy="40" r="11" fill="rgba(58,150,209,0.4)" stroke="#3a96d1" stroke-width="1.5"/>
            <text x="40" y="13" text-anchor="middle" font-size="8" fill="#e8dcc8">400</text>
            <text x="40" y="25" text-anchor="middle" font-size="8" fill="#d8b36a">200</text>
          </svg>
          <div class="svg-card-cap">${isZh ? '内低外高 → 盆地' : 'Low Center → Basin'}</div>
        </div>
      </div>
      <div class="lesson-actions">
        <button class="action-btn" id="act-p-main">${isZh ? '看主峰' : 'Main Peak'}</button>
        <button class="action-btn" id="act-p-east">${isZh ? '看东峰' : 'East Peak'}</button>
        <button class="action-btn" id="act-p-hill">${isZh ? '看孤丘' : 'Isolated Hill'}</button>
        <button class="action-btn primary" id="act-p-basin">${isZh ? '看盆地' : 'Basin'}</button>
        <button class="action-btn" id="act-basin-prof">${isZh ? '盆地剖面' : 'Basin Profile'}</button>
      </div>
    `;
    body.querySelector('#act-p-main').onclick = () => flyToLandmark(-2.25, -1.65, 26, 20);
    body.querySelector('#act-p-east').onclick = () => flyToLandmark(2.25, -1.55, 26, 20);
    body.querySelector('#act-p-hill').onclick = () => flyToLandmark(1.80, 2.05, 22, 16);
    body.querySelector('#act-p-basin').onclick = () => flyToLandmark(-1.75, 2.05, 30, 22);
    body.querySelector('#act-basin-prof').onclick = () => {
      const p = PRESET_PROFILES.across_basin;
      computeAndShowProfile(p.a, p.b, isZh ? p.zh : p.en);
    };
  }

  else if (state.chapter === 5) {
    body.innerHTML = `
      <div class="mnemonic-box">
        <div class="mnemonic-text">${isZh ? '凸低为脊 · 凸高为谷' : 'Bulge Low = Ridge · Bulge High = Valley'}</div>
        <div class="mnemonic-sub">${isZh ? '山脊为分水岭（高处向低处突出）；山谷为集水线（易发育河流）' : 'Ridges divide water; valleys gather streams'}</div>
      </div>
      <p>${isZh
        ? '仔细对比中峰南侧的金色<b>山脊线</b>与两侧的蓝色<b>河谷</b>：沿山脊线等高线向海拔更低的南方凸出；而河谷处等高线向海拔更高的北方（上游）弯折成“V”形。'
        : 'Compare the gold 3D <b>Ridge Line</b> extending south from Central Peak with the flanking <b>Valleys</b> carrying twin rivers.'}</p>
      <div class="lesson-actions">
        <button class="action-btn primary" id="act-ridge">${isZh ? '看山脊' : 'View Ridge'}</button>
        <button class="action-btn" id="act-valley">${isZh ? '看山谷' : 'View Valley'}</button>
        <button class="action-btn ${state.showRidgeLine ? 'active' : ''}" id="act-ridgeline">${isZh ? '山脊线' : 'Ridge Line'}</button>
        <button class="action-btn" id="act-prof-valleys">${isZh ? '横切脊谷剖面' : 'Ridge-Valley Profile'}</button>
      </div>
    `;
    body.querySelector('#act-ridge').onclick = () => flyToLandmark(0.12, -0.45, 26, 20);
    body.querySelector('#act-valley').onclick = () => flyToLandmark(-0.92, 0.15, 26, 20);
    body.querySelector('#act-ridgeline').onclick = () => {
      state.showRidgeLine = !state.showRidgeLine;
      updateRidgeLineGeometry();
      renderLesson();
    };
    body.querySelector('#act-prof-valleys').onclick = () => {
      const p = PRESET_PROFILES.two_valleys;
      computeAndShowProfile(p.a, p.b, isZh ? p.zh : p.en);
    };
  }

  else if (state.chapter === 6) {
    body.innerHTML = `
      <p>${isZh
        ? '<b>鞍部</b>是指相邻两座山峰之间地势相对较低平、形似马鞍的部位。从山脊方向看它是极低点，而从垂直于山脊的两侧山谷方向看它又是相对高点。'
        : 'A <b>Saddle</b> sits between two peaks: a low pass along the ridge line, yet a high divide above two opposing valleys.'}</p>
      <div class="kpi-grid">
        <div class="kpi-card"><div class="kpi-label">${isZh ? '西鞍部海拔' : 'West Saddle'}</div><div class="kpi-val">747 m</div><div class="kpi-sub">${isZh ? '主峰与中峰之间' : 'Main — Central'}</div></div>
        <div class="kpi-card"><div class="kpi-label">${isZh ? '东鞍部海拔' : 'East Saddle'}</div><div class="kpi-val">798 m</div><div class="kpi-sub">${isZh ? '中峰与东峰之间' : 'Central — East'}</div></div>
      </div>
      <p>${isZh
        ? '注意本区两条河流的源头正位于两个鞍部南侧的集水洼地——工程上鞍部常作为盘山公路或登山步道翻越山岭的垭口。'
        : 'Notice how both rivers originate just south of the two saddles—making saddles natural mountain passes.'}</p>
      <div class="lesson-actions">
        <button class="action-btn primary" id="act-sad-w">${isZh ? '主峰—中峰鞍部' : 'West Saddle'}</button>
        <button class="action-btn" id="act-sad-e">${isZh ? '中峰—东峰鞍部' : 'East Saddle'}</button>
        <button class="action-btn" id="act-sad-prof">${isZh ? '鞍部剖面' : 'Saddle Profile'}</button>
      </div>
    `;
    body.querySelector('#act-sad-w').onclick = () => flyToLandmark(-1.05, -1.72, 24, 18);
    body.querySelector('#act-sad-e').onclick = () => flyToLandmark(1.20, -1.68, 24, 18);
    body.querySelector('#act-sad-prof').onclick = () => {
      const p = PRESET_PROFILES.saddle_west;
      computeAndShowProfile(p.a, p.b, isZh ? p.zh : p.en);
    };
  }

  else if (state.chapter === 7) {
    const d = state.interval;
    // Exact converged contours across cliff (~915m crest down to ~491m floor)
    const nCount = d === 50 ? 8 : d === 100 ? 4 : 2;
    const minBound = (nCount - 1) * d;
    const maxBound = (nCount + 1) * d;
    body.innerHTML = `
      <p>${isZh
        ? '<b>陡崖</b>是坡度近乎垂直的断崖地貌。在等高线地图上表现为<b>多条等高线高度密集甚至重合并列</b>。东峰东南侧发育有一处落差约 <b>424 m</b> 的构造断层崖。'
        : 'A <b>Cliff</b> occurs where multiple contours crowd or merge together. Southeast of East Peak lies a fault scarp with ~<b>424 m</b> vertical drop.'}</p>
      <div class="formula-card">
        <div class="formula-expr">(n − 1)·d ≤ ΔH &lt; (n + 1)·d</div>
        <div class="formula-note">
          ${isZh
            ? `当前等高距 <b>d = ${d} m</b>，崖面重合/穿过 <b>n = ${nCount}</b> 条等高线：<br/>(${nCount}-1)×${d} = <b>${minBound} m</b> ≤ ΔH &lt; (${nCount}+1)×${d} = <b>${maxBound} m</b><br/>（实测悬崖落差约 <b>424 m</b>，严格落入估算区间！）`
            : `At <b>d = ${d} m</b>, <b>n = ${nCount}</b> contours converge:<br/><b>${minBound} m</b> ≤ ΔH &lt; <b>${maxBound} m</b> (Actual drop ≈ <b>424 m</b>)`}
        </div>
      </div>
      <div class="lesson-actions">
        <button class="action-btn primary" id="act-cliff">${isZh ? '看陡崖' : 'Inspect Cliff'}</button>
        <button class="action-btn" id="act-cliff-prof">${isZh ? '穿过断层崖' : 'Cliff Cross-Section'}</button>
      </div>
    `;
    body.querySelector('#act-cliff').onclick = () => flyToLandmark(2.52, -0.56, 22, 16);
    body.querySelector('#act-cliff-prof').onclick = () => {
      const p = PRESET_PROFILES.across_cliff;
      computeAndShowProfile(p.a, p.b, isZh ? p.zh : p.en);
    };
  }

  else if (state.chapter === 8) {
    body.innerHTML = `
      <p>${isZh
        ? '<b>地形剖面图</b>沿某条直线剖切地形，直观展示沿线地势起伏，并可用于判断两点间是否<b>通视</b>（视线是否被中间山脊或山峰遮挡）。'
        : 'A <b>Topographic Profile</b> slices elevation along A–B and tests <b>Intervisibility</b> (whether terrain blocks line-of-sight).'}</p>
      <p>${isZh
        ? '请直接在左下角<b>二维地图上拖拽</b>绘制任意 A—B 剖面，或点击下方 5 条经典教学预设剖面：'
        : 'Drag directly across the <b>2D Minimap</b> to draw any custom transect, or select one of the 5 presets:'}</p>
      <div class="lesson-actions">
        <button class="action-btn" data-preset="across_range">${isZh ? '穿越山脉' : 'Across Range'}</button>
        <button class="action-btn primary" data-preset="two_valleys">${isZh ? '横切两条河谷' : 'Two Valleys'}</button>
        <button class="action-btn" data-preset="along_ridge">${isZh ? '纵贯山脊' : 'Along Ridge'}</button>
        <button class="action-btn" data-preset="across_basin">${isZh ? '穿过盆地' : 'Across Basin'}</button>
        <button class="action-btn" data-preset="across_cliff">${isZh ? '穿过断层崖' : 'Across Cliff'}</button>
      </div>
      <div class="formula-card">
        <div class="formula-expr">${isZh ? '通视判别提示' : 'Intervisibility Tip'}</div>
        <div class="formula-note">${isZh ? '若连接 A、B 的直线完全位于地形剖面线之上（绿色虚线），则两点通视；若凸坡或山脊穿过视线（红色遮挡点），则不通视。' : 'Unobstructed green dashed line = visible; red marker = ridge/hill blocks sight.'}</div>
      </div>
    `;
    body.querySelectorAll('[data-preset]').forEach(btn => {
      btn.onclick = () => {
        const p = PRESET_PROFILES[btn.dataset.preset];
        computeAndShowProfile(p.a, p.b, isZh ? p.zh : p.en);
      };
    });
  }

  else if (state.chapter === 9) {
    if (state.quizFinished) {
      const score = state.quizAnswers.reduce((acc, ans, idx) => acc + (ans === QUIZ_DATA[idx].correct ? 1 : 0), 0);
      const pct = Math.round((score / QUIZ_DATA.length) * 100);
      body.innerHTML = `
        <div class="quiz-summary">
          <div style="font-size:12px; color:var(--text-secondary);">${isZh ? '随堂检测完成' : 'Quiz Complete'}</div>
          <div class="quiz-score-big">${score} / ${QUIZ_DATA.length}</div>
          <div style="color:var(--text-primary); margin-bottom:12px;">${isZh ? `正确率 ${pct}% · ${score >= 7 ? '等高线判读大师！' : score >= 5 ? '表现良好，继续巩固！' : '建议回看前几节重点复习'}` : `Accuracy ${pct}%`}</div>
          <button class="action-btn primary" id="act-quiz-restart">${isZh ? '重新作答' : 'Restart Quiz'}</button>
        </div>
      `;
      body.querySelector('#act-quiz-restart').onclick = () => {
        state.quizIndex = 0;
        state.quizAnswers = Array(QUIZ_DATA.length).fill(null);
        state.quizFinished = false;
        updateQuizBeacon();
        const c = QUIZ_DATA[0].cam;
        flyTo(c.pos, c.target, 750);
        renderLesson();
      };
      return;
    }

    const q = QUIZ_DATA[state.quizIndex];
    const chosen = state.quizAnswers[state.quizIndex];
    const answered = chosen !== null;
    const opts = isZh ? q.optsZh : q.optsEn;
    const keys = ['A', 'B', 'C', 'D'];

    body.innerHTML = `
      <div class="quiz-progress">
        <span>${isZh ? `第 ${state.quizIndex + 1} / ${QUIZ_DATA.length} 题` : `Question ${state.quizIndex + 1} / ${QUIZ_DATA.length}`}</span>
        <span>${isZh ? '已得分' : 'Score'}: ${state.quizAnswers.filter((a, i) => a === QUIZ_DATA[i].correct).length}</span>
      </div>
      <div class="quiz-question">${isZh ? q.qZh : q.qEn}</div>
      <div class="quiz-options">
        ${opts.map((opt, idx) => {
          let cls = 'quiz-opt';
          if (answered) {
            if (idx === q.correct) cls += ' correct';
            else if (idx === chosen) cls += ' wrong';
          }
          return `<button class="${cls}" data-idx="${idx}" ${answered ? 'disabled' : ''}>
            <span class="quiz-opt-key">${keys[idx]}</span>
            <span>${opt}</span>
          </button>`;
        }).join('')}
      </div>
      ${answered ? `
        <div class="quiz-feedback ${chosen === q.correct ? 'ok' : 'no'}">
          <b>${chosen === q.correct ? (isZh ? '✓ 回答正确！' : '✓ Correct!') : (isZh ? '✕ 回答有误' : '✕ Incorrect')}</b><br/>
          ${isZh ? q.expZh : q.expEn}
        </div>
        <div class="lesson-actions">
          <button class="action-btn primary" id="act-quiz-next">
            ${state.quizIndex < QUIZ_DATA.length - 1 ? (isZh ? '下一题 →' : 'Next Question →') : (isZh ? '查看总成绩' : 'View Final Score')}
          </button>
        </div>
      ` : `<div class="lesson-actions"><button class="action-btn" id="act-quiz-focus">${isZh ? '定位金色信标' : 'Focus Beacon'}</button></div>`}
    `;

    body.querySelectorAll('.quiz-opt').forEach(btn => {
      btn.onclick = () => {
        state.quizAnswers[state.quizIndex] = Number(btn.dataset.idx);
        renderLesson();
      };
    });
    const nextBtn = body.querySelector('#act-quiz-next');
    if (nextBtn) {
      nextBtn.onclick = () => {
        if (state.quizIndex < QUIZ_DATA.length - 1) {
          state.quizIndex++;
          updateQuizBeacon();
          flyTo(QUIZ_DATA[state.quizIndex].cam.pos, QUIZ_DATA[state.quizIndex].cam.target, 750);
        } else {
          state.quizFinished = true;
          updateQuizBeacon();
        }
        renderLesson();
        renderMinimap();
      };
    }
    const focusBtn = body.querySelector('#act-quiz-focus');
    if (focusBtn) {
      focusBtn.onclick = () => flyTo(q.cam.pos, q.cam.target, 700);
    }
  }
}
