import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const pages = [
  ...fs.readdirSync(root).filter((name) => name.endsWith('.html')),
  ...fs.readdirSync(path.join(root, 'ro')).filter((name) => name.endsWith('.html')).map((name) => `ro/${name}`),
].sort();

const failures = [];
const documents = new Map();

const fail = (file, message) => failures.push(`${file}: ${message}`);
const textBetween = (html, tag) => [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'gi'))].map((match) => match[1].replace(/<[^>]+>/g, '').trim());
const tags = (html, tag) => [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>`, 'gi'))].map((match) => match[0]);
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([:\w-]+)\s*=\s*(["'])(.*?)\2/gs)].map((match) => [match[1].toLowerCase(), match[3]]));
const findMeta = (html, key, value) => tags(html, 'meta').map(attrs).find((item) => item[key] === value)?.content;
const findLink = (html, rel) => tags(html, 'link').map(attrs).filter((item) => item.rel?.split(/\s+/).includes(rel));
const normalizeText = (value = '') => value.replace(/\s+/g, ' ').trim();
const pageUrl = (file) => `https://layero.ro/${file.replaceAll('\\', '/')}`;

for (const file of pages) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  const staticHtml = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
  const title = normalizeText(textBetween(html, 'title')[0]);
  const description = normalizeText(findMeta(html, 'name', 'description'));
  const canonicalTags = findLink(html, 'canonical');
  const canonical = canonicalTags[0]?.href;
  const robots = findMeta(html, 'name', 'robots');
  const h1s = textBetween(html, 'h1');
  const imageTags = tags(staticHtml, 'img').map(attrs);
  const alternates = Object.fromEntries(findLink(html, 'alternate').filter((item) => item.hreflang).map((item) => [item.hreflang, item.href]));

  if (textBetween(html, 'title').length !== 1) fail(file, `expected one title, found ${textBetween(html, 'title').length}`);
  if (!title || title.length < 25 || title.length > 65) fail(file, `title length ${title.length}: ${title}`);
  if (!description || description.length < 70 || description.length > 165) fail(file, `description length ${description.length}`);
  if (canonicalTags.length !== 1 || !canonical) fail(file, `expected one canonical, found ${canonicalTags.length}`);
  if (!robots?.toLowerCase().includes('index') || !robots?.toLowerCase().includes('follow')) fail(file, `robots must contain index,follow: ${robots}`);
  if (h1s.length !== 1 || !normalizeText(h1s[0])) fail(file, `expected one non-empty h1, found ${h1s.length}`);
  imageTags.forEach((image, index) => {
    if (!Object.hasOwn(image, 'alt')) fail(file, `image ${index + 1} is missing alt`);
    if (image.src && (!image.width || !image.height)) fail(file, `image ${index + 1} is missing intrinsic width/height (${image.src})`);
  });

  const ogTitle = findMeta(html, 'property', 'og:title');
  const ogDescription = findMeta(html, 'property', 'og:description');
  const ogUrl = findMeta(html, 'property', 'og:url');
  const twitterTitle = findMeta(html, 'name', 'twitter:title');
  const twitterDescription = findMeta(html, 'name', 'twitter:description');
  if (ogTitle !== title) fail(file, 'og:title does not match title');
  if (ogDescription !== description) fail(file, 'og:description does not match meta description');
  if (ogUrl !== canonical) fail(file, 'og:url does not match canonical');
  if (twitterTitle !== title) fail(file, 'twitter:title does not match title');
  if (twitterDescription !== description) fail(file, 'twitter:description does not match meta description');

  const expectedHu = file.startsWith('ro/') ? pageUrl(file.slice(3)) : canonical;
  const expectedRo = file.startsWith('ro/') ? canonical : file === 'index.html' ? 'https://layero.ro/ro/' : pageUrl(`ro/${file}`);
  const expectedDefault = expectedRo;
  if (alternates.hu !== expectedHu) fail(file, `invalid hu hreflang: ${alternates.hu}`);
  if (alternates.ro !== expectedRo) fail(file, `invalid ro hreflang: ${alternates.ro}`);
  if (alternates['x-default'] !== expectedDefault) fail(file, `invalid x-default hreflang: ${alternates['x-default']}`);

  const jsonBlocks = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  if (jsonBlocks.length === 0) fail(file, 'missing JSON-LD');
  const graphItems = [];
  jsonBlocks.forEach((match, index) => {
    try {
      const parsed = JSON.parse(match[1]);
      graphItems.push(...(parsed['@graph'] ?? [parsed]));
    } catch (error) {
      fail(file, `invalid JSON-LD block ${index + 1}: ${error.message}`);
    }
  });
  const ids = new Set(graphItems.map((item) => item?.['@id']).filter(Boolean));
  const duplicateIds = graphItems.map((item) => item?.['@id']).filter((id, index, all) => id && all.indexOf(id) !== index);
  if (duplicateIds.length) fail(file, `duplicate JSON-LD IDs: ${[...new Set(duplicateIds)].join(', ')}`);
  const webpage = graphItems.find((item) => ['WebPage', 'CollectionPage', 'AboutPage', 'ContactPage'].includes(item?.['@type']));
  if (!webpage) fail(file, 'missing WebPage-compatible schema');
  if (webpage?.url !== canonical) fail(file, 'schema page URL does not match canonical');
  if (webpage?.name !== title) fail(file, 'schema page name does not match title');
  if (webpage?.description !== description) fail(file, 'schema page description does not match description');
  for (const property of ['breadcrumb', 'mainEntity']) {
    const ref = webpage?.[property]?.['@id'];
    if (ref && !ids.has(ref)) fail(file, `unresolved schema ${property} reference: ${ref}`);
  }

  documents.set(file.replaceAll('\\', '/'), { html, title, description, canonical, alternates, graphItems });
}

for (const [file, document] of documents) {
  const base = new URL(document.canonical || pageUrl(file));
  const staticHtml = document.html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
  const resourceTags = [...tags(staticHtml, 'a'), ...tags(staticHtml, 'img'), ...tags(document.html, 'script'), ...tags(staticHtml, 'link'), ...tags(staticHtml, 'source')];
  const references = [];
  for (const tag of resourceTags) {
    const item = attrs(tag);
    if (item.href) references.push(item.href);
    if (item.src) references.push(item.src);
    if (item.srcset) references.push(...item.srcset.split(',').map((part) => part.trim().split(/\s+/)[0]));
  }
  for (const reference of references) {
    if (!reference || /^(?:mailto:|tel:|data:|javascript:)/i.test(reference)) continue;
    let url;
    try { url = new URL(reference, base); } catch { fail(file, `invalid URL: ${reference}`); continue; }
    if (url.hostname !== 'layero.ro') continue;
    let pathname = decodeURIComponent(url.pathname).replace(/^\//, '');
    if (!pathname) pathname = 'index.html';
    if (pathname.endsWith('/')) pathname += 'index.html';
    const targetPath = path.join(root, ...pathname.split('/'));
    if (!fs.existsSync(targetPath)) {
      fail(file, `broken internal reference: ${reference} -> ${pathname}`);
      continue;
    }
    if (url.hash && targetPath.endsWith('.html')) {
      const targetHtml = fs.readFileSync(targetPath, 'utf8');
      const id = decodeURIComponent(url.hash.slice(1)).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (!new RegExp(`(?:id|name)=["']${id}["']`, 'i').test(targetHtml)) fail(file, `missing anchor target: ${reference}`);
    }
  }
}

for (const field of ['title', 'description', 'canonical']) {
  const values = [...documents.entries()].map(([file, document]) => [file, document[field]]);
  for (const [file, value] of values) {
    const duplicates = values.filter(([, candidate]) => candidate === value);
    if (value && duplicates.length > 1) fail(file, `duplicate ${field}: ${duplicates.map(([candidate]) => candidate).join(', ')}`);
  }
}

for (const [file, document] of documents) {
  const pair = file.startsWith('ro/') ? file.slice(3) : `ro/${file}`;
  const paired = documents.get(pair);
  if (!paired) fail(file, `missing translated pair: ${pair}`);
  if (paired && paired.alternates[file.startsWith('ro/') ? 'ro' : 'hu'] !== document.canonical) fail(file, `hreflang is not reciprocal with ${pair}`);
}

if (failures.length) {
  console.error(`SEO audit failed with ${failures.length} issue(s):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`SEO audit passed: ${pages.length} pages, ${[...documents.values()].reduce((sum, document) => sum + document.graphItems.length, 0)} schema nodes, no broken static references.`);
