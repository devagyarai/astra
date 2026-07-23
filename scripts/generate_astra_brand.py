import os
import subprocess
import sys
from PIL import Image

# Directory setup
BASE_DIR = r"c:\Development\astra\brand_assets"
VECTORS_DIR = os.path.join(BASE_DIR, "vectors")
RASTER_DIR = os.path.join(BASE_DIR, "raster")
APP_ICONS_DIR = os.path.join(BASE_DIR, "app_icons")
FAVICONS_DIR = os.path.join(BASE_DIR, "favicons")
GUIDELINES_DIR = os.path.join(BASE_DIR, "guidelines")

for d in [BASE_DIR, VECTORS_DIR, RASTER_DIR, APP_ICONS_DIR, FAVICONS_DIR, GUIDELINES_DIR]:
    os.makedirs(d, exist_ok=True)

# Browser Renderer Executable
EDGE_EXE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not os.path.exists(EDGE_EXE):
    EDGE_EXE = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

# Brand Colors
COLOR_DEEP_SPACE = "#0B1020"
COLOR_COSMIC_PURPLE = "#6D5DF6"
COLOR_WARM_STARLIGHT = "#FFC857"
COLOR_NEUTRAL_WHITE = "#FFFFFF"
COLOR_MUTED_GRAY = "#A1A7BB"
COLOR_LIGHT_BG = "#F8FAFC"
COLOR_MONO_BLACK = "#090D16"

def get_gradients_defs(id_prefix=""):
    return f"""
    <defs>
        <!-- Primary Starlight Flare Gradient -->
        <linearGradient id="{id_prefix}starGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="35%" stop-color="{COLOR_WARM_STARLIGHT}"/>
            <stop offset="70%" stop-color="{COLOR_COSMIC_PURPLE}"/>
            <stop offset="100%" stop-color="#4F46E5"/>
        </linearGradient>

        <!-- Star Horizontal Glow Gradient -->
        <linearGradient id="{id_prefix}starHorizGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="{COLOR_COSMIC_PURPLE}" stop-opacity="0.2"/>
            <stop offset="50%" stop-color="#FFFFFF"/>
            <stop offset="100%" stop-color="{COLOR_COSMIC_PURPLE}" stop-opacity="0.2"/>
        </linearGradient>

        <!-- Star Radial Core Glow -->
        <radialGradient id="{id_prefix}coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#FFFFFF" stop-opacity="1"/>
            <stop offset="30%" stop-color="{COLOR_WARM_STARLIGHT}" stop-opacity="0.9"/>
            <stop offset="70%" stop-color="{COLOR_COSMIC_PURPLE}" stop-opacity="0.45"/>
            <stop offset="100%" stop-color="{COLOR_COSMIC_PURPLE}" stop-opacity="0"/>
        </radialGradient>

        <!-- Horizon Arc Gradient -->
        <linearGradient id="{id_prefix}horizonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="{COLOR_COSMIC_PURPLE}" stop-opacity="0.15"/>
            <stop offset="25%" stop-color="{COLOR_COSMIC_PURPLE}" stop-opacity="0.85"/>
            <stop offset="50%" stop-color="{COLOR_WARM_STARLIGHT}" stop-opacity="1"/>
            <stop offset="75%" stop-color="{COLOR_COSMIC_PURPLE}" stop-opacity="0.85"/>
            <stop offset="100%" stop-color="{COLOR_COSMIC_PURPLE}" stop-opacity="0.15"/>
        </linearGradient>

        <!-- Light Theme Horizon Arc Gradient -->
        <linearGradient id="{id_prefix}horizonLightGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="{COLOR_COSMIC_PURPLE}" stop-opacity="0.25"/>
            <stop offset="25%" stop-color="{COLOR_COSMIC_PURPLE}" stop-opacity="0.95"/>
            <stop offset="50%" stop-color="#D97706" stop-opacity="1"/>
            <stop offset="75%" stop-color="{COLOR_COSMIC_PURPLE}" stop-opacity="0.95"/>
            <stop offset="100%" stop-color="{COLOR_COSMIC_PURPLE}" stop-opacity="0.25"/>
        </linearGradient>

        <!-- App Icon Background Gradient -->
        <linearGradient id="{id_prefix}appIconBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1E1B4B"/>
            <stop offset="45%" stop-color="{COLOR_DEEP_SPACE}"/>
            <stop offset="100%" stop-color="#030712"/>
        </linearGradient>
    </defs>
    """

def get_logomark_svg_group(cx=250, cy=220, scale=1.0, mono_color=None, is_light=False, id_prefix=""):
    if mono_color:
        star_fill = mono_color
        horiz_fill = mono_color
        core_fill = mono_color
        arc_fill = mono_color
        glow_element = ""
    else:
        star_fill = f"url(#{id_prefix}starGradient)"
        horiz_fill = f"url(#{id_prefix}starHorizGradient)"
        core_fill = f"url(#{id_prefix}coreGlow)"
        arc_fill = f"url(#{id_prefix}horizonLightGradient)" if is_light else f"url(#{id_prefix}horizonGradient)"
        glow_element = f'<circle cx="{cx}" cy="{cy}" r="{75*scale}" fill="{core_fill}" opacity="0.9" />'

    top_y = cy - 145 * scale
    bot_y = cy + 130 * scale
    v_mid_w = 16 * scale

    left_x = cx - 125 * scale
    right_x = cx + 125 * scale
    h_mid_h = 13 * scale

    d_len = 60 * scale
    d_w = 7 * scale

    arc_left_x = cx - 180 * scale
    arc_right_x = cx + 180 * scale
    arc_end_y = cy + 120 * scale
    arc_apex_top_y = cy + 48 * scale
    arc_apex_bot_y = cy + 64 * scale

    return f"""
    <g id="{id_prefix}horizon_rise_mark">
        {glow_element}
        
        <!-- Horizon Arc -->
        <path d="M {arc_left_x},{arc_end_y} Q {cx},{arc_apex_top_y} {arc_right_x},{arc_end_y} Q {cx},{arc_apex_bot_y} {arc_left_x},{arc_end_y} Z" 
              fill="{arc_fill}" />

        <!-- Star Diagonal Rays -->
        <path d="M {cx - d_len},{cy - d_len} Q {cx},{cy} {cx - d_w},{cy - d_w} Q {cx},{cy} {cx - d_len},{cy - d_len} Z
                 M {cx + d_len},{cy - d_len} Q {cx},{cy} {cx + d_w},{cy - d_w} Q {cx},{cy} {cx + d_len},{cy - d_len} Z
                 M {cx - d_len},{cy + d_len} Q {cx},{cy} {cx - d_w},{cy + d_w} Q {cx},{cy} {cx - d_len},{cy + d_len} Z
                 M {cx + d_len},{cy + d_len} Q {cx},{cy} {cx + d_w},{cy + d_w} Q {cx},{cy} {cx + d_len},{cy + d_len} Z"
              fill="{star_fill}" opacity="0.75" />

        <!-- Star Horizontal Flare -->
        <path d="M {left_x},{cy} Q {cx},{cy - h_mid_h} {cx},{cy} Q {cx},{cy + h_mid_h} {left_x},{cy} Z
                 M {right_x},{cy} Q {cx},{cy - h_mid_h} {cx},{cy} Q {cx},{cy + h_mid_h} {right_x},{cy} Z"
              fill="{star_fill}" />

        <!-- Star Vertical Main Flare -->
        <path d="M {cx},{top_y} Q {cx - v_mid_w},{cy} {cx},{cy} Q {cx + v_mid_w},{cy} {cx},{top_y} Z
                 M {cx},{bot_y} Q {cx - v_mid_w},{cy} {cx},{cy} Q {cx + v_mid_w},{cy} {cx},{bot_y} Z"
              fill="{star_fill}" />
              
        <!-- Core Diamond Apex Sharpener -->
        <polygon points="{cx},{cy - 12*scale} {cx + 12*scale},{cy} {cx},{cy + 12*scale} {cx - 12*scale},{cy}" 
                 fill="{COLOR_NEUTRAL_WHITE if (not mono_color and not is_light) else (COLOR_MONO_BLACK if is_light and not mono_color else mono_color)}" opacity="0.95"/>
    </g>
    """

def get_wordmark_vector_group(x=0, y=0, height=80, fill_color=COLOR_NEUTRAL_WHITE, show_subhead=True, id_prefix=""):
    s = height / 100.0
    sw = 13.5 * s

    a1_x = x
    a1_path = f"""
        <path d="M {a1_x + 40*s},{y} L {a1_x + 5.0*s},{y + 100*s} L {a1_x + 5.0*s + sw*1.1},{y + 100*s} L {a1_x + 40*s},{y + 22*s} L {a1_x + 75*s - sw*1.1},{y + 100*s} L {a1_x + 75*s},{y + 100*s} Z
                 M {a1_x + 20*s},{y + 64*s} L {a1_x + 60*s},{y + 64*s} L {a1_x + 60*s},{y + 64*s + sw} L {a1_x + 20*s},{y + 64*s + sw} Z"
              fill="{fill_color}" />
    """

    s_x = a1_x + (75 + 45) * s
    s_path = f"""
        <path d="M {s_x + 65*s},{y + 22*s} C {s_x + 55*s},{y + 5*s} {s_x + 15*s},{y + 5*s} {s_x + 15*s},{y + 32*s} C {s_x + 15*s},{y + 52*s} {s_x + 68*s},{y + 48*s} {s_x + 68*s},{y + 72*s} C {s_x + 68*s},{y + 98*s} {s_x + 20*s},{y + 98*s} {s_x + 8*s},{y + 78*s} L {s_x + 8*s + sw},{y + 74*s} C {s_x + 18*s},{y + 86*s} {s_x + 54*s},{y + 86*s} {s_x + 54*s},{y + 72*s} C {s_x + 54*s},{y + 54*s} {s_x + 1*s},{y + 56*s} {s_x + 1*s},{y + 32*s} C {s_x + 1*s},{y + 8*s} {s_x + 50*s},{y + 8*s} {s_x + 65*s},{y + 22*s} Z"
              fill="{fill_color}" />
    """

    t_x = s_x + (70 + 45) * s
    t_path = f"""
        <path d="M {t_x},{y} L {t_x + 72*s},{y} L {t_x + 72*s},{y + sw} L {t_x + 36*s + sw/2},{y + sw} L {t_x + 36*s + sw/2},{y + 100*s} L {t_x + 36*s - sw/2},{y + 100*s} L {t_x + 36*s - sw/2},{y + sw} L {t_x},{y + sw} Z"
              fill="{fill_color}" />
    """

    r_x = t_x + (72 + 45) * s
    r_path = f"""
        <path d="M {r_x},{y} L {r_x + 45*s},{y} C {r_x + 72*s},{y} {r_x + 72*s},{y + 50*s} {r_x + 45*s},{y + 50*s} L {r_x + sw},{y + 50*s} L {r_x + sw},{y + 100*s} L {r_x},{y + 100*s} Z
                 M {r_x + sw},{y + sw} L {r_x + 43*s},{y + sw} C {r_x + 58*s},{y + sw} {r_x + 58*s},{y + 50*s - sw} {r_x + 43*s},{y + 50*s - sw} L {r_x + sw},{y + 50*s - sw} Z
                 M {r_x + 32*s},{y + 48*s} L {r_x + 68*s},{y + 100*s} L {r_x + 68*s - sw*1.3},{y + 100*s} L {r_x + 22*s},{y + 48*s} Z"
              fill="{fill_color}" />
    """

    a2_x = r_x + (72 + 45) * s
    a2_path = f"""
        <path d="M {a2_x + 40*s},{y} L {a2_x + 5.0*s},{y + 100*s} L {a2_x + 5.0*s + sw*1.1},{y + 100*s} L {a2_x + 40*s},{y + 22*s} L {a2_x + 75*s - sw*1.1},{y + 100*s} L {a2_x + 75*s},{y + 100*s} Z
                 M {a2_x + 20*s},{y + 64*s} L {a2_x + 60*s},{y + 64*s} L {a2_x + 60*s},{y + 64*s + sw} L {a2_x + 20*s},{y + 64*s + sw} Z"
              fill="{fill_color}" />
    """

    subhead_path = ""
    if show_subhead:
        subhead_y = y + 130 * s
        subhead_color = COLOR_MUTED_GRAY if fill_color == COLOR_NEUTRAL_WHITE else ("#475569" if fill_color == COLOR_MONO_BLACK else fill_color)
        subhead_path = f"""
            <text x="{x + 252*s}" y="{subhead_y}" font-family="system-ui, -apple-system, 'Geist', 'Satoshi', 'Inter', sans-serif" 
                  font-size="{20*s}px" font-weight="600" letter-spacing="{0.42*height}px" fill="{subhead_color}" text-anchor="middle">
                AI WORKSPACE
            </text>
        """

    return f"""
    <g id="{id_prefix}wordmark_group">
        {a1_path}
        {s_path}
        {t_path}
        {r_path}
        {a2_path}
        {subhead_path}
    </g>
    """

svg_files = {}

# Individual Vectors
svg_files["astra-logomark.svg"] = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
    {get_gradients_defs("logomark_")}
    <rect width="100%" height="100%" fill="{COLOR_DEEP_SPACE}"/>
    {get_logomark_svg_group(cx=250, cy=240, scale=1.1, id_prefix="logomark_")}
</svg>"""

svg_files["astra-logomark-transparent.svg"] = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
    {get_gradients_defs("logomark_t_")}
    {get_logomark_svg_group(cx=250, cy=240, scale=1.1, id_prefix="logomark_t_")}
</svg>"""

svg_files["astra-wordmark-dark.svg"] = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 300" width="100%" height="100%">
    <rect width="100%" height="100%" fill="{COLOR_DEEP_SPACE}"/>
    {get_wordmark_vector_group(x=148, y=95, height=85, fill_color=COLOR_NEUTRAL_WHITE, id_prefix="wm_d_")}
</svg>"""

svg_files["astra-wordmark-light.svg"] = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 300" width="100%" height="100%">
    <rect width="100%" height="100%" fill="{COLOR_LIGHT_BG}"/>
    {get_wordmark_vector_group(x=148, y=95, height=85, fill_color=COLOR_MONO_BLACK, id_prefix="wm_l_")}
</svg>"""

svg_files["astra-logo-primary-dark.svg"] = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 450" width="100%" height="100%">
    {get_gradients_defs("pri_d_")}
    <rect width="100%" height="100%" fill="{COLOR_DEEP_SPACE}"/>
    {get_logomark_svg_group(cx=230, cy=220, scale=0.88, id_prefix="pri_d_")}
    {get_wordmark_vector_group(x=490, y=175, height=75, fill_color=COLOR_NEUTRAL_WHITE, id_prefix="pri_d_")}
</svg>"""

svg_files["astra-logo-primary-dark-transparent.svg"] = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 450" width="100%" height="100%">
    {get_gradients_defs("pri_dt_")}
    {get_logomark_svg_group(cx=230, cy=220, scale=0.88, id_prefix="pri_dt_")}
    {get_wordmark_vector_group(x=490, y=175, height=75, fill_color=COLOR_NEUTRAL_WHITE, id_prefix="pri_dt_")}
</svg>"""

svg_files["astra-logo-primary-light.svg"] = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 450" width="100%" height="100%">
    {get_gradients_defs("pri_l_")}
    <rect width="100%" height="100%" fill="{COLOR_LIGHT_BG}"/>
    {get_logomark_svg_group(cx=230, cy=220, scale=0.88, is_light=True, id_prefix="pri_l_")}
    {get_wordmark_vector_group(x=490, y=175, height=75, fill_color=COLOR_MONO_BLACK, id_prefix="pri_l_")}
</svg>"""

svg_files["astra-logo-stacked-dark.svg"] = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 700" width="100%" height="100%">
    {get_gradients_defs("stk_d_")}
    <rect width="100%" height="100%" fill="{COLOR_DEEP_SPACE}"/>
    {get_logomark_svg_group(cx=400, cy=230, scale=1.0, id_prefix="stk_d_")}
    {get_wordmark_vector_group(x=185, y=440, height=70, fill_color=COLOR_NEUTRAL_WHITE, id_prefix="stk_d_")}
</svg>"""

svg_files["astra-logo-stacked-light.svg"] = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 700" width="100%" height="100%">
    {get_gradients_defs("stk_l_")}
    <rect width="100%" height="100%" fill="{COLOR_LIGHT_BG}"/>
    {get_logomark_svg_group(cx=400, cy=230, scale=1.0, is_light=True, id_prefix="stk_l_")}
    {get_wordmark_vector_group(x=185, y=440, height=70, fill_color=COLOR_MONO_BLACK, id_prefix="stk_l_")}
</svg>"""

svg_files["astra-logo-mono-black.svg"] = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 450" width="100%" height="100%">
    <rect width="100%" height="100%" fill="#FFFFFF"/>
    {get_logomark_svg_group(cx=230, cy=220, scale=0.88, mono_color=COLOR_MONO_BLACK, id_prefix="mono_b_")}
    {get_wordmark_vector_group(x=490, y=175, height=75, fill_color=COLOR_MONO_BLACK, id_prefix="mono_b_")}
</svg>"""

svg_files["astra-logo-mono-white.svg"] = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 450" width="100%" height="100%">
    <rect width="100%" height="100%" fill="{COLOR_MONO_BLACK}"/>
    {get_logomark_svg_group(cx=230, cy=220, scale=0.88, mono_color=COLOR_NEUTRAL_WHITE, id_prefix="mono_w_")}
    {get_wordmark_vector_group(x=490, y=175, height=75, fill_color=COLOR_NEUTRAL_WHITE, id_prefix="mono_w_")}
</svg>"""

svg_files["astra-appicon-rounded.svg"] = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="100%" height="100%">
    {get_gradients_defs("icon_r_")}
    <rect width="1024" height="1024" rx="224" ry="224" fill="url(#icon_r_appIconBg)"/>
    <rect width="1020" height="1020" x="2" y="2" rx="222" ry="222" fill="none" stroke="{COLOR_COSMIC_PURPLE}" stroke-opacity="0.3" stroke-width="4"/>
    {get_logomark_svg_group(cx=512, cy=490, scale=2.3, id_prefix="icon_r_")}
</svg>"""

svg_files["astra-appicon-square.svg"] = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="100%" height="100%">
    {get_gradients_defs("icon_s_")}
    <rect width="1024" height="1024" fill="url(#icon_s_appIconBg)"/>
    {get_logomark_svg_group(cx=512, cy=490, scale=2.3, id_prefix="icon_s_")}
</svg>"""

svg_files["astra-favicon.svg"] = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
    {get_gradients_defs("fav_")}
    <rect width="64" height="64" rx="14" fill="{COLOR_DEEP_SPACE}"/>
    {get_logomark_svg_group(cx=32, cy=30, scale=0.145, id_prefix="fav_")}
</svg>"""

# Write vectors
for filename, content in svg_files.items():
    filepath = os.path.join(VECTORS_DIR, filename)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

# MASTER BRAND IDENTITY BOARD SVG (2000 x 2900)
brand_board_svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 2900" width="2000" height="2900">
    {get_gradients_defs("bb_")}
    
    <!-- Outer Board Background -->
    <rect width="2000" height="2900" fill="#070A14"/>
    
    <!-- Top Header -->
    <rect width="2000" height="180" fill="#0B1020"/>
    <line x1="0" y1="180" x2="2000" y2="180" stroke="#1E293B" stroke-width="2"/>
    <text x="80" y="85" font-family="system-ui, sans-serif" font-size="42px" font-weight="800" fill="#FFFFFF" letter-spacing="4px">ASTRA LOGO SUITE</text>
    <text x="80" y="130" font-family="system-ui, sans-serif" font-size="24px" font-weight="500" fill="{COLOR_COSMIC_PURPLE}" letter-spacing="1px">Horizon Rise Concept</text>

    <text x="1920" y="90" font-family="system-ui, sans-serif" font-size="20px" font-weight="400" fill="{COLOR_MUTED_GRAY}" text-anchor="end">A guiding star rising above the horizon,</text>
    <text x="1920" y="125" font-family="system-ui, sans-serif" font-size="20px" font-weight="400" fill="{COLOR_MUTED_GRAY}" text-anchor="end">symbolizing intelligence, direction and limitless potential.</text>

    <!-- SECTION 1 & 2: PRIMARY & STACKED LOGOS -->
    <!-- 1. Primary Horizontal -->
    <text x="80" y="240" font-family="system-ui, sans-serif" font-size="22px" font-weight="700" fill="#FFFFFF" letter-spacing="2px">1. PRIMARY LOGO – HORIZONTAL</text>
    <rect x="80" y="260" width="880" height="340" rx="20" fill="{COLOR_DEEP_SPACE}" stroke="#1E293B" stroke-width="2"/>
    <g transform="translate(30, 40)">
        {get_logomark_svg_group(cx=220, cy=220, scale=0.75, id_prefix="bb_p_d_")}
        {get_wordmark_vector_group(x=440, y=182, height=65, fill_color=COLOR_NEUTRAL_WHITE, id_prefix="bb_p_d_")}
    </g>
    <text x="520" y="575" font-family="system-ui, sans-serif" font-size="16px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">On Dark Background</text>

    <rect x="1040" y="260" width="880" height="340" rx="20" fill="{COLOR_LIGHT_BG}" stroke="#E2E8F0" stroke-width="2"/>
    <g transform="translate(990, 40)">
        {get_logomark_svg_group(cx=220, cy=220, scale=0.75, is_light=True, id_prefix="bb_p_l_")}
        {get_wordmark_vector_group(x=440, y=182, height=65, fill_color=COLOR_MONO_BLACK, id_prefix="bb_p_l_")}
    </g>
    <text x="1480" y="575" font-family="system-ui, sans-serif" font-size="16px" fill="#64748B" text-anchor="middle">On Light Background</text>

    <!-- 2. Stacked Logo -->
    <text x="80" y="650" font-family="system-ui, sans-serif" font-size="22px" font-weight="700" fill="#FFFFFF" letter-spacing="2px">2. STACKED LOGO</text>
    <rect x="80" y="670" width="880" height="420" rx="20" fill="{COLOR_DEEP_SPACE}" stroke="#1E293B" stroke-width="2"/>
    <g transform="translate(120, 680)">
        {get_logomark_svg_group(cx=400, cy=150, scale=0.8, id_prefix="bb_s_d_")}
        {get_wordmark_vector_group(x=225, y=320, height=55, fill_color=COLOR_NEUTRAL_WHITE, id_prefix="bb_s_d_")}
    </g>
    <text x="520" y="1060" font-family="system-ui, sans-serif" font-size="16px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">On Dark Background</text>

    <rect x="1040" y="670" width="880" height="420" rx="20" fill="{COLOR_LIGHT_BG}" stroke="#E2E8F0" stroke-width="2"/>
    <g transform="translate(1080, 680)">
        {get_logomark_svg_group(cx=400, cy=150, scale=0.8, is_light=True, id_prefix="bb_s_l_")}
        {get_wordmark_vector_group(x=225, y=320, height=55, fill_color=COLOR_MONO_BLACK, id_prefix="bb_s_l_")}
    </g>
    <text x="1480" y="1060" font-family="system-ui, sans-serif" font-size="16px" fill="#64748B" text-anchor="middle">On Light Background</text>

    <!-- SECTION 3 & 4: LOGO MARK ONLY & APP ICON -->
    <text x="80" y="1140" font-family="system-ui, sans-serif" font-size="22px" font-weight="700" fill="#FFFFFF" letter-spacing="2px">3. LOGO MARK (SYMBOL ONLY)</text>
    <rect x="80" y="1160" width="270" height="270" rx="20" fill="{COLOR_DEEP_SPACE}" stroke="#1E293B" stroke-width="2"/>
    {get_logomark_svg_group(cx=215, cy=1295, scale=0.6, id_prefix="bb_m1_")}

    <rect x="385" y="1160" width="270" height="270" rx="20" fill="{COLOR_LIGHT_BG}" stroke="#E2E8F0" stroke-width="2"/>
    {get_logomark_svg_group(cx=520, cy=1295, scale=0.6, is_light=True, id_prefix="bb_m2_")}

    <rect x="690" y="1160" width="270" height="270" rx="20" fill="{COLOR_MONO_BLACK}" stroke="#1E293B" stroke-width="2"/>
    {get_logomark_svg_group(cx=825, cy=1295, scale=0.6, mono_color=COLOR_NEUTRAL_WHITE, id_prefix="bb_m3_")}

    <text x="1040" y="1140" font-family="system-ui, sans-serif" font-size="22px" font-weight="700" fill="#FFFFFF" letter-spacing="2px">4. APP ICON (ROUNDED SQUARE)</text>
    <rect x="1040" y="1160" width="270" height="270" rx="58" ry="58" fill="url(#bb_appIconBg)" stroke="{COLOR_COSMIC_PURPLE}" stroke-width="3" stroke-opacity="0.4"/>
    {get_logomark_svg_group(cx=1175, cy=1290, scale=0.65, id_prefix="bb_app_")}

    <!-- SECTION 5 & 6: FAVICON SET & MONOCHROME -->
    <text x="80" y="1480" font-family="system-ui, sans-serif" font-size="22px" font-weight="700" fill="#FFFFFF" letter-spacing="2px">5. FAVICON SET</text>
    <g transform="translate(80, 1510)">
        <!-- 16x16 -->
        <rect x="0" y="30" width="50" height="50" rx="8" fill="{COLOR_DEEP_SPACE}" stroke="#1E293B"/>
        {get_logomark_svg_group(cx=25, cy=54, scale=0.11, id_prefix="fav16_")}
        <text x="25" y="100" font-family="system-ui, sans-serif" font-size="14px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">16x16</text>

        <!-- 32x32 -->
        <rect x="100" y="20" width="70" height="70" rx="12" fill="{COLOR_DEEP_SPACE}" stroke="#1E293B"/>
        {get_logomark_svg_group(cx=135, cy=54, scale=0.16, id_prefix="fav32_")}
        <text x="135" y="115" font-family="system-ui, sans-serif" font-size="14px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">32x32</text>

        <!-- 48x48 -->
        <rect x="220" y="10" width="90" height="90" rx="16" fill="{COLOR_DEEP_SPACE}" stroke="#1E293B"/>
        {get_logomark_svg_group(cx=265, cy=54, scale=0.21, id_prefix="fav48_")}
        <text x="265" y="125" font-family="system-ui, sans-serif" font-size="14px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">48x48</text>

        <!-- 64x64 -->
        <rect x="360" y="0" width="110" height="110" rx="20" fill="{COLOR_DEEP_SPACE}" stroke="#1E293B"/>
        {get_logomark_svg_group(cx=415, cy=54, scale=0.26, id_prefix="fav64_")}
        <text x="415" y="135" font-family="system-ui, sans-serif" font-size="14px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">64x64</text>
    </g>

    <text x="1040" y="1480" font-family="system-ui, sans-serif" font-size="22px" font-weight="700" fill="#FFFFFF" letter-spacing="2px">6. MONOCHROME VERSIONS</text>
    <g transform="translate(1040, 1510)">
        <rect x="0" y="0" width="200" height="120" rx="14" fill="{COLOR_LIGHT_BG}"/>
        {get_logomark_svg_group(cx=100, cy=60, scale=0.3, mono_color=COLOR_MONO_BLACK, id_prefix="mono1_")}
        <text x="100" y="-10" font-family="system-ui, sans-serif" font-size="14px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">Black on Light</text>

        <rect x="225" y="0" width="200" height="120" rx="14" fill="{COLOR_DEEP_SPACE}"/>
        {get_logomark_svg_group(cx=325, cy=60, scale=0.3, mono_color=COLOR_NEUTRAL_WHITE, id_prefix="mono2_")}
        <text x="325" y="-10" font-family="system-ui, sans-serif" font-size="14px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">White on Dark</text>

        <rect x="450" y="0" width="200" height="120" rx="14" fill="#FFFFFF"/>
        {get_logomark_svg_group(cx=550, cy=60, scale=0.3, mono_color=COLOR_MONO_BLACK, id_prefix="mono3_")}
        <text x="550" y="-10" font-family="system-ui, sans-serif" font-size="14px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">Black</text>

        <rect x="675" y="0" width="200" height="120" rx="14" fill="#000000"/>
        {get_logomark_svg_group(cx=775, cy=60, scale=0.3, mono_color=COLOR_NEUTRAL_WHITE, id_prefix="mono4_")}
        <text x="775" y="-10" font-family="system-ui, sans-serif" font-size="14px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">White</text>
    </g>

    <!-- SECTION 7 & 8: CLEAR SPACE & MINIMUM SIZE -->
    <text x="80" y="1730" font-family="system-ui, sans-serif" font-size="22px" font-weight="700" fill="#FFFFFF" letter-spacing="2px">7. CLEAR SPACE</text>
    <rect x="80" y="1750" width="880" height="240" rx="20" fill="{COLOR_DEEP_SPACE}" stroke="#1E293B" stroke-width="2"/>
    <g transform="translate(110, 1780)">
        <rect x="100" y="20" width="620" height="140" fill="none" stroke="{COLOR_COSMIC_PURPLE}" stroke-width="2" stroke-dasharray="6,6"/>
        {get_logomark_svg_group(cx=180, cy=90, scale=0.38, id_prefix="cs_")}
        {get_wordmark_vector_group(x=290, y=70, height=35, fill_color=COLOR_NEUTRAL_WHITE, id_prefix="cs_")}
        <!-- Margin Callouts -->
        <text x="120" y="15" font-family="monospace" font-size="12px" fill="{COLOR_WARM_STARLIGHT}">x</text>
        <text x="705" y="15" font-family="monospace" font-size="12px" fill="{COLOR_WARM_STARLIGHT}">x</text>
        <text x="705" y="175" font-family="monospace" font-size="12px" fill="{COLOR_WARM_STARLIGHT}">x</text>
        <text x="120" y="175" font-family="monospace" font-size="12px" fill="{COLOR_WARM_STARLIGHT}">x</text>
    </g>
    <text x="210" y="2015" font-family="system-ui, sans-serif" font-size="14px" fill="{COLOR_MUTED_GRAY}">Clear space (x) = Height of the star. No text or graphics should enter this area.</text>

    <text x="1040" y="1730" font-family="system-ui, sans-serif" font-size="22px" font-weight="700" fill="#FFFFFF" letter-spacing="2px">8. MINIMUM SIZE</text>
    <rect x="1040" y="1750" width="880" height="240" rx="20" fill="{COLOR_DEEP_SPACE}" stroke="#1E293B" stroke-width="2"/>
    <g transform="translate(1080, 1780)">
        <!-- Horizontal Min (120px equivalent) -->
        <g transform="translate(180, 50)">
            {get_logomark_svg_group(cx=0, cy=0, scale=0.22, id_prefix="ms_h_")}
            {get_wordmark_vector_group(x=55, y=-15, height=22, fill_color=COLOR_NEUTRAL_WHITE, id_prefix="ms_h_")}
            <line x1="-30" y1="40" x2="220" y2="40" stroke="{COLOR_MUTED_GRAY}" stroke-width="1"/>
            <line x1="-30" y1="35" x2="-30" y2="45" stroke="{COLOR_MUTED_GRAY}" stroke-width="1"/>
            <line x1="220" y1="35" x2="220" y2="45" stroke="{COLOR_MUTED_GRAY}" stroke-width="1"/>
            <text x="95" y="65" font-family="system-ui, sans-serif" font-size="14px" fill="#FFFFFF" text-anchor="middle">120 px</text>
        </g>
        <!-- Mark Min (32px) -->
        <g transform="translate(580, 50)">
            {get_logomark_svg_group(cx=0, cy=0, scale=0.14, id_prefix="ms_m_")}
            <line x1="-20" y1="40" x2="20" y2="40" stroke="{COLOR_MUTED_GRAY}" stroke-width="1"/>
            <line x1="-20" y1="35" x2="-20" y2="45" stroke="{COLOR_MUTED_GRAY}" stroke-width="1"/>
            <line x1="20" y1="35" x2="20" y2="45" stroke="{COLOR_MUTED_GRAY}" stroke-width="1"/>
            <text x="0" y="65" font-family="system-ui, sans-serif" font-size="14px" fill="#FFFFFF" text-anchor="middle">32 px</text>
        </g>
    </g>
    <text x="1480" y="2015" font-family="system-ui, sans-serif" font-size="14px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">Minimum size ensures clarity and legibility.</text>

    <!-- SECTION 9 & 10: INCORRECT USAGE -->
    <text x="80" y="2060" font-family="system-ui, sans-serif" font-size="22px" font-weight="700" fill="#FFFFFF" letter-spacing="2px">9. INCORRECT USAGE</text>
    <g transform="translate(80, 2090)">
        <!-- 1. Stretched -->
        <rect x="0" y="0" width="340" height="180" rx="16" fill="{COLOR_DEEP_SPACE}" stroke="#1E293B"/>
        <g transform="translate(-10, 10) scale(1.3, 0.7)">
            {get_logomark_svg_group(cx=100, cy=100, scale=0.25, id_prefix="err1_")}
            {get_wordmark_vector_group(x=160, y=85, height=25, fill_color=COLOR_NEUTRAL_WHITE, show_subhead=False, id_prefix="err1_")}
        </g>
        <circle cx="170" cy="150" r="12" fill="#EF4444"/>
        <text x="170" y="154" font-family="sans-serif" font-size="14px" font-weight="bold" fill="#FFFFFF" text-anchor="middle">✕</text>
        <text x="170" y="175" font-family="system-ui, sans-serif" font-size="13px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">Do not stretch</text>

        <!-- 2. Wrong Colors -->
        <rect x="380" y="0" width="340" height="180" rx="16" fill="{COLOR_DEEP_SPACE}" stroke="#1E293B"/>
        <g transform="translate(370, 10)">
            {get_logomark_svg_group(cx=100, cy=100, scale=0.25, mono_color="#10B981", id_prefix="err2_")}
            {get_wordmark_vector_group(x=160, y=85, height=25, fill_color="#10B981", show_subhead=False, id_prefix="err2_")}
        </g>
        <circle cx="550" cy="150" r="12" fill="#EF4444"/>
        <text x="550" y="154" font-family="sans-serif" font-size="14px" font-weight="bold" fill="#FFFFFF" text-anchor="middle">✕</text>
        <text x="550" y="175" font-family="system-ui, sans-serif" font-size="13px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">Do not change colors</text>

        <!-- 3. Heavy Shadow -->
        <rect x="760" y="0" width="340" height="180" rx="16" fill="{COLOR_DEEP_SPACE}" stroke="#1E293B"/>
        <g transform="translate(750, 10)">
            {get_logomark_svg_group(cx=100, cy=100, scale=0.25, id_prefix="err3_")}
            {get_wordmark_vector_group(x=160, y=85, height=25, fill_color=COLOR_NEUTRAL_WHITE, show_subhead=False, id_prefix="err3_")}
        </g>
        <circle cx="930" cy="150" r="12" fill="#EF4444"/>
        <text x="930" y="154" font-family="sans-serif" font-size="14px" font-weight="bold" fill="#FFFFFF" text-anchor="middle">✕</text>
        <text x="930" y="175" font-family="system-ui, sans-serif" font-size="13px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">Do not add shadows</text>

        <!-- 4. Rotated -->
        <rect x="1140" y="0" width="340" height="180" rx="16" fill="{COLOR_DEEP_SPACE}" stroke="#1E293B"/>
        <g transform="translate(1310, 80) rotate(18)">
            {get_logomark_svg_group(cx=-80, cy=-20, scale=0.25, id_prefix="err4_")}
            {get_wordmark_vector_group(x=-20, y=-35, height=25, fill_color=COLOR_NEUTRAL_WHITE, show_subhead=False, id_prefix="err4_")}
        </g>
        <circle cx="1310" cy="150" r="12" fill="#EF4444"/>
        <text x="1310" y="154" font-family="sans-serif" font-size="14px" font-weight="bold" fill="#FFFFFF" text-anchor="middle">✕</text>
        <text x="1310" y="175" font-family="system-ui, sans-serif" font-size="13px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">Do not rotate</text>

        <!-- 5. Busy Background -->
        <rect x="1520" y="0" width="320" height="180" rx="16" fill="#D97706"/>
        <circle cx="1600" cy="50" r="90" fill="#EF4444" opacity="0.6"/>
        <circle cx="1780" cy="120" r="80" fill="#3B82F6" opacity="0.6"/>
        <g transform="translate(1510, 10)">
            {get_logomark_svg_group(cx=100, cy=100, scale=0.25, id_prefix="err5_")}
            {get_wordmark_vector_group(x=160, y=85, height=25, fill_color=COLOR_NEUTRAL_WHITE, show_subhead=False, id_prefix="err5_")}
        </g>
        <circle cx="1680" cy="150" r="12" fill="#EF4444"/>
        <text x="1680" y="154" font-family="sans-serif" font-size="14px" font-weight="bold" fill="#FFFFFF" text-anchor="middle">✕</text>
        <text x="1680" y="175" font-family="system-ui, sans-serif" font-size="13px" fill="#FFFFFF" text-anchor="middle">Do not place on busy backgrounds</text>
    </g>

    <!-- SECTION 11 & 12: COLOR PALETTE & TYPOGRAPHY -->
    <text x="80" y="2340" font-family="system-ui, sans-serif" font-size="22px" font-weight="700" fill="#FFFFFF" letter-spacing="2px">11. COLOR PALETTE</text>
    <g transform="translate(80, 2370)">
        <!-- Color 1 -->
        <rect x="0" y="0" width="160" height="100" rx="12" fill="{COLOR_DEEP_SPACE}" stroke="#1E293B" stroke-width="2"/>
        <text x="80" y="125" font-family="system-ui, sans-serif" font-size="13px" font-weight="600" fill="#FFFFFF" text-anchor="middle">Deep Space Navy</text>
        <text x="80" y="145" font-family="monospace" font-size="12px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">#0B1020</text>

        <!-- Color 2 -->
        <rect x="180" y="0" width="160" height="100" rx="12" fill="{COLOR_COSMIC_PURPLE}"/>
        <text x="260" y="125" font-family="system-ui, sans-serif" font-size="13px" font-weight="600" fill="#FFFFFF" text-anchor="middle">Cosmic Purple</text>
        <text x="260" y="145" font-family="monospace" font-size="12px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">#6D5DF6</text>

        <!-- Color 3 -->
        <rect x="360" y="0" width="160" height="100" rx="12" fill="{COLOR_NEUTRAL_WHITE}"/>
        <text x="440" y="125" font-family="system-ui, sans-serif" font-size="13px" font-weight="600" fill="#FFFFFF" text-anchor="middle">Starlight White</text>
        <text x="440" y="145" font-family="monospace" font-size="12px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">#FFFFFF</text>

        <!-- Color 4 -->
        <rect x="540" y="0" width="160" height="100" rx="12" fill="{COLOR_WARM_STARLIGHT}"/>
        <text x="620" y="125" font-family="system-ui, sans-serif" font-size="13px" font-weight="600" fill="#FFFFFF" text-anchor="middle">Warm Light</text>
        <text x="620" y="145" font-family="monospace" font-size="12px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">#FFCE77</text>

        <!-- Color 5 -->
        <rect x="720" y="0" width="160" height="100" rx="12" fill="{COLOR_MUTED_GRAY}"/>
        <text x="800" y="125" font-family="system-ui, sans-serif" font-size="13px" font-weight="600" fill="#FFFFFF" text-anchor="middle">Muted Gray</text>
        <text x="800" y="145" font-family="monospace" font-size="12px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">#A1A7BB</text>
    </g>

    <text x="1040" y="2340" font-family="system-ui, sans-serif" font-size="22px" font-weight="700" fill="#FFFFFF" letter-spacing="2px">12. TYPOGRAPHY</text>
    <g transform="translate(1040, 2370)">
        <rect x="0" y="0" width="880" height="160" rx="16" fill="{COLOR_DEEP_SPACE}" stroke="#1E293B" stroke-width="2"/>
        <text x="40" y="105" font-family="'Geist', 'Satoshi', system-ui, sans-serif" font-size="90px" font-weight="700" fill="#FFFFFF">Aa</text>
        <text x="210" y="55" font-family="system-ui, sans-serif" font-size="20px" font-weight="700" fill="#FFFFFF">Satoshi</text>
        <text x="210" y="82" font-family="system-ui, sans-serif" font-size="14px" fill="{COLOR_MUTED_GRAY}">(Primary Typeface)</text>

        <text x="500" y="50" font-family="system-ui, sans-serif" font-size="15px" fill="#FFFFFF">ABCDEFGHIJKLMNOPQRSTUVWXYZ</text>
        <text x="500" y="80" font-family="system-ui, sans-serif" font-size="15px" fill="#FFFFFF">abcdefghijklmnopqrstuvwxyz</text>
        <text x="500" y="110" font-family="system-ui, sans-serif" font-size="15px" fill="#FFFFFF">0123456789</text>
    </g>

    <!-- FOOTER INFO -->
    <rect x="80" y="2590" width="1840" height="220" rx="20" fill="{COLOR_DEEP_SPACE}" stroke="#1E293B" stroke-width="2"/>
    <text x="120" y="2640" font-family="system-ui, sans-serif" font-size="20px" font-weight="700" fill="#FFFFFF" letter-spacing="1px">13. FILE FORMATS PROVIDED</text>
    
    <g transform="translate(120, 2660)">
        <g transform="translate(40, 30)">
            <circle cx="30" cy="30" r="30" fill="{COLOR_COSMIC_PURPLE}" fill-opacity="0.2"/>
            <text x="30" y="36" font-family="sans-serif" font-size="22px" text-anchor="middle" fill="#FFFFFF">⚡</text>
            <text x="30" y="80" font-family="system-ui, sans-serif" font-size="14px" font-weight="700" fill="#FFFFFF" text-anchor="middle">SVG</text>
            <text x="30" y="100" font-family="system-ui, sans-serif" font-size="12px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">Scalable Vector</text>
            <text x="30" y="115" font-family="system-ui, sans-serif" font-size="12px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">(Infinite resolution)</text>
        </g>

        <g transform="translate(240, 30)">
            <circle cx="30" cy="30" r="30" fill="{COLOR_COSMIC_PURPLE}" fill-opacity="0.2"/>
            <text x="30" y="36" font-family="sans-serif" font-size="22px" text-anchor="middle" fill="#FFFFFF">🖼</text>
            <text x="30" y="80" font-family="system-ui, sans-serif" font-size="14px" font-weight="700" fill="#FFFFFF" text-anchor="middle">PNG</text>
            <text x="30" y="100" font-family="system-ui, sans-serif" font-size="12px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">High Quality</text>
            <text x="30" y="115" font-family="system-ui, sans-serif" font-size="12px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">(Transparent)</text>
        </g>

        <g transform="translate(440, 30)">
            <circle cx="30" cy="30" r="30" fill="{COLOR_COSMIC_PURPLE}" fill-opacity="0.2"/>
            <text x="30" y="36" font-family="sans-serif" font-size="22px" text-anchor="middle" fill="#FFFFFF">🌄</text>
            <text x="30" y="80" font-family="system-ui, sans-serif" font-size="14px" font-weight="700" fill="#FFFFFF" text-anchor="middle">JPG</text>
            <text x="30" y="100" font-family="system-ui, sans-serif" font-size="12px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">Web &amp; Social</text>
            <text x="30" y="115" font-family="system-ui, sans-serif" font-size="12px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">(Optimized)</text>
        </g>

        <g transform="translate(640, 30)">
            <circle cx="30" cy="30" r="30" fill="{COLOR_COSMIC_PURPLE}" fill-opacity="0.2"/>
            <text x="30" y="36" font-family="sans-serif" font-size="22px" text-anchor="middle" fill="#FFFFFF">✦</text>
            <text x="30" y="80" font-family="system-ui, sans-serif" font-size="14px" font-weight="700" fill="#FFFFFF" text-anchor="middle">ICO</text>
            <text x="30" y="100" font-family="system-ui, sans-serif" font-size="12px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">Favicon</text>
            <text x="30" y="115" font-family="system-ui, sans-serif" font-size="12px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">(Multi-size)</text>
        </g>

        <g transform="translate(840, 30)">
            <circle cx="30" cy="30" r="30" fill="{COLOR_COSMIC_PURPLE}" fill-opacity="0.2"/>
            <text x="30" y="36" font-family="sans-serif" font-size="22px" text-anchor="middle" fill="#FFFFFF">📄</text>
            <text x="30" y="80" font-family="system-ui, sans-serif" font-size="14px" font-weight="700" fill="#FFFFFF" text-anchor="middle">PDF</text>
            <text x="30" y="100" font-family="system-ui, sans-serif" font-size="12px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">Print Ready</text>
            <text x="30" y="115" font-family="system-ui, sans-serif" font-size="12px" fill="{COLOR_MUTED_GRAY}" text-anchor="middle">(Vector)</text>
        </g>
    </g>

    <g transform="translate(1200, 2620)">
        <rect x="0" y="0" width="680" height="160" rx="16" fill="#060913" stroke="#1E293B"/>
        <text x="30" y="40" font-family="system-ui, sans-serif" font-size="16px" font-weight="700" fill="{COLOR_COSMIC_PURPLE}">ABOUT THE CONCEPT</text>
        <text x="30" y="70" font-family="system-ui, sans-serif" font-size="13px" fill="{COLOR_MUTED_GRAY}">The rising star above the horizon represents guidance,</text>
        <text x="30" y="92" font-family="system-ui, sans-serif" font-size="13px" fill="{COLOR_MUTED_GRAY}">intelligence and exploration. The arc signifies the horizon</text>
        <text x="30" y="114" font-family="system-ui, sans-serif" font-size="13px" fill="{COLOR_MUTED_GRAY}">of possibilities, while the star reflects clarity and purpose.</text>
        <text x="30" y="136" font-family="system-ui, sans-serif" font-size="13px" fill="{COLOR_MUTED_GRAY}">Together, they form a mark of trust, growth and limitless</text>
        <text x="30" y="156" font-family="system-ui, sans-serif" font-size="13px" fill="{COLOR_MUTED_GRAY}">potential — the essence of ASTRA.</text>
        {get_logomark_svg_group(cx=600, cy=85, scale=0.45, id_prefix="bb_abt_")}
    </g>
</svg>"""

board_svg_path = os.path.join(GUIDELINES_DIR, "astra-brand-guidelines-board.svg")
with open(board_svg_path, "w", encoding="utf-8") as f:
    f.write(brand_board_svg)
print(f"Generated Master Brand Guidelines Board SVG: {board_svg_path}")

def render_svg_to_png(svg_path, out_png_path, width, height):
    temp_html = out_png_path + ".html"
    html_content = f"""<!DOCTYPE html>
<html>
<head>
<style>
    body {{ margin: 0; padding: 0; background: transparent; overflow: hidden; }}
    img {{ width: {width}px; height: {height}px; display: block; }}
</style>
</head>
<body>
    <img src="file:///{svg_path.replace('\\', '/')}" />
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

# Render Master Brand Guidelines Board to PNG & PDF
print("\nRendering Master Brand Guidelines Board PNG...")
board_png_path = os.path.join(GUIDELINES_DIR, "astra-brand-guidelines-board.png")
render_svg_to_png(board_svg_path, board_png_path, 2000, 2900)

print("\nRendering Raster PNG assets...")
render_svg_to_png(os.path.join(VECTORS_DIR, "astra-appicon-rounded.svg"), os.path.join(APP_ICONS_DIR, "astra-appicon-rounded-1024.png"), 1024, 1024)
render_svg_to_png(os.path.join(VECTORS_DIR, "astra-appicon-square.svg"), os.path.join(APP_ICONS_DIR, "astra-appicon-square-1024.png"), 1024, 1024)

render_svg_to_png(os.path.join(VECTORS_DIR, "astra-logo-primary-dark.svg"), os.path.join(RASTER_DIR, "astra-logo-primary-dark-8k.png"), 7680, 2880)
render_svg_to_png(os.path.join(VECTORS_DIR, "astra-logo-primary-dark-transparent.svg"), os.path.join(RASTER_DIR, "astra-logo-primary-dark-transparent.png"), 2400, 900)
render_svg_to_png(os.path.join(VECTORS_DIR, "astra-logo-primary-light.svg"), os.path.join(RASTER_DIR, "astra-logo-primary-light-8k.png"), 7680, 2880)

render_svg_to_png(os.path.join(VECTORS_DIR, "astra-logo-stacked-dark.svg"), os.path.join(RASTER_DIR, "astra-logo-stacked-dark.png"), 1600, 1400)
render_svg_to_png(os.path.join(VECTORS_DIR, "astra-logo-stacked-light.svg"), os.path.join(RASTER_DIR, "astra-logo-stacked-light.png"), 1600, 1400)

render_svg_to_png(os.path.join(VECTORS_DIR, "astra-logo-mono-black.svg"), os.path.join(RASTER_DIR, "astra-logo-mono-black.png"), 2400, 900)
render_svg_to_png(os.path.join(VECTORS_DIR, "astra-logo-mono-white.svg"), os.path.join(RASTER_DIR, "astra-logo-mono-white.png"), 2400, 900)

# Favicons
favicon_sizes = [16, 32, 48, 64]
fav_imgs = []
fav_svg_path = os.path.join(VECTORS_DIR, "astra-favicon.svg")

for sz in favicon_sizes:
    fav_png_path = os.path.join(FAVICONS_DIR, f"favicon-{sz}x{sz}.png")
    render_svg_to_png(fav_svg_path, fav_png_path, sz, sz)
    if os.path.exists(fav_png_path):
        fav_imgs.append(Image.open(fav_png_path))

if fav_imgs:
    ico_path = os.path.join(FAVICONS_DIR, "favicon.ico")
    fav_imgs[0].save(ico_path, format="ICO", sizes=[(sz, sz) for sz in favicon_sizes], append_images=fav_imgs[1:])
    print(f"Generated ICO container: {ico_path}")

print("\n--- ALL ASTRA BRAND ASSETS & GUIDELINES GENERATED SUCCESSFULLY ---")
