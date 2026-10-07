import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Dev-only escape hatch: with ALLOW_MISSING_ASSETS=1, imports of asset files that don't exist yet
 * resolve to an empty string instead of failing the build.
 */
function allowMissingAssets() {
  return {
    name: 'allow-missing-assets',
    enforce: 'pre',
    resolveId(source, importer) {
      if (!process.env.ALLOW_MISSING_ASSETS || !importer || !/\.(svg|png|jpe?g|webp)$/.test(source)) return null
      const full = resolve(dirname(importer), source)
      return existsSync(full) ? null : `\0missing-asset:${full}`
    },
    load(id) {
      if (id.startsWith('\0missing-asset:')) return 'export default ""'
      return null
    },
  }
}

/**
 * SEO pre-rendering: injects the page's <head> (title, description, keywords, canonical, hreflang,
 * Open Graph, Twitter, JSON-LD) into index.html, then writes a copy for every route in both languages
 * (dist/about.html, dist/ar/about.html, …) plus sitemap.xml and robots.txt.
 * Search engines and social previews get the right tags for each URL without running JavaScript.
 */
function seoPages(siteUrl) {
  let seo
  const load = async () => (seo ??= await import('./src/content/seo.js'))
  const noscript = (s, lang, key) => {
    const page = s.default[lang].pages[key]
    const links = Object.keys(s.SEO_ROUTES)
      .map((k) => `<a href="${s.pageUrl(siteUrl, lang, k)}">${s.default[lang].pages[k].title.split(' | ')[0]}</a>`)
      .join(' · ')
    return `<noscript><h1>${page.title}</h1><p>${page.description}</p><nav>${links}</nav></noscript>`
  }
  const render = (s, html, lang, key) =>
    html
      .replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, `<!--seo:start-->\n${s.renderHead(s.headFor(siteUrl, lang, key))}\n    <!--seo:end-->`)
      .replace(/<!--seo:noscript-->|<noscript>[\s\S]*?<\/noscript>/, noscript(s, lang, key))
      .replace(/<html lang="[^"]*" dir="[^"]*">/, `<html lang="${lang}" dir="${lang === 'ar' ? 'rtl' : 'ltr'}">`)

  let outDir
  return {
    name: 'seo-pages',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    async transformIndexHtml(html) {
      return render(await load(), html, 'en', 'home')
    },
    async closeBundle() {
      if (!existsSync(resolve(outDir, 'index.html'))) return
      const s = await load()
      const base = readFileSync(resolve(outDir, 'index.html'), 'utf8')
      const urls = []
      for (const lang of ['en', 'ar']) {
        for (const [key, path] of Object.entries(s.SEO_ROUTES)) {
          // "/" -> index.html, "/about" -> about.html, "/ar" -> ar.html, "/ar/about" -> ar/about.html
          const rel = lang === 'ar' ? `ar${path === '/' ? '' : path}` : path.slice(1)
          const file = resolve(outDir, rel ? `${rel}.html` : 'index.html')
          mkdirSync(dirname(file), { recursive: true })
          writeFileSync(file, render(s, base, lang, key))
          urls.push({ loc: s.pageUrl(siteUrl, lang, key), key })
        }
      }
      const today = new Date().toISOString().slice(0, 10)
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map(
    ({ loc, key }) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${key === 'privacy' || key === 'terms' ? 'yearly' : 'monthly'}</changefreq>
    <priority>${key === 'home' ? '1.0' : key === 'privacy' || key === 'terms' ? '0.3' : '0.8'}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${s.pageUrl(siteUrl, 'en', key)}" />
    <xhtml:link rel="alternate" hreflang="ar" href="${s.pageUrl(siteUrl, 'ar', key)}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${s.pageUrl(siteUrl, 'en', key)}" />
  </url>`,
  )
  .join('\n')}
</urlset>
`
      writeFileSync(resolve(outDir, 'sitemap.xml'), sitemap)
      writeFileSync(resolve(outDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`)
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = (env.VITE_SITE_URL || 'https://gulfhorizon.net').replace(/\/$/, '')
  return {
    plugins: [allowMissingAssets(), react(), tailwindcss(), seoPages(siteUrl)],
  }
})
