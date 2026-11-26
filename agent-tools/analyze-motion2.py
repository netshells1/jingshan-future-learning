import cv2, numpy as np, os, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
from PIL import Image

d = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'vf')
fs = sorted(os.listdir(d))

def load(f):
    im = Image.open(os.path.join(d, f)).convert('L')
    return cv2.resize(np.array(im), (320, 180))

imgs = [load(f) for f in fs]

# 1) scene cuts: histogram correlation between consecutive frames
print('=== cuts / big changes (hist corr) ===')
for i in range(1, len(imgs)):
    a = cv2.calcHist([imgs[i-1]], [0], None, [64], [0,256]).flatten()
    b = cv2.calcHist([imgs[i]], [0], None, [64], [0,256]).flatten()
    c = cv2.compareHist(a, b, cv2.HISTCMP_CORREL)
    if c < 0.85:
        print(f'  {fs[i]}  corr={c:.3f}')

print()
print('=== motion segments (nonzero motion runs) ===')
runs = []
prev = None
for i, f in enumerate(fs):
    im = imgs[i]
    if prev is not None:
        p = cv2.goodFeaturesToTrack(prev, 300, 0.01, 6)
        p2, st, err = cv2.calcOpticalFlowPyrLK(prev, im, p, None)
        st = st.ravel() == 1
        if st.sum() > 12:
            a = p.reshape(-1,2)[st]; b = p2.reshape(-1,2)[st]
            M, _ = cv2.estimateAffinePartial2D(a, b, method=cv2.RANSAC, ransacReprojThreshold=2.5)
            if M is not None:
                sc = float(np.sqrt(M[0,0]**2 + M[0,1]**2))
                rot = float(np.degrees(np.arctan2(M[1,0], M[0,0])))
                tx, ty = float(M[0,2]), float(M[1,2])
                mag = max(abs(sc-1)*100, abs(rot), abs(tx)*100/320, abs(ty)*100/180)
                if mag > 0.15:
                    runs.append((i, f, round(sc,4), round(rot,2), round(tx,2), round(ty,2)))
    prev = im

# group contiguous
group = []
for r in runs:
    if group and r[0] - group[-1][-1][0] <= 2:
        group[-1].append(r)
    else:
        group.append([r])
for g in group:
    f0, f1 = g[0][1], g[-1][1]
    sc = [x[2] for x in g]; rot=[x[3] for x in g]; tx=[x[4] for x in g]; ty=[x[5] for x in g]
    print(f'  {f0}..{f1} n={len(g):3d}  scale {min(sc):.4f}->{max(sc):.4f}  rot {min(rot):7.2f}->{max(rot):7.2f}  tx {min(tx):7.2f}->{max(tx):7.2f}  ty {min(ty):7.2f}->{max(ty):7.2f}')
