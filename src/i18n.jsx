import { createContext, useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const LangContext = createContext({ lang: 'en', dir: 'ltr' })

/** Route paths shared by both languages. Arabic pages live under /ar. */
export const ROUTES = {
  home: '/',
  deployments: '/deployments',
  about: '/about',
  contact: '/contact',
  license: '/dmw-license',
  privacy: '/privacy',
  terms: '/terms',
}

export function langFromPath(pathname) {
  return pathname === '/ar' || pathname.startsWith('/ar/') ? 'ar' : 'en'
}

/** Strip the language prefix: "/ar/about" -> "/about". */
export function basePath(pathname) {
  if (langFromPath(pathname) === 'ar') return pathname.slice(3) || '/'
  return pathname
}

export function LangProvider({ children }) {
  const { pathname } = useLocation()
  const lang = langFromPath(pathname)
  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
  }, [lang, dir])

  return <LangContext.Provider value={{ lang, dir }}>{children}</LangContext.Provider>
}

export function useLang() {
  const { lang, dir } = useContext(LangContext)
  const isRtl = dir === 'rtl'
  /** Build a link for the current language. */
  const to = (path) => (lang === 'ar' ? (path === '/' ? '/ar' : `/ar${path}`) : path)
  return { lang, dir, isRtl, to }
}

/** Pick the current language's copy from a `{ en, ar }` content module. */
export function useContent(content) {
  const { lang } = useLang()
  return content[lang] ?? content.en
}
