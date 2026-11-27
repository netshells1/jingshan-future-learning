'use strict';

const heightGrid = new Float32Array(GRID * GRID);
const slopeGrid = new Float32Array(GRID * GRID);
let riverPolylines = {}; // dense smooth points in km

// Raw base procedural elevation before landmark calibration
function evalBaseHeight(x, z) {
  // 1. Broad regional base slope (gentle foothills higher in N, sloping south toward lowlands)
  let h = 235.0 - z * 18.0 + Math.sin(x * 0.55) * 12.0;

  // 2. Main Northern E-W Ridge Spine linking the three peaks & two saddles (narrow N-S so saddles drop sharply N & S)
  h += rotGauss(x, z,  0.00, -1.68, 2.85, 0.44, -2, 535.0);
  h += rotGauss(x, z, -1.05, -1.72, 0.72, 0.36,  2,  95.0);
  h += rotGauss(x, z,  1.20, -1.68, 0.70, 0.34, -2, 115.0);
  // Subtle saddle flank dips N & S so both saddles are textbook saddles (lower than W/E, higher than N/S)
  h -= rotGauss(x, z,  1.20, -2.28, 0.48, 0.32,  0, 145.0);
  h -= rotGauss(x, z, -1.05, -2.30, 0.48, 0.32,  0, 120.0);

  // 3. Three Northern Peaks
  // 主峰 (-2.25, -1.65) -> 1432m
  h += rotGauss(x, z, -2.25, -1.65, 0.66, 0.58, 18, 690.0);
  h += rotGauss(x, z, -2.25, -1.65, 0.32, 0.30, 10, 140.0);
  // NW & SW spurs from 主峰
  h += rotGauss(x, z, -2.85, -0.75, 0.50, 0.92, -26, 260.0);
  h += rotGauss(x, z, -2.65, -2.55, 0.52, 0.60, 20, 175.0);

  // 中峰 (+0.15, -1.80) -> 1057m
  h += rotGauss(x, z, 0.15, -1.80, 0.55, 0.50, -5, 390.0);
  // Prominent Central South Spur Ridge (山脊, 凸低为脊) between the two valleys!
  h += rotGauss(x, z, 0.13, -0.55, 0.36, 1.15, 3, 310.0);
  h += rotGauss(x, z, 0.10,  0.30, 0.32, 0.65, 6, 155.0);

  // 东峰 (+2.25, -1.55) -> 1268m
  h += rotGauss(x, z, 2.25, -1.55, 0.62, 0.54, -14, 590.0);
  h += rotGauss(x, z, 2.25, -1.55, 0.28, 0.28, 0, 105.0);
  // Smooth shoulder linking 东峰 down to cliff crest (eliminates dip behind cliff rim)
  h += rotGauss(x, z, 2.36, -0.95, 0.50, 0.40, -20, 215.0);

  // 4. Southeast Fault Scarp Cliff (陡崖) SE of 东峰 (~424m vertical drop: ~885m crest -> ~461m toe)
  const cx = 2.52, cz = -0.56;
  const nx = 0.44, nz = 0.898;
  const tx = nz, tz = -nx;
  const dx = x - cx, dz = z - cz;
  const s = dx * nx + dz * nz; // +SE (downthrown), -NW (upthrown)
  const t = dx * tx + dz * tz; // along cliff strike
  const wStrike = Math.exp(-Math.pow(t / 0.58, 4));
  const wCross = Math.exp(-Math.pow(s / 0.50, 2));
  const wCliff = wStrike * wCross;
  const cliffTarget = 678.0 - 222.0 * Math.tanh(s / 0.038); // ~900m upper bench -> ~456m lower bench (~424m scarp drop)
  h = h * (1.0 - wCliff * 0.94) + cliffTarget * (wCliff * 0.94);

  // 5. Southwest Basin Rim & Depression (盆地 + 湖泊, 最低35m)
  // Enclosing hills around SW basin (-1.75, +2.05)
  h += rotGauss(x, z, -3.35, 1.85, 0.58, 1.10, -8, 165.0);  // West rim
  h += rotGauss(x, z, -1.75, 3.48, 1.15, 0.55,  4, 150.0);  // South rim
  h += rotGauss(x, z, -3.10, 3.15, 0.68, 0.62, 35, 140.0);  // SW rim corner
  // Basin bowl depression pulling center down to ~35m
  h -= rotGauss(x, z, -1.75, 2.05, 0.72, 0.62, -12, 245.0);

  // 6. Southern Isolated Hill (孤丘, 448m)
  h += rotGauss(x, z, 1.80, 2.05, 0.54, 0.46, -22, 275.0);

  // 7. River Valley Carvings (Two rivers flowing south from saddles, merging strictly downhill into SW lake)
  const cw = closestOnPolyline(x, z, riverPolylines.west);
  const ce = closestOnPolyline(x, z, riverPolylines.east);
  const cm = closestOnPolyline(x, z, riverPolylines.merged);

  // Concave mountain-stream riverbed profiles (steep upper gorge, gentle lower valley -> confluence 165m -> lake 75m)
  const bedW = 165.0 + 505.0 * Math.pow(1 - cw.t, 2.5);
  const bedE = 165.0 + 545.0 * Math.pow(1 - ce.t, 2.6);
  const bedM =  75.0 +  90.0 * (1 - cm.t);

  // Valley width tapers smoothly downstream
  const widthW = 0.28 + 0.14 * cw.t;
  const widthE = 0.28 + 0.14 * ce.t;
  const widthM = 0.40 + 0.10 * cm.t;

  const influenceW = Math.exp(-Math.pow(cw.dist / widthW, 2));
  const influenceE = Math.exp(-Math.pow(ce.dist / widthE, 2));
  const influenceM = Math.exp(-Math.pow(cm.dist / widthM, 2));

  // Carve full valley trough so river centerlines match monotonic bed elevation & flanks stay higher
  h = h * (1 - influenceW) + bedW * influenceW;
  h = h * (1 - influenceE) + bedE * influenceE;
  h = h * (1 - influenceM) + bedM * influenceM;

  // 8. Subtle geological micro-relief (attenuated near exact peaks, saddles, cliff, and rivers)
  let calmMask = 1.0;
  const landmarksToCalm = [
    [-2.25, -1.65], [0.15, -1.80], [2.25, -1.55],
    [-1.05, -1.72], [1.20, -1.68], [-1.75, 2.05], [1.80, 2.05]
  ];
  for (let i = 0; i < landmarksToCalm.length; i++) {
    const lx = landmarksToCalm[i][0], lz = landmarksToCalm[i][1];
    const d2 = (x - lx) * (x - lx) + (z - lz) * (z - lz);
    calmMask *= (1.0 - 0.88 * Math.exp(-d2 / 0.16));
  }
  calmMask *= (1.0 - 0.95 * Math.max(influenceW, influenceE, influenceM));
  calmMask *= (1.0 - 0.95 * wCliff);
  h += fbm(x * 1.45 + 11.3, z * 1.45 - 5.7) * 28.0 * calmMask;

  return h;
}

function buildHeightmap() {
  riverPolylines = {
    west: densifySpline(RIVER_PATHS.west, 18),
    east: densifySpline(RIVER_PATHS.east, 18),
    merged: densifySpline(RIVER_PATHS.merged, 16)
  };

  // First pass: evaluate raw procedural field
  for (let iz = 0; iz < GRID; iz++) {
    const z = idxToKm(iz);
    for (let ix = 0; ix < GRID; ix++) {
      const x = idxToKm(ix);
      heightGrid[iz * GRID + ix] = evalBaseHeight(x, z);
    }
  }

  // Second pass: smooth radial calibration at exact landmarks so values match cartographic targets
  const calibrationTargets = [
    { x: -2.25, z: -1.65, target: 1432.0, sigma: 0.36 }, // 主峰
    { x:  0.15, z: -1.80, target: 1057.0, sigma: 0.35 }, // 中峰
    { x:  2.25, z: -1.55, target: 1268.0, sigma: 0.36 }, // 东峰
    { x: -1.05, z: -1.72, target:  747.0, sigma: 0.25 }, // 鞍部(西)
    { x:  1.20, z: -1.68, target:  798.0, sigma: 0.25 }, // 鞍部(东)
    { x:  1.80, z:  2.05, target:  448.0, sigma: 0.36 }, // 孤丘
    { x: -1.75, z:  2.05, target:   35.0, sigma: 0.38 }  // 盆底最低点
  ];

  // 3 quick Gauss-Seidel passes resolve tiny tail overlaps between nearby nodes
  for (let iter = 0; iter < 3; iter++) {
    const deltas = calibrationTargets.map(ct => {
      const cur = sampleHeightKm(ct.x, ct.z);
      return ct.target - cur;
    });
    for (let iz = 0; iz < GRID; iz++) {
      const z = idxToKm(iz);
      for (let ix = 0; ix < GRID; ix++) {
        const x = idxToKm(ix);
        let adj = 0;
        for (let k = 0; k < calibrationTargets.length; k++) {
          const ct = calibrationTargets[k];
          const dx = x - ct.x;
          const dz = z - ct.z;
          adj += deltas[k] * Math.exp(-(dx * dx + dz * dz) / (2 * ct.sigma * ct.sigma));
        }
        heightGrid[iz * GRID + ix] += adj;
      }
    }
  }

  // Clamp global range cleanly between 35.0m (basin floor) and 1432.0m (main peak)
  for (let i = 0; i < heightGrid.length; i++) {
    if (heightGrid[i] < 35.0) heightGrid[i] = 35.0;
    if (heightGrid[i] > 1432.0) heightGrid[i] = 1432.0;
  }

  // Compute terrain slope angle (tangent of slope in m/m) at every cell
  const cellMeters = (SIZE_KM * 1000.0) / (GRID - 1);
  for (let iz = 0; iz < GRID; iz++) {
    const z0 = Math.max(0, iz - 1);
    const z1 = Math.min(GRID - 1, iz + 1);
    const dzMeters = (z1 - z0) * cellMeters;
    for (let ix = 0; ix < GRID; ix++) {
      const x0 = Math.max(0, ix - 1);
      const x1 = Math.min(GRID - 1, ix + 1);
      const dxMeters = (x1 - x0) * cellMeters;
      const dhdx = (heightGrid[iz * GRID + x1] - heightGrid[iz * GRID + x0]) / dxMeters;
      const dhdz = (heightGrid[z1 * GRID + ix] - heightGrid[z0 * GRID + ix]) / dzMeters;
      slopeGrid[iz * GRID + ix] = Math.sqrt(dhdx * dhdx + dhdz * dhdz);
    }
  }
}

// Bilinear interpolation of elevation in meters given (xKm, zKm)
function sampleHeightKm(xKm, zKm) {
  const fx = Math.max(0, Math.min(GRID - 1.0001, kmToIdx(xKm)));
  const fz = Math.max(0, Math.min(GRID - 1.0001, kmToIdx(zKm)));
  const ix = Math.floor(fx), iz = Math.floor(fz);
  const tx = fx - ix, tz = fz - iz;
  const h00 = heightGrid[iz * GRID + ix];
  const h10 = heightGrid[iz * GRID + ix + 1];
  const h01 = heightGrid[(iz + 1) * GRID + ix];
  const h11 = heightGrid[(iz + 1) * GRID + ix + 1];
  return (h00 * (1 - tx) + h10 * tx) * (1 - tz) + (h01 * (1 - tx) + h11 * tx) * tz;
}

function sampleSlopeKm(xKm, zKm) {
  const fx = Math.max(0, Math.min(GRID - 1.0001, kmToIdx(xKm)));
  const fz = Math.max(0, Math.min(GRID - 1.0001, kmToIdx(zKm)));
  const ix = Math.floor(fx), iz = Math.floor(fz);
  const tx = fx - ix, tz = fz - iz;
  const s00 = slopeGrid[iz * GRID + ix];
  const s10 = slopeGrid[iz * GRID + ix + 1];
  const s01 = slopeGrid[(iz + 1) * GRID + ix];
  const s11 = slopeGrid[(iz + 1) * GRID + ix + 1];
  return (s00 * (1 - tx) + s10 * tx) * (1 - tz) + (s01 * (1 - tx) + s11 * tx) * tz;
}

function getQuantizedHeight(rawH, interval) {
  return Math.floor(rawH / interval) * interval;
}

function getDisplayHeightKm(xKm, zKm) {
  const raw = sampleHeightKm(xKm, zKm);
  return state.toggles.terrace ? getQuantizedHeight(raw, state.interval) : raw;
}
