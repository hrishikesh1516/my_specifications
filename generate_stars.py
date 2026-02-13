
import random

def multiple_box_shadow(n):
    shadows = []
    for _ in range(n):
        x = random.randint(0, 2000)
        y = random.randint(0, 2000)
        shadows.append(f"{x}px {y}px #FFF")
    return ", ".join(shadows)

shadows_small = multiple_box_shadow(700)
shadows_medium = multiple_box_shadow(200)
shadows_big = multiple_box_shadow(100)

css_content = f"""
/* Generated Starry Background CSS */

:root {{
  --shadows-small: {shadows_small};
  --shadows-medium: {shadows_medium};
  --shadows-big: {shadows_big};
}}

[data-theme="dark"] body {{
    background: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%);
    background-attachment: fixed; /* Ensure gradient stays when scrolling */
}}

/* Container for stars to ensure they stay in background and don't affect layout */
.stars-container {{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    overflow: hidden;
    pointer-events: none;
    display: none; /* Hidden by default (Light Mode) */
}}

[data-theme="dark"] .stars-container {{
    display: block; /* Show in Dark Mode */
}}

#stars, #stars2, #stars3 {{
    background: transparent;
}}

#stars {{
    width: 1px;
    height: 1px;
    box-shadow: var(--shadows-small);
    animation: animStar 50s linear infinite;
}}

#stars:after {{
    content: " ";
    position: absolute;
    top: 2000px;
    width: 1px;
    height: 1px;
    background: transparent;
    box-shadow: var(--shadows-small);
}}

#stars2 {{
    width: 2px;
    height: 2px;
    box-shadow: var(--shadows-medium);
    animation: animStar 100s linear infinite;
}}

#stars2:after {{
    content: " ";
    position: absolute;
    top: 2000px;
    width: 2px;
    height: 2px;
    background: transparent;
    box-shadow: var(--shadows-medium);
}}

#stars3 {{
    width: 3px;
    height: 3px;
    box-shadow: var(--shadows-big);
    animation: animStar 150s linear infinite;
}}

#stars3:after {{
    content: " ";
    position: absolute;
    top: 2000px;
    width: 3px;
    height: 3px;
    background: transparent;
    box-shadow: var(--shadows-big);
}}

@keyframes animStar {{
    from {{ transform: translateY(0px); }}
    to {{ transform: translateY(-2000px); }}
}}
"""

with open("stars.css", "w") as f:
    f.write(css_content)

print("stars.css generated successfully.")
