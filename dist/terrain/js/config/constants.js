'use strict';

const GRID = 256;
const SIZE_KM = 8.0;          // 8 km × 8 km
const HALF_KM = 4.0;
const WORLD_SIZE = 80.0;      // 1 world unit = 100 m; 10 units = 1 km
const HALF_WORLD = WORLD_SIZE * 0.5;
const ELEV_TO_WORLD = 0.01;   // 100 m = 1.0 unit at 1.0x exaggeration
const BASE_FLOOR_Y = -5.5;    // bottom of rock block
const PROJ_BASE_Y = -14.5;    // floating 2D contour base plane
const LAKE_ELEV = 92.0;       // SW basin lake elevation (m)
const MAX_CLIFF_DROP = 424.0; // SE cliff elevation drop (m)
