'use strict';

function drawWaterOn2DCanvas(ctx, S) {
  // Draw SW basin lake wherever height <= LAKE_ELEV inside SW quadrant
  const step = S / (GRID - 1);
  ctx.fillStyle = 'rgba(42, 134, 198, 0.72)';
  for (let iz = Math.floor(GRID * 0.52); iz < GRID - 1; iz++) {
    for (let ix = 0; ix < Math.floor(GRID * 0.48); ix++) {
      if (heightGrid[iz * GRID + ix] <= LAKE_ELEV) {
        ctx.fillRect(ix * step, iz * step, step + 1, step + 1);
      }
    }
  }

  // Rivers
  const drawRiver = (pts, lw) => {
    ctx.strokeStyle = '#4aa8e0';
    ctx.lineWidth = lw;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.beginPath();
    pts.forEach((p, idx) => {
      const px = ((p[0] + HALF_KM) / SIZE_KM) * S;
      const py = ((p[1] + HALF_KM) / SIZE_KM) * S;
      if (idx === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.stroke();
  };
  const scaleW = S / 280;
  drawRiver(riverPolylines.west, 2.0 * scaleW);
  drawRiver(riverPolylines.east, 2.0 * scaleW);
  drawRiver(riverPolylines.merged, 3.0 * scaleW);
}
