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

For local network testing, bind the server to all interfaces:

```powershell
python -m http.server 8000 --bind 0.0.0.0
```

Open the site from another device with your machine's LAN IP, for example:

```text
http://192.168.1.20:8000/index.html
```

## Local debug inspect mode

The inspect/content protection is disabled by default on local addresses (`localhost`, `127.*`, `10.*`, `172.16.*`-`172.31.*`, `192.168.*`, `.local`, `.lan`, `.home.arpa`, or a local machine name). Public hosts keep the normal protection.

Force debug mode on:

```text
http://192.168.1.20:8000/index.html?debug=on
```

Turn debug mode off:

```text
http://192.168.1.20:8000/index.html?debug=off
```

`?debugg=on` and `?debugg=off` work too. When debug mode is on, the browser console also exposes `layeroDebug.on()`, `layeroDebug.off()`, `layeroDebug.status()`, and the shorter `debugg` alias.

On Apache, when the normal inspect guard is triggered, the page sets a short-lived `layero_inspect_lock=1` cookie. While that cookie is present, `.htaccess` serves `inspect-lock.html` for HTML refreshes instead of the full page response. This keeps normal loads unchanged and reduces what appears in DevTools Network after an inspect-triggered reload.
