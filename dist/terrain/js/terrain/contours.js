'use strict';

function isMajorLevel(level, interval) {
  if (interval === 50) return level % 200 === 0;
  if (interval === 100) return level % 500 === 0;
  return level % 400 === 0;
}

function interpEdge(a, b, level) {
  const denom = b - a;
  if (Math.abs(denom) < 1e-6) return 0.5;
  return Math.max(0, Math.min(1, (level - a) / denom));
}

// Extract iso-segments for a list of levels via Marching Squares (cell-first optimization)
function extractContourLevels(levels) {
  // Returns Map<level, Array<[u0, v0, u1, v1]>> where u,v in [0, 1]
  const result = new Map();
  for (const lvl of levels) result.set(lvl, []);

  const invN = 1.0 / (GRID - 1);
  const minLvl = levels[0];
  const maxLvl = levels[levels.length - 1];

  for (let iz = 0; iz < GRID - 1; iz++) {
    const v0 = iz * invN;
    const v1 = (iz + 1) * invN;
    const row0 = iz * GRID;
    const row1 = (iz + 1) * GRID;

    for (let ix = 0; ix < GRID - 1; ix++) {
      const tl = heightGrid[row0 + ix];
      const tr = heightGrid[row0 + ix + 1];
      const br = heightGrid[row1 + ix + 1];
      const bl = heightGrid[row1 + ix];

      const cellMin = Math.min(tl, tr, br, bl);
      const cellMax = Math.max(tl, tr, br, bl);
      if (cellMax < minLvl || cellMin > maxLvl) continue;

      const u0 = ix * invN;
      const u1 = (ix + 1) * invN;

      for (let l = 0; l < levels.length; l++) {
        const level = levels[l];
        if (level < cellMin || level > cellMax) continue;

        // Bitmask: 8=TL, 4=TR, 2=BR, 1=BL
        let mask = 0;
        if (tl >= level) mask |= 8;
        if (tr >= level) mask |= 4;
        if (br >= level) mask |= 2;
        if (bl >= level) mask |= 1;
        if (mask === 0 || mask === 15) continue;

        // Edge points: 0=top, 1=right, 2=bottom, 3=left
        const pt = (edge) => {
          if (edge === 0) return [u0 + interpEdge(tl, tr, level) * invN, v0];
          if (edge === 1) return [u1, v0 + interpEdge(tr, br, level) * invN];
          if (edge === 2) return [u0 + interpEdge(bl, br, level) * invN, v1];
          return [u0, v0 + interpEdge(tl, bl, level) * invN];
        };

        const arr = result.get(level);
        const center = (tl + tr + br + bl) * 0.25;
        switch (mask) {
          case 1: case 14: { const a = pt(3), b = pt(2); arr.push([a[0], a[1], b[0], b[1]]); break; }
          case 2: case 13: { const a = pt(2), b = pt(1); arr.push([a[0], a[1], b[0], b[1]]); break; }
          case 3: case 12: { const a = pt(3), b = pt(1); arr.push([a[0], a[1], b[0], b[1]]); break; }
          case 4: case 11: { const a = pt(0), b = pt(1); arr.push([a[0], a[1], b[0], b[1]]); break; }
          case 6: case 9:  { const a = pt(0), b = pt(2); arr.push([a[0], a[1], b[0], b[1]]); break; }
          case 7: case 8:  { const a = pt(3), b = pt(0); arr.push([a[0], a[1], b[0], b[1]]); break; }
          case 5: {
            if (center >= level) {
              const a = pt(3), b = pt(0), c = pt(2), d = pt(1);
              arr.push([a[0], a[1], b[0], b[1]], [c[0], c[1], d[0], d[1]]);
            } else {
              const a = pt(3), b = pt(2), c = pt(0), d = pt(1);
              arr.push([a[0], a[1], b[0], b[1]], [c[0], c[1], d[0], d[1]]);
            }
            break;
          }
          case 10: {
            if (center >= level) {
              const a = pt(0), b = pt(1), c = pt(3), d = pt(2);
              arr.push([a[0], a[1], b[0], b[1]], [c[0], c[1], d[0], d[1]]);
            } else {
              const a = pt(3), b = pt(0), c = pt(2), d = pt(1);
              arr.push([a[0], a[1], b[0], b[1]], [c[0], c[1], d[0], d[1]]);
            }
            break;
          }
        }
      }
    }
  }
  return result;
}

let cachedInterval = -1;
let cachedContours = null;
function getContoursForInterval(interval) {
  if (cachedInterval === interval && cachedContours) return cachedContours;
  const levels = [];
  for (let lvl = interval; lvl <= 1450; lvl += interval) {
    levels.push(lvl);
  }
  cachedContours = extractContourLevels(levels);
  cachedInterval = interval;
  return cachedContours;
}
