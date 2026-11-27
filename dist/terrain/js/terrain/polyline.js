'use strict';

// Catmull-Rom polyline dense sampler
function densifySpline(pts, samplesPerSeg) {
  const out = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    for (let s = 0; s < samplesPerSeg; s++) {
      const t = s / samplesPerSeg;
      const t2 = t * t;
      const t3 = t2 * t;
      const x = 0.5 * ((2 * p1[0]) + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3);
      const z = 0.5 * ((2 * p1[1]) + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3);
      out.push([x, z]);
    }
  }
  out.push(pts[pts.length - 1]);
  return out;
}

// Shortest distance from point (x, z) to polyline and progress parameter t in [0,1]
function closestOnPolyline(x, z, poly) {
  let minD2 = Infinity;
  let bestT = 0;
  const n = poly.length;
  for (let i = 0; i < n - 1; i++) {
    const ax = poly[i][0], az = poly[i][1];
    const bx = poly[i + 1][0], bz = poly[i + 1][1];
    const vx = bx - ax, vz = bz - az;
    const wx = x - ax, wz = z - az;
    const len2 = vx * vx + vz * vz;
    let u = len2 > 1e-9 ? (wx * vx + wz * vz) / len2 : 0;
    u = Math.max(0, Math.min(1, u));
    const px = ax + u * vx;
    const pz = az + u * vz;
    const d2 = (x - px) * (x - px) + (z - pz) * (z - pz);
    if (d2 < minD2) {
      minD2 = d2;
      bestT = (i + u) / (n - 1);
    }
  }
  return { dist: Math.sqrt(minD2), t: bestT };
}
