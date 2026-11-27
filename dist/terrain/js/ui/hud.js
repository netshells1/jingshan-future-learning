'use strict';

function updateHoverReadout(xKm, zKm) {
  if (xKm === null) {
    state.hoverKm = null;
    terrainMat.uniforms.uHoverActive.value = 0.0;
    document.getElementById('hud-coord').innerHTML = `${state.lang === 'zh' ? '坐标' : 'Coord'} <b>--</b>`;
    document.getElementById('hud-elev').innerHTML = `${state.lang === 'zh' ? '海拔' : 'Elev'} <b>--</b>`;
    document.getElementById('hud-slope').innerHTML = `${state.lang === 'zh' ? '坡度' : 'Slope'} <b>--</b>`;
    renderMinimap();
    return;
  }
  state.hoverKm = [xKm, zKm];
  const elev = sampleHeightKm(xKm, zKm);
  const slopeDeg = Math.atan(sampleSlopeKm(xKm, zKm)) * 180 / Math.PI;
  terrainMat.uniforms.uHoverActive.value = 1.0;
  terrainMat.uniforms.uHoverXZ.value.set(kmToWorld(xKm), kmToWorld(zKm));

  document.getElementById('hud-coord').innerHTML = `${state.lang === 'zh' ? '坐标' : 'Pos'} <b>(${xKm.toFixed(2)}, ${zKm.toFixed(2)}) km</b>`;
  document.getElementById('hud-elev').innerHTML = `${state.lang === 'zh' ? '海拔' : 'Elev'} <b>${Math.round(elev)} m</b>`;
  document.getElementById('hud-slope').innerHTML = `${state.lang === 'zh' ? '坡度' : 'Slope'} <b>${slopeDeg.toFixed(1)}°</b>`;
  renderMinimap();
}
