import cv2, numpy as np, os, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
from PIL import Image

d = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'vf')
fs = sorted(os.listdir(d))

def load(f):
    im = Image.open(os.path.join(d, f)).convert('L')
    return cv2.resize(np.array(im), (640, 360))

imgs = [load(f) for f in fs]

# region-wise motion during segment f0052..f0070 (a big pan+zoom)
print('=== region motion within segment f0052..f0070 (parallax test) ===')
print('  region            dx      dy      scale')
regions = {
    'left-edge   ': (0, 0, 140, 360),
    'center      ': (250, 0, 390, 360),
    'right-edge  ': (500, 0, 640, 360),
    'top-strip   ': (0, 0, 640, 60),
    'bottom-strip': (0, 300, 640, 360),
}
for name, (x0, y0, x1, y1) in regions.items():
    dx = dy = sc = 0.0
    n = 0
    for i in range(51, 71):
        prev = imgs[i-1][y0:y1, x0:x1]
        cur = imgs[i][y0:y1, x0:x1]
        p = cv2.goodFeaturesToTrack(prev, 200, 0.01, 6)
        if p is None: continue
        p2, st, _ = cv2.calcOpticalFlowPyrLK(prev, cur, p, None)
        st = st.ravel() == 1
        if st.sum() < 8: continue
        a = p.reshape(-1,2)[st]; b = p2.reshape(-1,2)[st]
        M, _ = cv2.estimateAffinePartial2D(a, b, method=cv2.RANSAC, ransacReprojThreshold=3.0)
        if M is None: continue
        s = float(np.sqrt(M[0,0]**2 + M[0,1]**2))
        sc += s; dx += float(M[0,2]); dy += float(M[1,2]); n += 1
    if n:
        print(f'  {name}  {dx/n:6.2f}  {dy/n:6.2f}   {sc/n:.4f}')

print()
print('=== vertical-velocity profile (is there a vertical parallax?) ===')
prev = imgs[51]
for i in range(52, 71):
    cur = imgs[i]
    p = cv2.goodFeaturesToTrack(prev, 200, 0.01, 6)
    p2, st, _ = cv2.calcOpticalFlowPyrLK(prev, cur, p, None)
    st = st.ravel() == 1
    if st.sum() < 8:
        prev = cur; continue
    a = p.reshape(-1,2)[st]; b = p2.reshape(-1,2)[st]
    M, _ = cv2.estimateAffinePartial2D(a, b, method=cv2.RANSAC, ransacReprojThreshold=3.0)
    if M is None:
        prev = cur; continue
    s = float(np.sqrt(M[0,0]**2 + M[0,1]**2))
    # implied transform of the image center
    cx, cy = 320.0, 180.0
    nxc = M[0,0]*cx + M[0,1]*cy + M[0,2]
    nyc = M[1,0]*cx + M[1,1]*cy + M[1,2]
    print(f'  {fs[i]}  scale={s:.4f}  center moves dx={nxc-cx:7.2f} dy={nyc-cy:7.2f}')
    prev = cur
