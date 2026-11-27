'use strict';

// Custom GLSL Terrain Shader
const TERRAIN_VERT = `
  attribute float aRawElev;
  attribute float aSlope;
  uniform float uExag;
  uniform float uElevToWorld;
  varying vec3 vWorldPos;
  varying vec3 vNormalDir;
  varying float vRawElev;
  varying float vSlope;

  void main() {
    vRawElev = aRawElev;
    vSlope = aSlope;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPos.xyz;
    vNormalDir = normalize(normal);
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const TERRAIN_FRAG = `
  uniform int uSurfaceMode;
  uniform float uTime;
  uniform float uClouds;
  uniform float uCutActive;
  uniform float uCutAbove;
  uniform float uCutElev;
  uniform float uHoverActive;
  uniform vec2 uHoverXZ;
  uniform float uExag;

  varying vec3 vWorldPos;
  varying vec3 vNormalDir;
  varying float vRawElev;
  varying float vSlope;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
      mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x),
      u.y
    );
  }
  float cloudNoise(vec2 p) {
    float v = 0.0;
    v += 0.55 * vnoise(p);
    v += 0.30 * vnoise(p * 2.1 + vec2(4.2, 1.7));
    v += 0.15 * vnoise(p * 4.3 - vec2(2.1, 6.4));
    return v;
  }

  vec3 getRealisticColor(float elev, float slope, vec3 pos) {
    // Shore & lakebed silt
    vec3 cLakeBed = vec3(0.20, 0.25, 0.24);
    vec3 cLowGreen = vec3(0.24, 0.37, 0.21);
    vec3 cMidForest = vec3(0.22, 0.32, 0.19);
    vec3 cScrub = vec3(0.45, 0.40, 0.28);
    vec3 cAlpineRock = vec3(0.54, 0.50, 0.46);
    vec3 cDarkCliff = vec3(0.27, 0.25, 0.24);
    vec3 cSnow = vec3(0.92, 0.91, 0.89);

    vec3 col = cLowGreen;
    if (elev < 95.0) {
      col = mix(cLakeBed, cLowGreen, smoothstep(65.0, 96.0, elev));
    } else if (elev < 380.0) {
      col = mix(cLowGreen, cMidForest, smoothstep(95.0, 380.0, elev));
    } else if (elev < 760.0) {
      col = mix(cMidForest, cScrub, smoothstep(380.0, 760.0, elev));
    } else if (elev < 1140.0) {
      col = mix(cScrub, cAlpineRock, smoothstep(760.0, 1100.0, elev));
    } else {
      col = cAlpineRock;
    }

    // Micro geological texture
    float grain = vnoise(pos.xz * 1.8) * 0.12 - 0.06;
    col += grain * 0.5;

    // Steep rock strata exposure
    float rockMask = smoothstep(0.45, 0.85, slope);
    float strata = sin(elev * 0.14 + vnoise(pos.xz * 0.7) * 2.5) * 0.04;
    col = mix(col, cDarkCliff + strata, rockMask * 0.85);

    // Snow caps above ~1150m on non-vertical slopes
    float snowAlt = smoothstep(1110.0, 1225.0, elev);
    float snowSlope = 1.0 - smoothstep(0.55, 0.95, slope);
    col = mix(col, cSnow, snowAlt * snowSlope * 0.92);
    return col;
  }

  vec3 getHypsometricColor(float elev) {
    vec3 c0 = vec3(0.16, 0.42, 0.30); // < 150
    vec3 c1 = vec3(0.36, 0.60, 0.34); // 150-350
    vec3 c2 = vec3(0.76, 0.75, 0.40); // 350-600
    vec3 c3 = vec3(0.84, 0.58, 0.32); // 600-850
    vec3 c4 = vec3(0.68, 0.35, 0.24); // 850-1150
    vec3 c5 = vec3(0.90, 0.85, 0.80); // 1150-1450
    if (elev < 150.0) return mix(c0, c1, smoothstep(35.0, 150.0, elev));
    if (elev < 350.0) return mix(c1, c2, smoothstep(150.0, 350.0, elev));
    if (elev < 600.0) return mix(c2, c3, smoothstep(350.0, 600.0, elev));
    if (elev < 850.0) return mix(c3, c4, smoothstep(600.0, 850.0, elev));
    return mix(c4, c5, smoothstep(850.0, 1380.0, elev));
  }

  vec3 getSlopeColor(float slope) {
    float deg = degrees(atan(slope));
    vec3 cFlat = vec3(0.15, 0.32, 0.40);
    vec3 cGentle = vec3(0.28, 0.60, 0.40);
    vec3 cMod = vec3(0.87, 0.71, 0.31);
    vec3 cSteep = vec3(0.86, 0.38, 0.20);
    vec3 cCliff = vec3(0.88, 0.20, 0.34);
    if (deg < 8.0) return mix(cFlat, cGentle, smoothstep(0.0, 8.0, deg));
    if (deg < 18.0) return mix(cGentle, cMod, smoothstep(8.0, 18.0, deg));
    if (deg < 32.0) return mix(cMod, cSteep, smoothstep(18.0, 32.0, deg));
    return mix(cSteep, cCliff, smoothstep(32.0, 52.0, deg));
  }

  void main() {
    if (uCutAbove > 0.5 && vRawElev > uCutElev) {
      discard;
    }

    vec3 N = normalize(vNormalDir);
    vec3 L = normalize(vec3(0.65, 0.72, 0.45));
    vec3 L2 = normalize(vec3(-0.5, 0.4, -0.6));

    vec3 baseCol;
    if (uSurfaceMode == 0) {
      baseCol = getRealisticColor(vRawElev, vSlope, vWorldPos);
    } else if (uSurfaceMode == 1) {
      baseCol = getHypsometricColor(vRawElev);
    } else {
      baseCol = getSlopeColor(vSlope);
    }

    float diff1 = max(dot(N, L), 0.0);
    float diff2 = max(dot(N, L2), 0.0) * 0.22;
    float hemi = 0.5 + 0.5 * N.y;

    // Drifting cloud shadows
    float cloudAtten = 1.0;
    if (uClouds > 0.5) {
      float cn = cloudNoise(vWorldPos.xz * 0.055 + vec2(uTime * 0.045, uTime * 0.022));
      cloudAtten = 1.0 - smoothstep(0.48, 0.72, cn) * 0.42;
    }

    vec3 lit = baseCol * (0.30 + 0.22 * hemi + (0.72 * diff1 + diff2) * cloudAtten);

    // Highlight slice contour ring when Chapter 01 cutting plane is active
    if (uCutActive > 0.5) {
      float distCut = abs(vRawElev - uCutElev);
      float cutBand = 1.0 - smoothstep(0.0, 7.5, distCut);
      lit = mix(lit, vec3(0.95, 0.78, 0.40), cutBand * 0.85);
    }

    // Hover spotlight ring synced with minimap & mouse raycast
    if (uHoverActive > 0.5) {
      float dHover = length(vWorldPos.xz - uHoverXZ);
      float ring = smoothstep(0.35, 0.7, dHover) * (1.0 - smoothstep(0.9, 1.3, dHover));
      float dotC = 1.0 - smoothstep(0.0, 0.45, dHover);
      lit = mix(lit, vec3(0.95, 0.80, 0.45), clamp(ring * 0.9 + dotC * 0.7, 0.0, 1.0));
    }

    gl_FragColor = vec4(lit, 1.0);
  }
`;

// Side strata wall shader
const WALL_VERT = `
  varying vec3 vWorldPos;
  varying vec3 vNormalDir;
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    vNormalDir = normalize(normal);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;
const WALL_FRAG = `
  varying vec3 vWorldPos;
  varying vec3 vNormalDir;
  void main() {
    vec3 N = normalize(vNormalDir);
    vec3 L = normalize(vec3(0.6, 0.7, 0.4));
    float diff = max(dot(N, L), 0.0) * 0.55 + 0.45;
    float band1 = sin(vWorldPos.y * 2.1 + sin(vWorldPos.x * 0.12 + vWorldPos.z * 0.12) * 0.6);
    float band2 = sin(vWorldPos.y * 5.2);
    vec3 darkRock = vec3(0.09, 0.10, 0.12);
    vec3 shale = vec3(0.16, 0.15, 0.14);
    vec3 sandstone = vec3(0.24, 0.20, 0.16);
    vec3 col = mix(darkRock, shale, 0.5 + 0.5 * band1);
    col = mix(col, sandstone, smoothstep(0.45, 0.95, band2) * 0.45);
    // Warm rim highlight near top soil cut
    gl_FragColor = vec4(col * diff, 1.0);
  }
`;

// SW basin lake surface shader
const LAKE_VERT = `
  attribute float aShoreDepth;
  varying vec2 vUv;
  varying float vShoreDepth;
  void main() {
    vUv = uv;
    vShoreDepth = aShoreDepth;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const LAKE_FRAG = `
  uniform float uTime;
  varying vec2 vUv;
  varying float vShoreDepth;
  void main() {
    if (vShoreDepth < -1.0) discard;
    float wave = sin(vUv.x * 42.0 + uTime * 1.4) * cos(vUv.y * 38.0 - uTime * 1.1) * 0.05;
    float depthTint = smoothstep(0.0, 40.0, vShoreDepth);
    vec3 shallowCol = vec3(0.22, 0.56, 0.78);
    vec3 deepCol = vec3(0.10, 0.36, 0.62);
    vec3 col = mix(shallowCol, deepCol, depthTint) + vec3(0.05, 0.11, 0.15) * (0.5 + wave * 6.0);
    float alpha = smoothstep(-1.0, 2.5, vShoreDepth) * 0.88;
    gl_FragColor = vec4(col, alpha);
  }
`;
