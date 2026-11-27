'use strict';

let cameraAnim = null;

function flyTo(posArr, targetArr, duration = 850) {
  cameraAnim = {
    startPos: camera.position.clone(),
    endPos: new THREE.Vector3(posArr[0], posArr[1], posArr[2]),
    startTarget: controls.target.clone(),
    endTarget: new THREE.Vector3(targetArr[0], targetArr[1], targetArr[2]),
    startTime: performance.now(),
    duration
  };
}

function flyToLandmark(xKm, zKm, dist = 30, pitch = 20) {
  const scaleY = ELEV_TO_WORLD * state.exag;
  const y = getDisplayHeightKm(xKm, zKm) * scaleY;
  const wx = kmToWorld(xKm);
  const wz = kmToWorld(zKm);
  flyTo([wx + dist * 0.45, y + pitch, wz + dist * 0.85], [wx, y, wz], 800);
}

function resetCameraView() {
  const ch = CHAPTERS[state.chapter];
  flyTo(ch.cam.pos, ch.cam.target, 850);
}

function resetToNorth() {
  // Reset compass to true North while keeping same distance and elevation
  const dx = camera.position.x - controls.target.x;
  const dy = camera.position.y - controls.target.y;
  const dz = camera.position.z - controls.target.z;
  const dist = Math.sqrt(dx * dx + dz * dz);
  // Position camera due south looking north (azimuth 0)
  const newPos = [controls.target.x, controls.target.y + dy, controls.target.z + dist];
  flyTo(newPos, [controls.target.x, controls.target.y, controls.target.z], 850);
}

function updateCompass() {
  const dx = camera.position.x - controls.target.x;
  const dz = camera.position.z - controls.target.z;
  // Azimuth: looking from +Z toward -Z (North) => dx=0, dz>0 => angle=0
  const rad = Math.atan2(dx, dz);
  const deg = ((rad * 180 / Math.PI) % 360 + 360) % 360;
  const dial = document.getElementById('compass-dial');
  dial.style.transform = `rotate(${-deg.toFixed(1)}deg)`;
  document.getElementById('compass-deg').textContent = `N ${String(Math.round(deg)).padStart(3, '0')}°`;
}

function cancelCameraAnimation() {
  cameraAnim = null;
}

// Smooth camera flight, advanced once per frame
function stepCameraAnimation() {
  if (cameraAnim) {
    const rawT = (performance.now() - cameraAnim.startTime) / cameraAnim.duration;
    const t = Math.min(1, rawT);
    const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    camera.position.lerpVectors(cameraAnim.startPos, cameraAnim.endPos, ease);
    controls.target.lerpVectors(cameraAnim.startTarget, cameraAnim.endTarget, ease);
    if (t >= 1) cameraAnim = null;
  }
}
