import cv2, numpy as np, os, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

d = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'vf')
fs = sorted(os.listdir(d))
from PIL import Image

def load(f):
    im = Image.open(os.path.join(d, f)).convert('L')
    return cv2.resize(np.array(im), (320, 180))

prev = None
rows = []
for f in fs:
    im = load(f)
    if prev is not None:
        p = cv2.goodFeaturesToTrack(prev, 300, 0.01, 6)
        if p is not None:
            p2, st, err = cv2.calcOpticalFlowPyrLK(prev, im, p, None)
            st = st.ravel() == 1
            if st.sum() > 12:
                a = p.reshape(-1, 2)[st]; b = p2.reshape(-1, 2)[st]
                M, inl = cv2.estimateAffinePartial2D(a, b, method=cv2.RANSAC, ransacReprojThreshold=2.5)
                if M is not None:
                    sc = float(np.sqrt(M[0, 0] ** 2 + M[0, 1] ** 2))
                    rot = float(np.degrees(np.arctan2(M[1, 0], M[0, 0])))
                    rows.append((f, int(st.sum()), round(sc, 4), round(rot, 3), round(float(M[0, 2]), 2), round(float(M[1, 2]), 2)))
    prev = im

print('frames analyzed:', len(rows))
for r in rows:
    print(r)
