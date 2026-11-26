import numpy as np, subprocess, os, json, sys
from PIL import Image

FF = r"C:\Users\ADMIN\AppData\Local\Programs\Python\Python312\Lib\site-packages\imageio_ffmpeg\binaries\ffmpeg-win-x86_64-v9.0.2.exe"
SRC = r"C:\Users\ADMIN\AppData\Roaming\LarkShell\screenshot\20261126152707_rec_.mp4"
OUT = r"D:\景山实验\实验项目\jingshan-future-learning\agent-tools\vf"
os.makedirs(OUT, exist_ok=True)

subprocess.run([FF, "-y", "-i", SRC, "-vf", "fps=10", "-q:v", "2", os.path.join(OUT, "f%04d.jpg")],
               capture_output=True)

files = sorted(f for f in os.listdir(OUT) if f.endswith(".jpg"))
imgs = [np.asarray(Image.open(os.path.join(OUT, f)).convert("RGB"), dtype=np.float32) for f in files]
print("frames:", len(imgs), "size:", imgs[0].shape)

# Global frame-to-frame difference to find the animation structure
diffs = []
for i in range(1, len(imgs)):
    d = np.abs(imgs[i] - imgs[i-1]).mean()
    diffs.append(round(float(d), 3))
print("per-frame mean abs diff (0.1s steps):")
print(diffs)

# Where does change happen? column/row profile of cumulative change
if len(imgs) > 2:
    base = imgs[0]
    cum = np.mean([np.abs(im - base).mean(axis=2) for im in imgs[1:]], axis=0)
    h, w = cum.shape
    rows = cum.mean(axis=1)
    cols = cum.mean(axis=0)
    print("\nshape h,w =", h, w)
    print("row activity (band of 20):")
    for i in range(0, h, max(1, h//20)):
        print(f"  y={i:4d}  {rows[i]:6.2f}")
    print("\ncol activity (band of 20):")
    for i in range(0, w, max(1, w//20)):
        print(f"  x={i:4d}  {cols[i]:6.2f}")
