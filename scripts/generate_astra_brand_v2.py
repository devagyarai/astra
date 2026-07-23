import os
import subprocess
import sys
from PIL import Image

# Directory setup for v2 brand assets
BASE_DIR = r"c:\Development\astra\brand_assets\v2"
VECTORS_DIR = os.path.join(BASE_DIR, "vectors")
RASTER_DIR = os.path.join(BASE_DIR, "raster")
APP_ICONS_DIR = os.path.join(BASE_DIR, "app_icons")
FAVICONS_DIR = os.path.join(BASE_DIR, "favicons")
GUIDELINES_DIR = os.path.join(BASE_DIR, "guidelines")
BOARDS_DIR = os.path.join(BASE_DIR, "boards")

for d in [BASE_DIR, VECTORS_DIR, RASTER_DIR, APP_ICONS_DIR, FAVICONS_DIR, GUIDELINES_DIR, BOARDS_DIR]:
    os.makedirs(d, exist_ok=True)

# Browser Renderer Executable
EDGE_EXE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not os.path.exists(EDGE_EXE):
    EDGE_EXE = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

# Brand Colors (v2 Refined Palette)
COLOR_DEEP_SPACE = "#0B1020"
COLOR_COSMIC_PURPLE = "#6D5DF6"
COLOR_WARM_STARLIGHT = "#FFC857"
COLOR_NEUTRAL_WHITE = "#FFFFFF"
COLOR_MUTED_GRAY = "#A1A7BB"
COLOR_LIGHT_BG = "#F8FAFC"
COLOR_MONO_BLACK = "#090D16"
COLOR_ACCENT_AMBER = "#F59E0B"
COLOR_INDIGO_GLOW = "#4F46E5"

def get_v2_gradients_defs(id_prefix=""):
    return f"""
    <defs>
        <!-- Flagship Starlight Radiant Gradient -->
        <linearGradient id="{id_prefix}starGradientV2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="30%" stop-color="{COLOR_WARM_STARLIGHT}"/>
            <stop offset="65%" stop-color="{COLOR_COSMIC_PURPLE}"/>
            <stop offset="100%" stop-color="{COLOR_INDIGO_GLOW}"/>
        </linearGradient>

        <!-- Star Horizontal Glow Gradient -->
        <linearGradient id="{id_prefix}starHorizGradientV2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="{COLOR_COSMIC_PURPLE}" stop-opacity="0.15"/>
            <stop offset="50%" stop-color="#FFFFFF"/>
            <stop offset="100%" stop-color="{COLOR_COSMIC_PURPLE}" stop-opacity="0.15"/>
        </linearGradient>

        <!-- Star Core Radial Aura -->
        <radialGradient id="{id_prefix}coreGlowV2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#FFFFFF" stop-opacity="1"/>
            <stop offset="25%" stop-color="{COLOR_WARM_STARLIGHT}" stop-opacity="0.95"/>
            <stop offset="60%" stop-color="{COLOR_COSMIC_PURPLE}" stop-opacity="0.5"/>
            <stop offset="100%" stop-color="{COLOR_COSMIC_PURPLE}" stop-opacity="0"/>
        </radialGradient>

        <!-- Horizon Arc Gradient Dark -->
        <linearGradient id="{id_prefix}horizonGradientV2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="{COLOR_COSMIC_PURPLE}" stop-opacity="0.1"/>
            <stop offset="20%" stop-color="{COLOR_COSMIC_PURPLE}" stop-opacity="0.85"/>
            <stop offset="50%" stop-color="{COLOR_WARM_STARLIGHT}" stop-opacity="1"/>
            <stop offset="80%" stop-color="{COLOR_COSMIC_PURPLE}" stop-opacity="0.85"/>
            <stop offset="100%" stop-color="{COLOR_COSMIC_PURPLE}" stop-opacity="0.1"/>
        </linearGradient>

        <!-- Horizon Arc Gradient Light -->
        <linearGradient id="{id_prefix}horizonLightGradientV2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="{COLOR_COSMIC_PURPLE}" stop-opacity="0.2"/>
            <stop offset="25%" stop-color="{COLOR_COSMIC_PURPLE}" stop-opacity="0.95"/>
            <stop offset="50%" stop-color="{COLOR_ACCENT_AMBER}" stop-opacity="1"/>
            <stop offset="75%" stop-color="{COLOR_COSMIC_PURPLE}" stop-opacity="0.95"/>
            <stop offset="100%" stop-color="{COLOR_COSMIC_PURPLE}" stop-opacity="0.2"/>
        </linearGradient>

        <!-- App Icon Premium Gradient -->
        <linearGradient id="{id_prefix}appIconBgV2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1E1B4B"/>
            <stop offset="40%" stop-color="{COLOR_DEEP_SPACE}"/>
            <stop offset="100%" stop-color="#030712"/>
        </linearGradient>
    </defs>
    """

def get_variant_a_ultraminimal(cx=250, cy=220, scale=1.0, mono_color=None, is_light=False, id_prefix=""):
    fill = mono_color if mono_color else (COLOR_MONO_BLACK if is_light else COLOR_NEUTRAL_WHITE)
    arc_fill = mono_color if mono_color else (COLOR_COSMIC_PURPLE if is_light else COLOR_WARM_STARLIGHT)

    top_y = cy - 130 * scale
    bot_y = cy + 115 * scale
    v_w = 12 * scale

    left_x = cx - 110 * scale
    right_x = cx + 110 * scale
    h_h = 10 * scale

    arc_left_x = cx - 160 * scale
    arc_right_x = cx + 160 * scale
    arc_end_y = cy + 115 * scale
    arc_top_y = cy + 52 * scale
    arc_bot_y = cy + 64 * scale

    return f"""
    <g id="{id_prefix}variant_a_mark">
        <path d="M {arc_left_x},{arc_end_y} Q {cx},{arc_top_y} {arc_right_x},{arc_end_y} Q {cx},{arc_bot_y} {arc_left_x},{arc_end_y} Z" 
              fill="{arc_fill}" />
        <path d="M {cx},{top_y} L {cx + v_w},{cy} L {cx},{bot_y} L {cx - v_w},{cy} Z" 
              fill="{fill}" />
        <path d="M {left_x},{cy} L {cx},{cy - h_h} L {right_x},{cy} L {cx},{cy + h_h} Z" 
              fill="{fill}" />
    </g>
    """

def get_variant_b_enterprise(cx=250, cy=220, scale=1.0, mono_color=None, is_light=False, id_prefix=""):
    if mono_color:
        star_fill = mono_color
        arc_fill = mono_color
        core_element = ""
    else:
        star_fill = f"url(#{id_prefix}starGradientV2)"
        arc_fill = f"url(#{id_prefix}horizonLightGradientV2)" if is_light else f"url(#{id_prefix}horizonGradientV2)"
        core_element = f'<circle cx="{cx}" cy="{cy}" r="{55*scale}" fill="url(#{id_prefix}coreGlowV2)" opacity="0.85" />'

    top_y = cy - 140 * scale
    bot_y = cy + 125 * scale
    v_mid_w = 15 * scale

    left_x = cx - 120 * scale
    right_x = cx + 120 * scale
    h_mid_h = 12 * scale

    d_len = 55 * scale
    d_w = 6 * scale

    arc_left_x = cx - 175 * scale
    arc_right_x = cx + 175 * scale
    arc_end_y = cy + 120 * scale
    arc_top_y = cy + 48 * scale
    arc_bot_y = cy + 63 * scale

    return f"""
    <g id="{id_prefix}variant_b_mark">
        {core_element}
        <path d="M {arc_left_x},{arc_end_y} Q {cx},{arc_top_y} {arc_right_x},{arc_end_y} Q {cx},{arc_bot_y} {arc_left_x},{arc_end_y} Z" 
              fill="{arc_fill}" />
        <path d="M {cx - d_len},{cy - d_len} Q {cx},{cy} {cx - d_w},{cy - d_w} Q {cx},{cy} {cx - d_len},{cy - d_len} Z
                 M {cx + d_len},{cy - d_len} Q {cx},{cy} {cx + d_w},{cy - d_w} Q {cx},{cy} {cx + d_len},{cy - d_len} Z
                 M {cx - d_len},{cy + d_len} Q {cx},{cy} {cx - d_w},{cy + d_w} Q {cx},{cy} {cx - d_len},{cy + d_len} Z
                 M {cx + d_len},{cy + d_len} Q {cx},{cy} {cx + d_w},{cy + d_w} Q {cx},{cy} {cx + d_len},{cy + d_len} Z"
              fill="{star_fill}" opacity="0.65" />
        <path d="M {left_x},{cy} Q {cx},{cy - h_mid_h} {cx},{cy} Q {cx},{cy + h_mid_h} {left_x},{cy} Z
                 M {right_x},{cy} Q {cx},{cy - h_mid_h} {cx},{cy} Q {cx},{cy + h_mid_h} {right_x},{cy} Z"
              fill="{star_fill}" />
        <path d="M {cx},{top_y} Q {cx - v_mid_w},{cy} {cx},{cy} Q {cx + v_mid_w},{cy} {cx},{top_y} Z
                 M {cx},{bot_y} Q {cx - v_mid_w},{cy} {cx},{cy} Q {cx + v_mid_w},{cy} {cx},{bot_y} Z"
              fill="{star_fill}" />
    </g>
    """

def get_variant_c_flagship(cx=250, cy=220, scale=1.0, mono_color=None, is_light=False, id_prefix=""):
    if mono_color:
        star_fill = mono_color
        arc_fill = mono_color
        core_element = ""
    else:
        star_fill = f"url(#{id_prefix}starGradientV2)"
        arc_fill = f"url(#{id_prefix}horizonLightGradientV2)" if is_light else f"url(#{id_prefix}horizonGradientV2)"
        core_element = f'<circle cx="{cx}" cy="{cy}" r="{75*scale}" fill="url(#{id_prefix}coreGlowV2)" opacity="0.95" />'

    top_y = cy - 148 * scale
    bot_y = cy + 132 * scale
    v_mid_w = 16.5 * scale

    left_x = cx - 128 * scale
    right_x = cx + 128 * scale
    h_mid_h = 13.5 * scale

    d_len = 62 * scale
    d_w = 7.5 * scale

    arc_left_x = cx - 185 * scale
    arc_right_x = cx + 185 * scale
    arc_end_y = cy + 122 * scale
    arc_top_y = cy + 46 * scale
    arc_bot_y = cy + 63 * scale

    return f"""
    <g id="{id_prefix}variant_c_flagship_mark">
        {core_element}
        <path d="M {arc_left_x},{arc_end_y} Q {cx},{arc_top_y} {arc_right_x},{arc_end_y} Q {cx},{arc_bot_y} {arc_left_x},{arc_end_y} Z" 
              fill="{arc_fill}" />
        <path d="M {cx - d_len},{cy - d_len} Q {cx},{cy} {cx - d_w},{cy - d_w} Q {cx},{cy} {cx - d_len},{cy - d_len} Z
                 M {cx + d_len},{cy - d_len} Q {cx},{cy} {cx + d_w},{cy - d_w} Q {cx},{cy} {cx + d_len},{cy - d_len} Z
                 M {cx - d_len},{cy + d_len} Q {cx},{cy} {cx - d_w},{cy + d_w} Q {cx},{cy} {cx - d_len},{cy + d_len} Z
                 M {cx + d_len},{cy + d_len} Q {cx},{cy} {cx + d_w},{cy + d_w} Q {cx},{cy} {cx + d_len},{cy + d_len} Z"
              fill="{star_fill}" opacity="0.75" />
        <path d="M {left_x},{cy} Q {cx},{cy - h_mid_h} {cx},{cy} Q {cx},{cy + h_mid_h} {left_x},{cy} Z
                 M {right_x},{cy} Q {cx},{cy - h_mid_h} {cx},{cy} Q {cx},{cy + h_mid_h} {right_x},{cy} Z"
              fill="{star_fill}" />
        <path d="M {cx},{top_y} Q {cx - v_mid_w},{cy} {cx},{cy} Q {cx + v_mid_w},{cy} {cx},{top_y} Z
                 M {cx},{bot_y} Q {cx - v_mid_w},{cy} {cx},{cy} Q {cx + v_mid_w},{cy} {cx},{bot_y} Z"
              fill="{star_fill}" />
        <polygon points="{cx},{cy - 13*scale} {cx + 13*scale},{cy} {cx},{cy + 13*scale} {cx - 13*scale},{cy}" 
                 fill="{COLOR_NEUTRAL_WHITE if (not mono_color and not is_light) else (COLOR_MONO_BLACK if is_light and not mono_color else mono_color)}" opacity="0.98"/>
    </g>
    """

def get_wordmark_vector_v2(x=0, y=0, height=80, fill_color=COLOR_NEUTRAL_WHITE, show_subhead=True, id_prefix=""):
    s = height / 100.0
    sw = 13.5 * s

    a1_x = x
    a1_path = f"""
        <path d="M {a1_x + 40*s},{y} 
                 L {a1_x + 4*s},{y + 100*s} 
                 L {a1_x + 4*s + sw*1.15},{y + 100*s} 
                 L {a1_x + 40*s},{y + 20*s} 
                 L {a1_x + 76*s - sw*1.15},{y + 100*s} 
                 L {a1_x + 76*s},{y + 100*s} Z
                 M {a1_x + 19.5*s},{y + 61.8*s} 
                 L {a1_x + 60.5*s},{y + 61.8*s} 
                 L {a1_x + 60.5*s},{y + 61.8*s + sw} 
                 L {a1_x + 19.5*s},{y + 61.8*s + sw} Z"
              fill="{fill_color}" />
    """

    s_x = a1_x + (76 + 48) * s
    s_path = f"""
        <path d="M {s_x + 66*s},{y + 22*s} 
                 C {s_x + 56*s},{y + 4*s} {s_x + 14*s},{y + 4*s} {s_x + 14*s},{y + 32*s} 
                 C {s_x + 14*s},{y + 52*s} {s_x + 69*s},{y + 48*s} {s_x + 69*s},{y + 73*s} 
                 C {s_x + 69*s},{y + 98*s} {s_x + 18*s},{y + 98*s} {s_x + 6*s},{y + 78*s} 
                 L {s_x + 6*s + sw*1.05},{y + 74*s} 
                 C {s_x + 16*s},{y + 86*s} {s_x + 55*s},{y + 86*s} {s_x + 55*s},{y + 73*s} 
                 C {s_x + 55*s},{y + 54*s} {s_x + 0.5*s},{y + 56*s} {s_x + 0.5*s},{y + 32*s} 
                 C {s_x + 0.5*s},{y + 7*s} {s_x + 50*s},{y + 7*s} {s_x + 66*s},{y + 22*s} Z"
              fill="{fill_color}" />
    """

    t_x = s_x + (69 + 48) * s
    t_path = f"""
        <path d="M {t_x},{y} 
                 L {t_x + 72*s},{y} 
                 L {t_x + 72*s},{y + sw} 
                 L {t_x + 36*s + sw/2},{y + sw} 
                 L {t_x + 36*s + sw/2},{y + 100*s} 
                 L {t_x + 36*s - sw/2},{y + 100*s} 
                 L {t_x + 36*s - sw/2},{y + sw} 
                 L {t_x},{y + sw} Z"
              fill="{fill_color}" />
    """

    r_x = t_x + (72 + 48) * s
    r_path = f"""
        <path d="M {r_x},{y} 
                 L {r_x + 46*s},{y} 
                 C {r_x + 73*s},{y} {r_x + 73*s},{y + 50*s} {r_x + 46*s},{y + 50*s} 
                 L {r_x + sw},{y + 50*s} 
                 L {r_x + sw},{y + 100*s} 
                 L {r_x},{y + 100*s} Z
                 M {r_x + sw},{y + sw} 
                 L {r_x + 44*s},{y + sw} 
                 C {r_x + 59*s},{y + sw} {r_x + 59*s},{y + 50*s - sw} {r_x + 44*s},{y + 50*s - sw} 
                 L {r_x + sw},{y + 50*s - sw} Z
                 M {r_x + 33*s},{y + 48*s} 
                 L {r_x + 70*s},{y + 100*s} 
                 L {r_x + 70*s - sw*1.25},{y + 100*s} 
                 L {r_x + 23*s},{y + 48*s} Z"
              fill="{fill_color}" />
    """

    a2_x = r_x + (73 + 48) * s
    a2_path = f"""
        <path d="M {a2_x + 40*s},{y} 
                 L {a2_x + 4*s},{y + 100*s} 
                 L {a2_x + 4*s + sw*1.15},{y + 100*s} 
                 L {a2_x + 40*s},{y + 20*s} 
                 L {a2_x + 76*s - sw*1.15},{y + 100*s} 
                 L {a2_x + 76*s},{y + 100*s} Z
                 M {a2_x + 19.5*s},{y + 61.8*s} 
                 L {a2_x + 60.5*s},{y + 61.8*s} 
                 L {a2_x + 60.5*s},{y + 61.8*s + sw} 
                 L {a2_x + 19.5*s},{y + 61.8*s + sw} Z"
              fill="{fill_color}" />
    """

    subhead_path = ""
    if show_subhead:
        subhead_y = y + 132 * s
        subhead_color = COLOR_MUTED_GRAY if fill_color == COLOR_NEUTRAL_WHITE else ("#475569" if fill_color == COLOR_MONO_BLACK else fill_color)
        subhead_path = f"""
            <text x="{x + 258*s}" y="{subhead_y}" font-family="system-ui, -apple-system, 'Geist', 'Satoshi', sans-serif" 
                  font-size="{18.5*s}px" font-weight="600" letter-spacing="{0.44*height}px" fill="{subhead_color}" text-anchor="middle">
                AI OPERATING SYSTEM
            </text>
        """

    return f"""
    <g id="{id_prefix}wordmark_v2_group">
        {a1_path}
        {s_path}
        {t_path}
        {r_path}
        {a2_path}
        {subhead_path}
    </g>
    """

# WRITE ALL V2 SVG FILES

svg_files = {}

# Three Directional Variants (Logomark Standalone)
svg_files["astra-variant-a-ultraminimal.svg"] = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
    {get_v2_gradients_defs("va_")}
    <rect width="100%" height="100%" fill="{COLOR_DEEP_SPACE}"/>
    {get_variant_a_ultraminimal(cx=250, cy=240, scale=1.1, id_prefix="va_")}
</svg>"""

svg_files["astra-variant-b-enterprise.svg"] = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
    {get_v2_gradients_defs("vb_")}
    <rect width="100%" height="100%" fill="{COLOR_DEEP_SPACE}"/>
    {get_variant_b_enterprise(cx=250, cy=240, scale=1.1, id_prefix="vb_")}
</svg>"""

svg_files["astra-variant-c-flagship.svg"] = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
    {get_v2_gradients_defs("vc_")}
    <rect width="100%" height="100%" fill="{COLOR_DEEP_SPACE}"/>
    {get_variant_c_flagship(cx=250, cy=240, scale=1.1, id_prefix="vc_")}
</svg>"""

# Flagship Suite (Primary Dark, Light, Stacked, Mono)
svg_files["astra-logo-primary-dark-v2.svg"] = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 450" width="100%" height="100%">
    {get_v2_gradients_defs("pri_d2_")}
    <rect width="100%" height="100%" fill="{COLOR_DEEP_SPACE}"/>
    {get_variant_c_flagship(cx=230, cy=220, scale=0.88, id_prefix="pri_d2_")}
    {get_wordmark_vector_v2(x=490, y=175, height=75, fill_color=COLOR_NEUTRAL_WHITE, id_prefix="pri_d2_")}
</svg>"""

svg_files["astra-logo-primary-light-v2.svg"] = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 450" width="100%" height="100%">
    {get_v2_gradients_defs("pri_l2_")}
    <rect width="100%" height="100%" fill="{COLOR_LIGHT_BG}"/>
    {get_variant_c_flagship(cx=230, cy=220, scale=0.88, is_light=True, id_prefix="pri_l2_")}
    {get_wordmark_vector_v2(x=490, y=175, height=75, fill_color=COLOR_MONO_BLACK, id_prefix="pri_l2_")}
</svg>"""

svg_files["astra-logo-stacked-v2.svg"] = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 700" width="100%" height="100%">
    {get_v2_gradients_defs("stk2_")}
    <rect width="100%" height="100%" fill="{COLOR_DEEP_SPACE}"/>
    {get_variant_c_flagship(cx=400, cy=230, scale=1.0, id_prefix="stk2_")}
    {get_wordmark_vector_v2(x=185, y=440, height=70, fill_color=COLOR_NEUTRAL_WHITE, id_prefix="stk2_")}
</svg>"""

svg_files["astra-logomark-v2.svg"] = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
    {get_v2_gradients_defs("lm2_")}
    <rect width="100%" height="100%" fill="{COLOR_DEEP_SPACE}"/>
    {get_variant_c_flagship(cx=250, cy=240, scale=1.1, id_prefix="lm2_")}
</svg>"""

svg_files["astra-wordmark-v2.svg"] = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 300" width="100%" height="100%">
    <rect width="100%" height="100%" fill="{COLOR_DEEP_SPACE}"/>
    {get_wordmark_vector_v2(x=148, y=95, height=85, fill_color=COLOR_NEUTRAL_WHITE, id_prefix="wm2_")}
</svg>"""

svg_files["astra-logo-mono-black-v2.svg"] = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 450" width="100%" height="100%">
    <rect width="100%" height="100%" fill="#FFFFFF"/>
    {get_variant_c_flagship(cx=230, cy=220, scale=0.88, mono_color=COLOR_MONO_BLACK, id_prefix="mb2_")}
    {get_wordmark_vector_v2(x=490, y=175, height=75, fill_color=COLOR_MONO_BLACK, id_prefix="mb2_")}
</svg>"""

svg_files["astra-logo-mono-white-v2.svg"] = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 450" width="100%" height="100%">
    <rect width="100%" height="100%" fill="{COLOR_MONO_BLACK}"/>
    {get_variant_c_flagship(cx=230, cy=220, scale=0.88, mono_color=COLOR_NEUTRAL_WHITE, id_prefix="mw2_")}
    {get_wordmark_vector_v2(x=490, y=175, height=75, fill_color=COLOR_NEUTRAL_WHITE, id_prefix="mw2_")}
</svg>"""

svg_files["astra-appicon-rounded-v2.svg"] = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="100%" height="100%">
    {get_v2_gradients_defs("ic2_")}
    <rect width="1024" height="1024" rx="224" ry="224" fill="url(#ic2_appIconBgV2)"/>
    <rect width="1020" height="1020" x="2" y="2" rx="222" ry="222" fill="none" stroke="{COLOR_COSMIC_PURPLE}" stroke-opacity="0.35" stroke-width="4"/>
    {get_variant_c_flagship(cx=512, cy=490, scale=2.3, id_prefix="ic2_")}
</svg>"""

svg_files["astra-appicon-square-v2.svg"] = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="100%" height="100%">
    {get_v2_gradients_defs("ics2_")}
    <rect width="1024" height="1024" fill="url(#ics2_appIconBgV2)"/>
    {get_variant_c_flagship(cx=512, cy=490, scale=2.3, id_prefix="ics2_")}
</svg>"""

svg_files["astra-favicon-v2.svg"] = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
    {get_v2_gradients_defs("fav2_")}
    <rect width="64" height="64" rx="14" fill="{COLOR_DEEP_SPACE}"/>
    {get_variant_c_flagship(cx=32, cy=30, scale=0.145, id_prefix="fav2_")}
</svg>"""

# Save all vectors
for filename, content in svg_files.items():
    filepath = os.path.join(VECTORS_DIR, filename)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Generated Vector: {filepath}")

# -------------------------------------------------------------
# 1. THREE VARIATIONS COMPARISON BOARD (2000 x 1400)
# -------------------------------------------------------------
three_vars_board_svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 1400" width="2000" height="1400">
    {get_v2_gradients_defs("b3v_")}
    <rect width="2000" height="1400" fill="#070A14"/>
    
    <!-- Board Header -->
    <rect width="2000" height="160" fill="{COLOR_DEEP_SPACE}"/>
    <line x1="0" y1="160" x2="2000" y2="160" stroke="#1E293B" stroke-width="2"/>
    <text x="80" y="80" font-family="system-ui, sans-serif" font-size="38px" font-weight="800" fill="#FFFFFF" letter-spacing="3px">ASTRA REFINED DIRECTIONS</text>
    <text x="80" y="125" font-family="system-ui, sans-serif" font-size="20px" font-weight="500" fill="{COLOR_COSMIC_PURPLE}">Three Siblings — Optical &amp; Identity Exploration</text>

    <!-- Variation A -->
    <g transform="translate(80, 220)">
        <rect width="570" height="1060" rx="20" fill="{COLOR_DEEP_SPACE}" stroke="#1E293B" stroke-width="2"/>
        <text x="40" y="60" font-family="system-ui, sans-serif" font-size="24px" font-weight="700" fill="#FFFFFF">VARIATION A</text>
        <text x="40" y="90" font-family="system-ui, sans-serif" font-size="16px" font-weight="600" fill="{COLOR_WARM_STARLIGHT}">Ultra Minimal</text>
        
        <rect x="40" y="120" width="490" height="380" rx="14" fill="#050814"/>
        {get_variant_a_ultraminimal(cx=285, cy=310, scale=1.0, id_prefix="b3v_a_")}
        
        <text x="40" y="540" font-family="system-ui, sans-serif" font-size="18px" font-weight="700" fill="#FFFFFF">DESIGN CHARACTERISTICS</text>
        <text x="40" y="575" font-family="system-ui, sans-serif" font-size="14px" fill="{COLOR_MUTED_GRAY}">• Razor-sharp primitive vector strokes</text>
        <text x="40" y="605" font-family="system-ui, sans-serif" font-size="14px" fill="{COLOR_MUTED_GRAY}">• Maximum silhouette recognition at 16×16</text>
        <text x="40" y="635" font-family="system-ui, sans-serif" font-size="14px" fill="{COLOR_MUTED_GRAY}">• Zero gradient dependency for high contrast</text>
        <text x="40" y="665" font-family="system-ui, sans-serif" font-size="14px" fill="{COLOR_MUTED_GRAY}">• Single-taper optical horizon sweep</text>

        <rect x="40" y="710" width="490" height="300" rx="12" fill="#0A0F1D"/>
        <text x="60" y="745" font-family="system-ui, sans-serif" font-size="15px" font-weight="700" fill="{COLOR_COSMIC_PURPLE}">REASONING &amp; SCALABILITY</text>
        <text x="60" y="780" font-family="system-ui, sans-serif" font-size="13px" fill="{COLOR_MUTED_GRAY}">Designed for environments requiring zero clutter.</text>
        <text x="60" y="805" font-family="system-ui, sans-serif" font-size="13px" fill="{COLOR_MUTED_GRAY}">Performs flawlessly on dark terminals, e-ink</text>
        <text x="60" y="830" font-family="system-ui, sans-serif" font-size="13px" fill="{COLOR_MUTED_GRAY}">displays, micro favicons, and low-res screens.</text>
    </g>

    <!-- Variation B -->
    <g transform="translate(715, 220)">
        <rect width="570" height="1060" rx="20" fill="{COLOR_DEEP_SPACE}" stroke="#1E293B" stroke-width="2"/>
        <text x="40" y="60" font-family="system-ui, sans-serif" font-size="24px" font-weight="700" fill="#FFFFFF">VARIATION B</text>
        <text x="40" y="90" font-family="system-ui, sans-serif" font-size="16px" font-weight="600" fill="{COLOR_COSMIC_PURPLE}">Enterprise</text>
        
        <rect x="40" y="120" width="490" height="380" rx="14" fill="#050814"/>
        {get_variant_b_enterprise(cx=285, cy=310, scale=1.0, id_prefix="b3v_b_")}
        
        <text x="40" y="540" font-family="system-ui, sans-serif" font-size="18px" font-weight="700" fill="#FFFFFF">DESIGN CHARACTERISTICS</text>
        <text x="40" y="575" font-family="system-ui, sans-serif" font-size="14px" fill="{COLOR_MUTED_GRAY}">• Golden Ratio (1 : 1.618) mathematical proportion</text>
        <text x="40" y="605" font-family="system-ui, sans-serif" font-size="14px" fill="{COLOR_MUTED_GRAY}">• Authoritative corporate visual weight</text>
        <text x="40" y="635" font-family="system-ui, sans-serif" font-size="14px" fill="{COLOR_MUTED_GRAY}">• Smooth quadratic horizon curvature</text>
        <text x="40" y="665" font-family="system-ui, sans-serif" font-size="14px" fill="{COLOR_MUTED_GRAY}">• Balanced core optical junction</text>

        <rect x="40" y="710" width="490" height="300" rx="12" fill="#0A0F1D"/>
        <text x="60" y="745" font-family="system-ui, sans-serif" font-size="15px" font-weight="700" fill="{COLOR_COSMIC_PURPLE}">REASONING &amp; SCALABILITY</text>
        <text x="60" y="780" font-family="system-ui, sans-serif" font-size="13px" fill="{COLOR_MUTED_GRAY}">Tailored for enterprise software OS platforms.</text>
        <text x="60" y="805" font-family="system-ui, sans-serif" font-size="13px" fill="{COLOR_MUTED_GRAY}">Communicates trust, stability, reliability, and</text>
        <text x="60" y="830" font-family="system-ui, sans-serif" font-size="13px" fill="{COLOR_MUTED_GRAY}">institutional authority for B2B deployments.</text>
    </g>

    <!-- Variation C (Flagship) -->
    <g transform="translate(1350, 220)">
        <rect width="570" height="1060" rx="20" fill="{COLOR_DEEP_SPACE}" stroke="{COLOR_COSMIC_PURPLE}" stroke-width="3"/>
        <rect x="30" y="20" width="160" height="30" rx="6" fill="{COLOR_COSMIC_PURPLE}"/>
        <text x="110" y="41" font-family="system-ui, sans-serif" font-size="12px" font-weight="800" fill="#FFFFFF" text-anchor="middle">FLAGSHIP IDENTITY</text>

        <text x="40" y="85" font-family="system-ui, sans-serif" font-size="24px" font-weight="700" fill="#FFFFFF">VARIATION C</text>
        <text x="40" y="110" font-family="system-ui, sans-serif" font-size="16px" font-weight="600" fill="{COLOR_WARM_STARLIGHT}">Definitive Flagship</text>
        
        <rect x="40" y="130" width="490" height="370" rx="14" fill="#050814"/>
        {get_variant_c_flagship(cx=285, cy=315, scale=1.05, id_prefix="b3v_c_")}
        
        <text x="40" y="540" font-family="system-ui, sans-serif" font-size="18px" font-weight="700" fill="#FFFFFF">DESIGN CHARACTERISTICS</text>
        <text x="40" y="575" font-family="system-ui, sans-serif" font-size="14px" fill="{COLOR_MUTED_GRAY}">• Hidden 'A' negative space chevron integration</text>
        <text x="40" y="605" font-family="system-ui, sans-serif" font-size="14px" fill="{COLOR_MUTED_GRAY}">• Radiant starlight core aura &amp; micro diamond</text>
        <text x="40" y="635" font-family="system-ui, sans-serif" font-size="14px" fill="{COLOR_MUTED_GRAY}">• Panoramic planetary horizon sweep</text>
        <text x="40" y="665" font-family="system-ui, sans-serif" font-size="14px" fill="{COLOR_MUTED_GRAY}">• Supreme emotional resonance &amp; elegance</text>

        <rect x="40" y="710" width="490" height="300" rx="12" fill="#0A0F1D"/>
        <text x="60" y="745" font-family="system-ui, sans-serif" font-size="15px" font-weight="700" fill="{COLOR_WARM_STARLIGHT}">RECOMMENDED BRAND DIRECTION</text>
        <text x="60" y="780" font-family="system-ui, sans-serif" font-size="13px" fill="{COLOR_MUTED_GRAY}">The definitive identity for ASTRA. Merges subtle</text>
        <text x="60" y="805" font-family="system-ui, sans-serif" font-size="13px" fill="{COLOR_MUTED_GRAY}">hidden intelligence with unforgettable visual</text>
        <text x="60" y="830" font-family="system-ui, sans-serif" font-size="13px" fill="{COLOR_MUTED_GRAY}">impact. Built to represent a billion-dollar brand.</text>
    </g>
</svg>"""

with open(os.path.join(BOARDS_DIR, "astra-three-variations-board.svg"), "w", encoding="utf-8") as f:
    f.write(three_vars_board_svg)

# -------------------------------------------------------------
# 2. MOTION STORYBOARD BOARD (2000 x 1200)
# -------------------------------------------------------------
motion_board_svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 1200" width="2000" height="1200">
    {get_v2_gradients_defs("mot_")}
    <rect width="2000" height="1200" fill="#070A14"/>
    
    <!-- Board Header -->
    <rect width="2000" height="160" fill="{COLOR_DEEP_SPACE}"/>
    <line x1="0" y1="160" x2="2000" y2="160" stroke="#1E293B" stroke-width="2"/>
    <text x="80" y="80" font-family="system-ui, sans-serif" font-size="38px" font-weight="800" fill="#FFFFFF" letter-spacing="3px">ASTRA MOTION IDENTITY STORYBOARD</text>
    <text x="80" y="125" font-family="system-ui, sans-serif" font-size="20px" font-weight="500" fill="{COLOR_COSMIC_PURPLE}">6-Frame Dynamic Ignition &amp; Reveal Animation Concept</text>

    <!-- Row 1: Frames 1, 2, 3 -->
    <!-- Frame 1 -->
    <g transform="translate(80, 220)">
        <rect width="570" height="420" rx="16" fill="{COLOR_DEEP_SPACE}" stroke="#1E293B" stroke-width="2"/>
        <text x="30" y="45" font-family="system-ui, sans-serif" font-size="16px" font-weight="700" fill="{COLOR_WARM_STARLIGHT}">FRAME 01 — IGNITION (0.0s)</text>
        <line x1="120" y1="230" x2="450" y2="230" stroke="{COLOR_COSMIC_PURPLE}" stroke-width="3" opacity="0.4"/>
        <circle cx="285" cy="230" r="4" fill="#FFFFFF"/>
        <text x="30" y="380" font-family="system-ui, sans-serif" font-size="14px" fill="{COLOR_MUTED_GRAY}">Quiescent horizon line with central quantum starlight spark.</text>
    </g>

    <!-- Frame 2 -->
    <g transform="translate(715, 220)">
        <rect width="570" height="420" rx="16" fill="{COLOR_DEEP_SPACE}" stroke="#1E293B" stroke-width="2"/>
        <text x="30" y="45" font-family="system-ui, sans-serif" font-size="16px" font-weight="700" fill="{COLOR_WARM_STARLIGHT}">FRAME 02 — CURVATURE (0.4s)</text>
        <path d="M 125,260 Q 285,190 445,260 Q 285,202 125,260 Z" fill="url(#mot_horizonGradientV2)" />
        <circle cx="285" cy="196" r="10" fill="#FFFFFF" opacity="0.8"/>
        <text x="30" y="380" font-family="system-ui, sans-serif" font-size="14px" fill="{COLOR_MUTED_GRAY}">Horizon arc curves upward as starlight point elevates.</text>
    </g>

    <!-- Frame 3 -->
    <g transform="translate(1350, 220)">
        <rect width="570" height="420" rx="16" fill="{COLOR_DEEP_SPACE}" stroke="#1E293B" stroke-width="2"/>
        <text x="30" y="45" font-family="system-ui, sans-serif" font-size="16px" font-weight="700" fill="{COLOR_WARM_STARLIGHT}">FRAME 03 — RAY EMERGENCE (0.8s)</text>
        <path d="M 125,260 Q 285,190 445,260 Q 285,202 125,260 Z" fill="url(#mot_horizonGradientV2)" />
        <line x1="285" y1="110" x2="285" y2="250" stroke="#FFFFFF" stroke-width="6"/>
        <line x1="215" y1="180" x2="355" y2="180" stroke="#FFFFFF" stroke-width="5"/>
        <text x="30" y="380" font-family="system-ui, sans-serif" font-size="14px" fill="{COLOR_MUTED_GRAY}">Vertical &amp; horizontal flares expand outward along grid axes.</text>
    </g>

    <!-- Row 2: Frames 4, 5, 6 -->
    <!-- Frame 4 -->
    <g transform="translate(80, 680)">
        <rect width="570" height="420" rx="16" fill="{COLOR_DEEP_SPACE}" stroke="#1E293B" stroke-width="2"/>
        <text x="30" y="45" font-family="system-ui, sans-serif" font-size="16px" font-weight="700" fill="{COLOR_WARM_STARLIGHT}">FRAME 04 — FLARE RADIANCE (1.2s)</text>
        {get_variant_c_flagship(cx=285, cy=200, scale=0.85, id_prefix="mot_f4_")}
        <text x="30" y="380" font-family="system-ui, sans-serif" font-size="14px" fill="{COLOR_MUTED_GRAY}">Diagonal rays &amp; radiant core glow lock into golden geometry.</text>
    </g>

    <!-- Frame 5 -->
    <g transform="translate(715, 680)">
        <rect width="570" height="420" rx="16" fill="{COLOR_DEEP_SPACE}" stroke="#1E293B" stroke-width="2"/>
        <text x="30" y="45" font-family="system-ui, sans-serif" font-size="16px" font-weight="700" fill="{COLOR_WARM_STARLIGHT}">FRAME 05 — WORDMARK REVEAL (1.6s)</text>
        {get_variant_c_flagship(cx=285, cy=180, scale=0.75, id_prefix="mot_f5_")}
        <g transform="translate(0, 40)">
            {get_wordmark_vector_v2(x=95, y=250, height=40, fill_color=COLOR_NEUTRAL_WHITE, show_subhead=False, id_prefix="mot_f5_")}
        </g>
        <text x="30" y="380" font-family="system-ui, sans-serif" font-size="14px" fill="{COLOR_MUTED_GRAY}">ASTRA proprietary wordmark fades in with tracking expansion.</text>
    </g>

    <!-- Frame 6 -->
    <g transform="translate(1350, 680)">
        <rect width="570" height="420" rx="16" fill="{COLOR_DEEP_SPACE}" stroke="{COLOR_COSMIC_PURPLE}" stroke-width="2"/>
        <text x="30" y="45" font-family="system-ui, sans-serif" font-size="16px" font-weight="700" fill="{COLOR_WARM_STARLIGHT}">FRAME 06 — FLAGSHIP LOGO (2.0s)</text>
        <g transform="translate(-10, 30)">
            {get_variant_c_flagship(cx=180, cy=190, scale=0.72, id_prefix="mot_f6_")}
            {get_wordmark_vector_v2(x=380, y=155, height=52, fill_color=COLOR_NEUTRAL_WHITE, id_prefix="mot_f6_")}
        </g>
        <text x="30" y="380" font-family="system-ui, sans-serif" font-size="14px" fill="{COLOR_MUTED_GRAY}">Final lockup settles smoothly into enterprise header state.</text>
    </g>
</svg>"""

with open(os.path.join(BOARDS_DIR, "astra-motion-storyboard.svg"), "w", encoding="utf-8") as f:
    f.write(motion_board_svg)

# MASTER BRAND GUIDELINES V2 BOARD (2000 x 3200)
brand_board_v2_svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 3200" width="2000" height="3200">
    {get_v2_gradients_defs("bb2_")}
    
    <rect width="2000" height="3200" fill="#070A14"/>
    
    <!-- Top Header -->
    <rect width="2000" height="180" fill="#0B1020"/>
    <line x1="0" y1="180" x2="2000" y2="180" stroke="#1E293B" stroke-width="2"/>
    <text x="80" y="85" font-family="system-ui, sans-serif" font-size="42px" font-weight="800" fill="#FFFFFF" letter-spacing="4px">ASTRA BRAND SYSTEM V2</text>
    <text x="80" y="130" font-family="system-ui, sans-serif" font-size="24px" font-weight="500" fill="{COLOR_COSMIC_PURPLE}" letter-spacing="1px">Executive Creative Direction &amp; Optical Refinement</text>

    <text x="1920" y="90" font-family="system-ui, sans-serif" font-size="20px" font-weight="400" fill="{COLOR_MUTED_GRAY}" text-anchor="end">Horizon Rise Concept — Definitive Flagship Identity</text>
    <text x="1920" y="125" font-family="system-ui, sans-serif" font-size="20px" font-weight="400" fill="{COLOR_MUTED_GRAY}" text-anchor="end">Engineered for timeless enterprise software platforms.</text>

    <!-- SECTION 1: PRIMARY LOGO LOCKUPS -->
    <text x="80" y="240" font-family="system-ui, sans-serif" font-size="22px" font-weight="700" fill="#FFFFFF" letter-spacing="2px">1. PRIMARY HORIZONTAL LOGO LOCKUP (FLAGSHIP V2)</text>
    <rect x="80" y="260" width="880" height="340" rx="20" fill="{COLOR_DEEP_SPACE}" stroke="#1E293B" stroke-width="2"/>
    <g transform="translate(30, 40)">
        {get_variant_c_flagship(cx=220, cy=220, scale=0.75, id_prefix="bb2_p_d_")}
        {get_wordmark_vector_v2(x=440, y=182, height=65, fill_color=COLOR_NEUTRAL_WHITE, id_prefix="bb2_p_d_")}
    </g>
    <text x="520" y="575" font-family="system-ui, sans-serif" font-size="16px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">Primary Dark Theme (Deep Space Navy)</text>

    <rect x="1040" y="260" width="880" height="340" rx="20" fill="{COLOR_LIGHT_BG}" stroke="#E2E8F0" stroke-width="2"/>
    <g transform="translate(990, 40)">
        {get_variant_c_flagship(cx=220, cy=220, scale=0.75, is_light=True, id_prefix="bb2_p_l_")}
        {get_wordmark_vector_v2(x=440, y=182, height=65, fill_color=COLOR_MONO_BLACK, id_prefix="bb2_p_l_")}
    </g>
    <text x="1480" y="575" font-family="system-ui, sans-serif" font-size="16px" fill="#64748B" text-anchor="middle">Primary Light Theme (Starlight White)</text>

    <!-- SECTION 2: STACKED & WORDMARK -->
    <text x="80" y="650" font-family="system-ui, sans-serif" font-size="22px" font-weight="700" fill="#FFFFFF" letter-spacing="2px">2. STACKED LOGO &amp; PROPRIETARY WORDMARK</text>
    <rect x="80" y="670" width="880" height="420" rx="20" fill="{COLOR_DEEP_SPACE}" stroke="#1E293B" stroke-width="2"/>
    <g transform="translate(120, 680)">
        {get_variant_c_flagship(cx=400, cy=150, scale=0.8, id_prefix="bb2_s_d_")}
        {get_wordmark_vector_v2(x=185, y=320, height=55, fill_color=COLOR_NEUTRAL_WHITE, id_prefix="bb2_s_d_")}
    </g>
    <text x="520" y="1060" font-family="system-ui, sans-serif" font-size="16px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">Stacked Centered Lockup</text>

    <rect x="1040" y="670" width="880" height="420" rx="20" fill="{COLOR_DEEP_SPACE}" stroke="#1E293B" stroke-width="2"/>
    <g transform="translate(1080, 780)">
        {get_wordmark_vector_v2(x=100, y=80, height=90, fill_color=COLOR_NEUTRAL_WHITE, id_prefix="bb2_wm_")}
    </g>
    <text x="1480" y="1060" font-family="system-ui, sans-serif" font-size="16px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">Proprietary Vector Wordmark (Golden Ratio Crossbars)</text>

    <!-- SECTION 3: APP ICON & FAVICON SUITE -->
    <text x="80" y="1140" font-family="system-ui, sans-serif" font-size="22px" font-weight="700" fill="#FFFFFF" letter-spacing="2px">3. APP ICON &amp; FAVICON SCALABILITY MATRIX</text>
    <g transform="translate(80, 1160)">
        <!-- App Icon -->
        <rect x="0" y="0" width="270" height="270" rx="58" ry="58" fill="url(#bb2_appIconBgV2)" stroke="{COLOR_COSMIC_PURPLE}" stroke-width="3" stroke-opacity="0.4"/>
        {get_variant_c_flagship(cx=135, cy=130, scale=0.65, id_prefix="bb2_app_")}
        <text x="135" y="300" font-family="system-ui, sans-serif" font-size="14px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">1024×1024 App Icon</text>

        <!-- 64x64 -->
        <rect x="340" y="80" width="110" height="110" rx="20" fill="{COLOR_DEEP_SPACE}" stroke="#1E293B"/>
        {get_variant_c_flagship(cx=395, cy=134, scale=0.26, id_prefix="bb2_fav64_")}
        <text x="395" y="215" font-family="system-ui, sans-serif" font-size="14px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">64×64 Favicon</text>

        <!-- 48x48 -->
        <rect x="510" y="90" width="90" height="90" rx="16" fill="{COLOR_DEEP_SPACE}" stroke="#1E293B"/>
        {get_variant_c_flagship(cx=555, cy=134, scale=0.21, id_prefix="bb2_fav48_")}
        <text x="555" y="205" font-family="system-ui, sans-serif" font-size="14px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">48×48</text>

        <!-- 32x32 -->
        <rect x="650" y="100" width="70" height="70" rx="12" fill="{COLOR_DEEP_SPACE}" stroke="#1E293B"/>
        {get_variant_c_flagship(cx=685, cy=134, scale=0.16, id_prefix="bb2_fav32_")}
        <text x="685" y="195" font-family="system-ui, sans-serif" font-size="14px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">32×32</text>

        <!-- 16x16 -->
        <rect x="770" y="110" width="50" height="50" rx="8" fill="{COLOR_DEEP_SPACE}" stroke="#1E293B"/>
        {get_variant_c_flagship(cx=795, cy=134, scale=0.11, id_prefix="bb2_fav16_")}
        <text x="795" y="185" font-family="system-ui, sans-serif" font-size="14px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">16×16 Micro</text>
    </g>

    <!-- SECTION 4: MONOCHROME & HIGH CONTRAST -->
    <text x="1040" y="1140" font-family="system-ui, sans-serif" font-size="22px" font-weight="700" fill="#FFFFFF" letter-spacing="2px">4. MONOCHROME &amp; EMBOSSED PERFORMANCE</text>
    <g transform="translate(1040, 1160)">
        <rect x="0" y="0" width="200" height="140" rx="14" fill="{COLOR_LIGHT_BG}"/>
        {get_variant_c_flagship(cx=100, cy=70, scale=0.32, mono_color=COLOR_MONO_BLACK, id_prefix="bb2_m1_")}
        <text x="100" y="165" font-family="system-ui, sans-serif" font-size="13px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">Black on Light</text>

        <rect x="225" y="0" width="200" height="140" rx="14" fill="{COLOR_DEEP_SPACE}"/>
        {get_variant_c_flagship(cx=325, cy=70, scale=0.32, mono_color=COLOR_NEUTRAL_WHITE, id_prefix="bb2_m2_")}
        <text x="325" y="165" font-family="system-ui, sans-serif" font-size="13px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">White on Dark</text>

        <rect x="450" y="0" width="200" height="140" rx="14" fill="#FFFFFF"/>
        {get_variant_c_flagship(cx=550, cy=70, scale=0.32, mono_color=COLOR_MONO_BLACK, id_prefix="bb2_m3_")}
        <text x="550" y="165" font-family="system-ui, sans-serif" font-size="13px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">Pure Black</text>

        <rect x="675" y="0" width="200" height="140" rx="14" fill="#000000"/>
        {get_variant_c_flagship(cx=775, cy=70, scale=0.32, mono_color=COLOR_NEUTRAL_WHITE, id_prefix="bb2_m4_")}
        <text x="775" y="165" font-family="system-ui, sans-serif" font-size="13px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">Pure White</text>
    </g>

    <!-- SECTION 5: COLOR PALETTE & TYPOGRAPHY SPECS -->
    <text x="80" y="1530" font-family="system-ui, sans-serif" font-size="22px" font-weight="700" fill="#FFFFFF" letter-spacing="2px">5. REFINED COLOR SYSTEM &amp; TYPOGRAPHY SPECS</text>
    <g transform="translate(80, 1560)">
        <!-- Swatches -->
        <rect x="0" y="0" width="160" height="100" rx="12" fill="{COLOR_DEEP_SPACE}" stroke="#1E293B" stroke-width="2"/>
        <text x="80" y="125" font-family="system-ui, sans-serif" font-size="13px" font-weight="600" fill="#FFFFFF" text-anchor="middle">Deep Space Navy</text>
        <text x="80" y="145" font-family="monospace" font-size="12px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">#0B1020</text>

        <rect x="180" y="0" width="160" height="100" rx="12" fill="{COLOR_COSMIC_PURPLE}"/>
        <text x="260" y="125" font-family="system-ui, sans-serif" font-size="13px" font-weight="600" fill="#FFFFFF" text-anchor="middle">Cosmic Purple</text>
        <text x="260" y="145" font-family="monospace" font-size="12px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">#6D5DF6</text>

        <rect x="360" y="0" width="160" height="100" rx="12" fill="{COLOR_WARM_STARLIGHT}"/>
        <text x="440" y="125" font-family="system-ui, sans-serif" font-size="13px" font-weight="600" fill="#FFFFFF" text-anchor="middle">Warm Starlight</text>
        <text x="440" y="145" font-family="monospace" font-size="12px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">#FFC857</text>

        <rect x="540" y="0" width="160" height="100" rx="12" fill="{COLOR_INDIGO_GLOW}"/>
        <text x="620" y="125" font-family="system-ui, sans-serif" font-size="13px" font-weight="600" fill="#FFFFFF" text-anchor="middle">Indigo Glow</text>
        <text x="620" y="145" font-family="monospace" font-size="12px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">#4F46E5</text>

        <rect x="720" y="0" width="160" height="100" rx="12" fill="{COLOR_NEUTRAL_WHITE}"/>
        <text x="800" y="125" font-family="system-ui, sans-serif" font-size="13px" font-weight="600" fill="#FFFFFF" text-anchor="middle">Starlight White</text>
        <text x="800" y="145" font-family="monospace" font-size="12px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">#FFFFFF</text>
    </g>

    <g transform="translate(1040, 1560)">
        <rect x="0" y="0" width="880" height="160" rx="16" fill="{COLOR_DEEP_SPACE}" stroke="#1E293B" stroke-width="2"/>
        <text x="40" y="105" font-family="'Geist', 'Satoshi', sans-serif" font-size="90px" font-weight="700" fill="#FFFFFF">Aa</text>
        <text x="210" y="55" font-family="system-ui, sans-serif" font-size="20px" font-weight="700" fill="#FFFFFF">ASTRA Proprietary Typeface</text>
        <text x="210" y="82" font-family="system-ui, sans-serif" font-size="14px" fill="{COLOR_MUTED_GRAY}">Apex Angle 60° | Golden Crossbar 61.8% | Wide Tracking +44%</text>
        <text x="500" y="50" font-family="system-ui, sans-serif" font-size="15px" fill="#FFFFFF">ABCDEFGHIJKLMNOPQRSTUVWXYZ</text>
        <text x="500" y="80" font-family="system-ui, sans-serif" font-size="15px" fill="#FFFFFF">abcdefghijklmnopqrstuvwxyz</text>
        <text x="500" y="110" font-family="system-ui, sans-serif" font-size="15px" fill="#FFFFFF">0123456789</text>
    </g>

    <!-- SECTION 6: EXECUTIVE BRAND SUMMARY -->
    <rect x="80" y="1780" width="1840" height="280" rx="20" fill="{COLOR_DEEP_SPACE}" stroke="#1E293B" stroke-width="2"/>
    <text x="120" y="1835" font-family="system-ui, sans-serif" font-size="20px" font-weight="700" fill="#FFFFFF" letter-spacing="1px">EXECUTIVE BRAND RATIONALE &amp; HIDDEN INTELLIGENCE</text>
    <text x="120" y="1875" font-family="system-ui, sans-serif" font-size="14px" fill="{COLOR_MUTED_GRAY}">• Hidden Chevron 'A': The negative space between the horizon arc apex and the lower vertical flare of the star forms a subtle 'A' letterform.</text>
    <text x="120" y="1905" font-family="system-ui, sans-serif" font-size="14px" fill="{COLOR_MUTED_GRAY}">• Horizon Rise Concept: Symbolizes a continuous upward trajectory, direction, clarity, and the boundless future of agentic AI software.</text>
    <text x="120" y="1935" font-family="system-ui, sans-serif" font-size="14px" fill="{COLOR_MUTED_GRAY}">• 16×16 Scalability: Performs with 100% silhouette fidelity without relying on gradients, drop shadows, or decorative complexity.</text>
    <text x="120" y="1965" font-family="system-ui, sans-serif" font-size="14px" fill="{COLOR_MUTED_GRAY}">• Longevity: Engineered to feel timeless, confident, and authoritative for enterprise software deployment up to 2036 and beyond.</text>
</svg>"""

with open(os.path.join(GUIDELINES_DIR, "astra-brand-guidelines-v2-board.svg"), "w", encoding="utf-8") as f:
    f.write(brand_board_v2_svg)

print("\nAll v2 SVGs generated successfully.")

# Helper to render SVG to PNG
def render_svg_to_png(svg_path, out_png_path, width, height):
    temp_html = out_png_path + ".html"
    svg_uri = "file:///" + os.path.abspath(svg_path).replace("\\", "/")
    html_content = f"""<!DOCTYPE html>
<html>
<head>
<style>
    body {{ margin: 0; padding: 0; background: transparent; overflow: hidden; }}
    img {{ width: {width}px; height: {height}px; display: block; }}
</style>
</head>
<body>
    <img src="{svg_uri}" />
</body>
</html>"""
    with open(temp_html, "w", encoding="utf-8") as f:
        f.write(html_content)

    cmd = [
        EDGE_EXE,
        "--headless",
        "--disable-gpu",
        "--force-device-scale-factor=1",
        f"--window-size={width},{height}",
        f"--screenshot={out_png_path}",
        f"file:///{temp_html.replace('\\', '/')}"
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if os.path.exists(temp_html):
        os.remove(temp_html)
    print(f"Rendered PNG: {out_png_path} ({width}x{height})")

# RENDER PNG & BOARD DELIVERABLES
print("\nRendering v2 Master Board PNGs...")
render_svg_to_png(os.path.join(GUIDELINES_DIR, "astra-brand-guidelines-v2-board.svg"), os.path.join(GUIDELINES_DIR, "astra-brand-guidelines-v2-board.png"), 2000, 3200)
render_svg_to_png(os.path.join(BOARDS_DIR, "astra-three-variations-board.svg"), os.path.join(BOARDS_DIR, "astra-three-variations-board.png"), 2000, 1400)
render_svg_to_png(os.path.join(BOARDS_DIR, "astra-motion-storyboard.svg"), os.path.join(BOARDS_DIR, "astra-motion-storyboard.png"), 2000, 1200)

print("\nRendering App Icons & Favicons...")
render_svg_to_png(os.path.join(VECTORS_DIR, "astra-appicon-rounded-v2.svg"), os.path.join(APP_ICONS_DIR, "astra-appicon-rounded-1024-v2.png"), 1024, 1024)
render_svg_to_png(os.path.join(VECTORS_DIR, "astra-appicon-square-v2.svg"), os.path.join(APP_ICONS_DIR, "astra-appicon-square-1024-v2.png"), 1024, 1024)

# 8K Renders
render_svg_to_png(os.path.join(VECTORS_DIR, "astra-logo-primary-dark-v2.svg"), os.path.join(RASTER_DIR, "astra-logo-primary-dark-8k-v2.png"), 7680, 2880)
render_svg_to_png(os.path.join(VECTORS_DIR, "astra-logo-primary-light-v2.svg"), os.path.join(RASTER_DIR, "astra-logo-primary-light-8k-v2.png"), 7680, 2880)

# Favicon package
fav_imgs = []
fav_svg = os.path.join(VECTORS_DIR, "astra-favicon-v2.svg")
for sz in [16, 32, 48, 64]:
    out_p = os.path.join(FAVICONS_DIR, f"favicon-{sz}x{sz}-v2.png")
    render_svg_to_png(fav_svg, out_p, sz, sz)
    if os.path.exists(out_p):
        fav_imgs.append(Image.open(out_p))

if fav_imgs:
    ico_p = os.path.join(FAVICONS_DIR, "favicon-v2.ico")
    fav_imgs[0].save(ico_p, format="ICO", sizes=[(i.width, i.height) for i in fav_imgs], append_images=fav_imgs[1:])
    print(f"Generated Favicon ICO container: {ico_p}")

print("\n--- ALL ASTRA BRAND IDENTITY V2 ASSETS RENDERED SUCCESSFULLY ---")
