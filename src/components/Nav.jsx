import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import logoMark from '../assets/svg/logo-mark.svg'
import common from '../content/common.js'
import { basePath, ROUTES, useContent, useLang } from '../i18n.jsx'
import { EASE } from '../motion/index.jsx'
import { Button } from './ui.jsx'

const LINKS = [
  ['home', ROUTES.home],
  ['deployments', ROUTES.deployments],
  ['about', ROUTES.about],
  ['contact', ROUTES.contact],
]

export function Brand({ size = 64, compact = false }) {
  const { brand } = useContent(common)
  const { to, isRtl } = useLang()
  return (
    <Link to={to('/')} className="group flex items-center gap-[14px]" aria-label={brand.name}>
      <motion.img
        src={logoMark}
        alt=""
        className="shrink-0"
        style={{ width: size, height: size }}
        whileHover={{ rotate: isRtl ? -12 : 12, scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 260, damping: 14 }}
      />
      <span className={`flex flex-col gap-[2px] whitespace-nowrap ${compact ? 'max-sm:hidden' : ''}`}>
        <span className="font-display text-[19px] font-semibold leading-[1.2] text-white sm:text-[22px]">{brand.name}</span>
        <span className="font-body text-[13px] tracking-[0.28px] text-sky sm:text-[14px] rtl:tracking-normal">{brand.tagline}</span>
      </span>
    </Link>
  )
}

export function LanguageToggle() {
  const { lang } = useLang()
  const { pathname, hash } = useLocation()
  const base = basePath(pathname)
  const enPath = base + hash
  const arPath = (base === '/' ? '/ar' : `/ar${base}`) + hash
  const pill = 'relative z-10 rounded-full px-[12px] py-[6px] leading-none transition-colors duration-300'
  return (
    <div className="relative flex items-center gap-[2px] rounded-full border border-white/20 p-[4px]">
      {[
        ['en', enPath, 'EN', 'font-body text-[14px] font-medium'],
        ['ar', arPath, 'عربي', 'font-arabic text-[15px] font-semibold'],
      ].map(([code, href, label, font]) => (
        <Link key={code} to={href} className={`${pill} ${font} ${lang === code ? 'text-white' : 'text-cloud hover:text-white'}`} lang={code} hrefLang={code}>
          {lang === code && (
            <motion.span layoutId="lang-pill" className="absolute inset-0 -z-10 rounded-full bg-white/12" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
          )}
          {label}
        </Link>
      ))}
    </div>
  )
}

export default function Nav() {
  const { nav } = useContent(common)
  const { to, lang } = useLang()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    setHidden(y > 420 && y > prev && !open)
  })

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden ? '-110%' : '0%' }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <div
          className={`transition-[background-color,backdrop-filter,box-shadow,border-color] duration-500 ${
            scrolled ? 'border-b border-white/[0.07] bg-ink/75 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl' : 'border-b border-transparent'
          }`}
        >
          <motion.nav
            className={`mx-auto flex w-full max-w-[1440px] items-center justify-between px-4 transition-[padding] duration-500 sm:px-8 lg:px-[62px] ${
              scrolled ? 'py-[12px]' : 'pt-[28px] pb-[12px]'
            }`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <Brand size={scrolled ? 52 : 64} compact />

            <ul className="hidden items-center gap-[40px] lg:flex">
              {LINKS.map(([key, path]) => (
                <li key={key}>
                  <NavLink to={to(path)} end className="group flex flex-col items-center gap-[6px]">
                    {({ isActive }) => (
                      <>
                        <span className={`font-body text-[17px] font-medium transition-colors duration-300 ${isActive ? 'text-white' : 'text-cloud group-hover:text-white'}`}>
                          {nav[key]}
                        </span>
                        <span className="relative h-[2px] w-[18px]">
                          {isActive ? (
                            <motion.span layoutId={`nav-underline-${lang}`} className="absolute inset-0 rounded-[2px] bg-gold" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                          ) : (
                            <span className="absolute inset-0 origin-center scale-x-0 rounded-[2px] bg-gold/60 transition-transform duration-300 group-hover:scale-x-100" />
                          )}
                        </span>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-[12px] sm:gap-[16px]">
              <LanguageToggle />
              <div className="hidden sm:block">
                <Button to="/contact" arrow={false}>
                  {nav.cta}
                </Button>
              </div>
              <button
                type="button"
                className="inline-flex size-[44px] items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 lg:hidden"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-label={open ? nav.close : nav.menu}
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </motion.nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-ink/95 px-6 pt-[120px] pb-10 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0, clipPath: 'circle(0% at 90% 5%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 90% 5%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 90% 5%)' }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <motion.ul
              className="flex flex-col gap-2"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } } }}
            >
              {LINKS.map(([key, path]) => (
                <motion.li key={key} variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { ease: EASE, duration: 0.6 } } }}>
                  <NavLink
                    to={to(path)}
                    end
                    className={({ isActive }) =>
                      `block border-b border-white/10 py-4 font-display text-[32px] font-medium ${isActive ? 'text-gold' : 'text-white'}`
                    }
                  >
                    {nav[key]}
                  </NavLink>
                </motion.li>
              ))}
            </motion.ul>
            <motion.div className="mt-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, ease: EASE }}>
              <Button to="/contact" magnetic={false} className="w-full">
                {nav.cta}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
