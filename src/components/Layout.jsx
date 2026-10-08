import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'
import Nav from './Nav.jsx'
import Footer from './Footer.jsx'
import Seo from './Seo.jsx'
import WhatsAppButton from './WhatsAppButton.jsx'
import { EASE, ScrollProgress } from '../motion/index.jsx'

/** Scroll to top on navigation, or to the #hash target when present. */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 350)
      return () => clearTimeout(t)
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}

/**
 * Page shell: fixed nav, page content (with an enter animation and a sweeping curtain),
 * footer. `children` is the page body; the nav height is reserved by a spacer.
 */
export default function Layout({ children }) {
  const { pathname } = useLocation()
  return (
    <div className="relative min-h-screen overflow-x-clip bg-ink">
      <ScrollManager />
      <Seo />
      <ScrollProgress />
      <Nav />
      <motion.div
        key={`curtain-${pathname}`}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[70] origin-top bg-gradient-to-b from-[#0c395d] to-ink"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}
      />
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
        className="relative pt-[88px] lg:pt-[104px]"
      >
        {children}
      </motion.main>
      <Footer />
      <WhatsAppButton />
      <Analytics route={pathname} path={pathname} />
    </div>
  )
}
