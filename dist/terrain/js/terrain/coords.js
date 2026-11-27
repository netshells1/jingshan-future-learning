'use strict';

function kmToIdx(km) {
  return ((km + HALF_KM) / SIZE_KM) * (GRID - 1);
}
function idxToKm(i) {
  return (i / (GRID - 1)) * SIZE_KM - HALF_KM;
}
function kmToWorld(km) {
  return (km / HALF_KM) * HALF_WORLD;
}
function worldToKm(w) {
  return (w / HALF_WORLD) * HALF_KM;
}
