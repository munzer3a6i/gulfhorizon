import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { headFor, SEO_ROUTES, SITE_URL_DEFAULT } from '../content/seo.js'
import { basePath, langFromPath } from '../i18n.jsx'

export const SITE_URL = (import.meta.env.VITE_SITE_URL || SITE_URL_DEFAULT).replace(/\/$/, '')

const KEY_BY_PATH = Object.fromEntries(Object.entries(SEO_ROUTES).map(([k, p]) => [p, k]))

function upsert(selector, create, attrs) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v)
}

const meta = (attr, key, content) => upsert(`meta[${attr}="${key}"]`, () => document.createElement('meta'), { [attr]: key, content })

/**
 * Keeps <head> (title, description, keywords, canonical, hreflang, Open Graph, Twitter, JSON-LD)
 * in sync with the current route during client-side navigation. The first load already has the
 * right tags baked into the HTML by the build.
 */
export default function Seo() {
  const { pathname } = useLocation()
  const lang = langFromPath(pathname)
  const key = KEY_BY_PATH[basePath(pathname).replace(/\/$/, '') || '/'] ?? 'home'

  useEffect(() => {
    const h = headFor(SITE_URL, lang, key)
    document.title = h.title
    meta('name', 'description', h.description)
    meta('name', 'keywords', h.keywords)
    for (const [k, v] of Object.entries(h.og)) meta('property', k, v)
    for (const [k, v] of Object.entries(h.twitter)) meta('name', k, v)
    upsert('link[rel="canonical"]', () => document.createElement('link'), { rel: 'canonical', href: h.canonical })
    for (const [l, href] of Object.entries(h.alternates)) {
      upsert(`link[rel="alternate"][hreflang="${l}"]`, () => document.createElement('link'), { rel: 'alternate', hreflang: l, href })
    }
    upsert('script[type="application/ld+json"]', () => Object.assign(document.createElement('script'), { type: 'application/ld+json' }), {})
    document.head.querySelector('script[type="application/ld+json"]').textContent = JSON.stringify(h.jsonLd)
  }, [lang, key])

  return null
}
