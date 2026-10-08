# Layero Presentation Site

Static HTML/CSS/JS presentation website for Layero.

## Brand and search update — 2026-10-08

The header and footer use the Layero icon and wordmark from the live shop, with the SHOP subtitle removed and the wordmark centered beside the icon. The dark-background variant is displayed on the website; the light-background variant identifies the business in Organization structured data. Browser and app icons reuse the same vector mark.

Hungarian and Romanian pages include consistent business information, service topics, local service descriptions, matching metadata and reciprocal language links. The FAQ pages answer real ordering questions in static HTML and include matching FAQPage data. This does not imply eligibility for a Google FAQ rich result or guarantee search rankings.

Run the local checks with `node seo-audit.mjs`. The audit covers all 20 public pages, metadata, internal references, business logo, FAQ text, language links, app icons and page sitemap coverage.

Upload `exports/layero-site-fixes-20261008.zip` into the existing site's document root, preserving paths and including `.htaccess`. This supersedes the earlier logo/SEO package and includes the gallery and Romanian interface fixes. It contains the changed public pages and brand assets, not a standalone copy of the entire website. Existing images, videos and JavaScript remain necessary. Check the live HTTPS redirect, both homepage languages, the FAQ language switcher, icons and `sitemap.xml` after upload. Then submit `https://layero.ro/sitemap.xml` in Google Search Console and Bing Webmaster Tools. The existing `seo-submit-indexnow.ps1` can notify IndexNow after the changed URLs are live.

Google's AI search features use the same SEO foundations as Search; no special AI text file is required. ChatGPT search access is explicitly allowed through the shared robots.txt rules for OAI-SearchBot. Hosting or CDN rules must also allow crawler access. References: [Google AI features](https://developers.google.com/search/docs/appearance/ai-features), [Organization logo](https://developers.google.com/search/docs/appearance/structured-data/organization), [OpenAI crawlers](https://developers.openai.com/api/docs/bots).

## Project contents

### Review fixes and open items — 2026-10-08

Fixed the Romanian mobile menu labels, corporate-page wording and quantity units. Gallery video panels now respect their hidden state and expose the selected sub-filter to assistive technology. The workshop placeholder links to the existing workshop photos. Newsletter and quote-request behavior are unchanged at the owner's request; business statistics and reviews were confirmed by the owner and retained.

Open items to resolve before treating the integrations as complete:

- Newsletter: connect both the homepage community form and the newsletter modal to the chosen subscription service; handle confirmed success, failure, consent and unsubscribe. Currently the community form only changes its view, while the modal stores data in the visitor's browser.
- Quote requests: choose a server-side endpoint or form service for the contact, custom-order and corporate forms; implement delivery confirmation and attachment handling. Current forms use `mailto:` and do not upload files.
- Business details: obtain the operator's legal company name, registered address, tax/company identifiers and the actual data processors/retention rules before completing the terms and privacy information.
- Timing: confirm one general response window (24 hours or 24–48 hours) and production window (about one week or 5–10 working days), with any exceptions for bulk orders.
- Presentation videos: the gallery has production videos, but the presentation-video panel still awaits its actual media.

These are outstanding tasks, not completed integrations. No live deployment, real subscription or outgoing test email was performed during the local review fixes.

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
