# Layero Presentation Site

Static HTML/CSS/JS presentation website for Layero.

## Project contents

- `*.html`, `styles.css`, `script.js`: the live static website.
- `assets/`: optimized images, logos, and visual assets used by the live pages.
- `source_build/`: source/reference visual material and text used to rebuild or adjust the design.
- `output/screenshots/`: visual QA screenshots from design and browser checks.

The rest of `output/` is intentionally ignored because it contains local browser profiles, caches, and temporary run artifacts. Those files are not needed to rebuild or run the project.

## Run locally

From the project root:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:8000/index.html
```
