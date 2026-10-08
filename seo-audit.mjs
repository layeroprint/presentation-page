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
const translatedPairs = {
  'gyakori-kerdesek.html': 'ro/intrebari-frecvente.html',
  'ro/intrebari-frecvente.html': 'gyakori-kerdesek.html',
};
const translatedFile = (file) => translatedPairs[file] ?? (file.startsWith('ro/') ? file.slice(3) : `ro/${file}`);

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

  const expectedHu = file.startsWith('ro/') ? pageUrl(translatedFile(file)) : canonical;
  const expectedRo = file.startsWith('ro/') ? canonical : file === 'index.html' ? 'https://layero.ro/ro/' : pageUrl(translatedFile(file));
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

  const organization = graphItems.find((item) => item?.['@type'] === 'Organization');
  if (!organization) fail(file, 'missing Organization schema');
  const logo = organization?.logo;
  if (logo?.url !== 'https://layero.ro/assets/brand/layero-logo-primary.svg' || logo?.width < 112 || logo?.height < 112) fail(file, 'Organization must use the Layero logo with valid dimensions');
  if (!organization?.description || !organization?.knowsAbout?.length) fail(file, 'missing business description or service topics');
  if (webpage?.about?.['@id'] !== organization?.['@id']) fail(file, 'page is not linked to the business entity');
  const brandedImages = imageTags.filter((item) => item.class?.split(/\s+/).includes('logo__image'));
  if (brandedImages.length < 2 || brandedImages.some((item) => !item.src?.endsWith('assets/brand/layero-logo-on-dark.svg'))) fail(file, 'header and footer must use the Layero logo');
  const faq = graphItems.find((item) => item?.['@type'] === 'FAQPage');
  if (faq) {
    const details = [...staticHtml.matchAll(/<details\b[^>]*>([\s\S]*?)<\/details>/gi)].map((match) => ({
      question: normalizeText(textBetween(match[1], 'summary')[0]),
      answer: normalizeText(textBetween(match[1], 'p')[0]),
    }));
    if (faq.mainEntity?.length !== details.length || details.length < 1) fail(file, 'FAQ schema count does not match visible questions');
    faq.mainEntity?.forEach((question, index) => {
      if (normalizeText(question.name) !== details[index]?.question || normalizeText(question.acceptedAnswer?.text) !== details[index]?.answer) fail(file, `FAQ question ${index + 1} does not match the visible text`);
    });
    const languageLinks = tags(staticHtml, 'a').map(attrs).filter((item) => ['hu', 'ro'].includes(item.lang));
    for (const link of languageLinks) {
      if (new URL(link.href, canonical).href !== alternates[link.lang]) fail(file, `language switcher does not match ${link.lang} hreflang`);
    }
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
  const pair = translatedFile(file);
  const paired = documents.get(pair);
  if (!paired) fail(file, `missing translated pair: ${pair}`);
  if (paired && paired.alternates[file.startsWith('ro/') ? 'ro' : 'hu'] !== document.canonical) fail(file, `hreflang is not reciprocal with ${pair}`);
}

const sitemap = fs.readFileSync(path.join(root, 'sitemap-pages.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (new Set(sitemapUrls).size !== sitemapUrls.length) fail('sitemap-pages.xml', 'duplicate page URLs');
for (const [file, document] of documents) {
  if (!sitemapUrls.includes(document.canonical)) fail(file, 'canonical URL missing from sitemap');
}
for (const url of sitemapUrls) {
  if (![...documents.values()].some((document) => document.canonical === url)) fail('sitemap-pages.xml', `URL has no canonical page: ${url}`);
}
for (const file of ['site.webmanifest', 'ro/site.webmanifest']) {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
  for (const icon of manifest.icons) {
    if (!fs.existsSync(path.join(root, icon.src.replace(/^\//, '')))) fail(file, `missing app icon: ${icon.src}`);
  }
}

if (failures.length) {
  console.error(`SEO audit failed with ${failures.length} issue(s):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`SEO audit passed: ${pages.length} pages, ${[...documents.values()].reduce((sum, document) => sum + document.graphItems.length, 0)} schema nodes, no broken static references.`);
