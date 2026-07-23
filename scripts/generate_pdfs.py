import os
import subprocess

EDGE_EXE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not os.path.exists(EDGE_EXE):
    EDGE_EXE = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

BASE_DIR = r"c:\Development\astra\brand_assets"

def export_pdf(svg_p, pdf_p):
    html_p = pdf_p + ".html"
    svg_uri = "file:///" + os.path.abspath(svg_p).replace("\\", "/")
    html_content = f"""<!DOCTYPE html>
<html>
<head>
<style>
    @page {{ size: auto; margin: 0; }}
    html, body {{ margin: 0; padding: 0; background: #070A14; width: 100%; height: 100%; overflow: hidden; }}
    img {{ width: 100%; height: 100%; object-fit: contain; display: block; }}
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
        "--no-pdf-header-footer",
        f"--print-to-pdf={pdf_p}",
        f"file:///{html_p.replace('\\', '/')}"
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if os.path.exists(html_p):
        os.remove(html_p)
    print(f"Generated PDF vector container: {pdf_p}")

svg_board = os.path.join(BASE_DIR, "guidelines", "astra-brand-guidelines-board.svg")
pdf_board = os.path.join(BASE_DIR, "guidelines", "astra-brand-guidelines-board.pdf")
svg_logo = os.path.join(BASE_DIR, "vectors", "astra-logo-primary-dark.svg")
pdf_logo = os.path.join(BASE_DIR, "raster", "astra-logo-primary-dark.pdf")

export_pdf(svg_board, pdf_board)
export_pdf(svg_logo, pdf_logo)
print("PDF Export Complete.")
