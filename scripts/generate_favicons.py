import os
import subprocess
from PIL import Image

EDGE_EXE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not os.path.exists(EDGE_EXE):
    EDGE_EXE = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

BASE_DIR = r"c:\Development\astra\brand_assets"
FAVICONS_DIR = os.path.join(BASE_DIR, "favicons")
VECTORS_DIR = os.path.join(BASE_DIR, "vectors")
os.makedirs(FAVICONS_DIR, exist_ok=True)

fav_svg = os.path.join(VECTORS_DIR, "astra-favicon.svg")
imgs = []

for sz in [16, 32, 48, 64]:
    out_p = os.path.join(FAVICONS_DIR, f"favicon-{sz}x{sz}.png")
    html_p = out_p + ".html"
    svg_uri = "file:///" + os.path.abspath(fav_svg).replace("\\", "/")
    
    html_content = f"""<!DOCTYPE html>
<html>
<head>
<style>
    body {{ margin: 0; padding: 0; background: transparent; overflow: hidden; }}
    img {{ width: {sz}px; height: {sz}px; display: block; }}
</style>
</head>
<body>
    <img src="{svg_uri}" />
</body>
</html>"""
    
    with open(html_p, "w", encoding="utf-8") as f:
        f.write(html_content)
        
    cmd = [
        EDGE_EXE,
        "--headless",
        "--disable-gpu",
        f"--window-size={sz},{sz}",
        f"--screenshot={out_p}",
        f"file:///{html_p.replace('\\', '/')}"
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if os.path.exists(html_p):
        os.remove(html_p)
    if os.path.exists(out_p):
        print(f"Favicon {sz}x{sz} generated: {out_p}")
        imgs.append(Image.open(out_p))

if imgs:
    ico_p = os.path.join(FAVICONS_DIR, "favicon.ico")
    imgs[0].save(ico_p, format="ICO", sizes=[(i.width, i.height) for i in imgs], append_images=imgs[1:])
    print(f"Favicon.ico container generated: {ico_p}")

# Clean up temp htmls in raster if any
for root, dirs, files in os.walk(BASE_DIR):
    for f in files:
        if f.endswith(".html"):
            try:
                os.remove(os.path.join(root, f))
            except:
                pass
