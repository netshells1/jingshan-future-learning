import numpy as np, os
from PIL import Image

OUT = r"D:\景山实验\实验项目\jingshan-future-learning\agent-tools\vf"
files = sorted(f for f in os.listdir(OUT) if f.endswith(".jpg"))

def blocks_for(idx):
    im = np.asarray(Image.open(os.path.join(OUT, files[idx])).convert("L"), dtype=np.float32)
    h, w = im.shape
    return im, h, w

def describe(im, h, w, name):
    print(f"\n===== {name}  ({w}x{h}) =====")
    # luminance histogram
    print("lum histogram (0-255, 8 bins):", np.histogram(im, bins=8, range=(0,255))[0].tolist())
    # coarse block map: 24 cols x 16 rows, classify
    rows, cols = 16, 24
    print("\nblock map (rows=top->bottom):")
    for r in range(rows):
        line = []
        for c in range(cols):
            blk = im[r*h//rows:(r+1)*h//rows, c*w//cols:(c+1)*w//cols]
            m = blk.mean(); s = blk.std()
            if m > 200 and s < 25: ch = "."      # flat light
            elif m < 40 and s < 25: ch = "#"     # flat dark
            elif s > 55: ch = "T"               # high variance = photo/text
            elif m > 140: ch = "+"
            else: ch = "-"
            line.append(ch)
        print(f"  r{r:02d} " + "".join(line))

for idx, name in [(15, "frame 1.5s"), (36, "frame 3.6s"), (95, "frame 9.5s"), (150, "frame 15.0s")]:
    im, h, w = blocks_for(idx)
    describe(im, h, w, name)
