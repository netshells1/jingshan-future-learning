'use strict';

// Deterministic 2D gradient noise for subtle geological micro-texture
function hash2(ix, iz) {
  const n = Math.sin(ix * 127.1 + iz * 311.7) * 43758.5453123;
  return n - Math.floor(n);
}
function valueNoise(x, z) {
  const ix = Math.floor(x);
  const iz = Math.floor(z);
  const fx = x - ix;
  const fz = z - iz;
  const ux = fx * fx * (3 - 2 * fx);
  const uz = fz * fz * (3 - 2 * fz);
  const a = hash2(ix, iz);
  const b = hash2(ix + 1, iz);
  const c = hash2(ix, iz + 1);
  const d = hash2(ix + 1, iz + 1);
  return a + (b - a) * ux + (c - a) * uz + (a - b - c + d) * ux * uz;
}
function fbm(x, z) {
  let sum = 0;
  let amp = 0.5;
  let freq = 1.0;
  for (let i = 0; i < 4; i++) {
    sum += (valueNoise(x * freq, z * freq) - 0.5) * amp;
    freq *= 2.07;
    amp *= 0.48;
  }
  return sum;
}

// Rotated anisotropic Gaussian helper
function rotGauss(x, z, cx, cz, sx, sz, angleDeg, amp) {
  const rad = angleDeg * Math.PI / 180;
  const ca = Math.cos(rad);
  const sa = Math.sin(rad);
  const dx = x - cx;
  const dz = z - cz;
  const rx = dx * ca + dz * sa;
  const rz = -dx * sa + dz * ca;
  return amp * Math.exp(-0.5 * ((rx * rx) / (sx * sx) + (rz * rz) / (sz * sz)));
}
