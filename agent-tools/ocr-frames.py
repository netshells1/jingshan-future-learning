import numpy as np, os
from PIL import Image
from rapidocr_onnxruntime import RapidOCR

OUT = r"D:\景山实验\实验项目\jingshan-future-learning\agent-tools\vf"
files = sorted(f for f in os.listdir(OUT) if f.endswith(".jpg"))
ocr = RapidOCR()

for idx in [15, 36, 60, 95, 130, 150]:
    path = os.path.join(OUT, files[idx])
    img = np.asarray(Image.open(path).convert("RGB"))
    res, _ = ocr(img)
    print(f"\n===== frame {idx} (t={idx/10:.1f}s) =====")
    if not res:
        print("  (no text)")
        continue
    for box, text, score in res:
        x = int(min(p[0] for p in box)); y = int(min(p[1] for p in box))
        h = int(max(p[1] for p in box) - y)
        print(f"  y={y:4d} h={h:3d} x={x:4d}  {text!r}  ({score:.2f})")
