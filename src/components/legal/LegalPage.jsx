import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { FileText } from 'lucide-react'
import { useContent, useLang } from '../../i18n.jsx'
import { Container } from '../ui.jsx'
import { EASE, Reveal, SplitText } from '../../motion/index.jsx'
import legalContent from '../../content/legal.js'
import LegalSection from './LegalSection.jsx'
import { DocsNav, HelpCard, Toc } from './LegalSidebar.jsx'
import useScrollSpy from './useScrollSpy.js'

function PageHeader({ page, legal }) {
  const { to } = useLang()
  return (
    <Container as="header" className="flex flex-col items-start gap-[20px] pt-[40px] pb-[40px] lg:pt-[72px] lg:pb-[56px]">
      <Reveal as="nav" aria-label="Breadcrumb" from="start" distance={20} delay={0.25} duration={0.7}>
        <ol className="flex flex-wrap items-center gap-[8px] font-body text-[14px]">
          <li>
            <Link to={to('/')} className="text-haze transition-colors hover:text-white">
              {legal.home}
            </Link>
          </li>
          <li aria-hidden className="text-dusk">/</li>
          <li className="text-haze">{legal.legal}</li>
          <li aria-hidden className="text-dusk">/</li>
          <li aria-current="page" className="font-medium text-white">
            {page.breadcrumb}
          </li>
        </ol>
      </Reveal>
      <SplitText
        as="h1"
        text={page.title}
        delay={0.35}
        stagger={0.06}
        className="max-w-[900px] font-display text-[38px] font-medium leading-[1.08] tracking-[-0.9px] text-white sm:text-[48px] lg:text-[60px] rtl:leading-[1.35] rtl:tracking-normal"
      />
      <Reveal delay={0.55} duration={0.8} className="max-w-[760px] font-body text-[16px] leading-[1.58] text-cloud sm:text-[18px] rtl:leading-[1.7]">
        <p>{page.intro}</p>
      </Reveal>
      <Reveal from="scale" delay={0.7} duration={0.6}>
        <p className="inline-flex items-center gap-[8px] rounded-full border border-white/12 bg-white/[0.06] px-[14px] py-[8px] font-body text-[14px] font-medium text-white backdrop-blur-sm">
          <FileText className="size-[16px] shrink-0 text-gold" strokeWidth={2} aria-hidden />
          {page.updated}
        </p>
      </Reveal>
    </Container>
  )
}

/**
 * Shared layout for the legal pages: page header, sticky sidebar (document links, scroll-spy
 * table of contents, help card) and the white document panel with numbered sections.
 * `lead` renders above the first section (e.g. the license certificate card).
 */
export default function LegalPage({ content, lead }) {
  const page = useContent(content)
  const legal = useContent(legalContent)
  const reduce = useReducedMotion()
  const [active, scrollTo] = useScrollSpy(page.sections.map((s) => s.id))

  useEffect(() => {
    if (page.pageTitle) document.title = page.pageTitle
  }, [page.pageTitle])

  return (
    <div className="relative">
      {/* Figma "Glow": 1100×800 sky radial (16% → 0) behind the header */}
      <div aria-hidden className="pointer-events-none absolute -end-[260px] -top-[524px] h-[800px] w-[1100px] max-lg:-end-[520px]">
        <div className="size-full animate-float-slow rounded-full bg-[radial-gradient(closest-side,rgba(3,199,252,0.16),rgba(3,199,252,0))]" />
      </div>

      <PageHeader page={page} legal={legal} />

      <Container className="grid grid-cols-1 gap-[24px] pb-[80px] lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-[32px] lg:pb-[120px]">
        <motion.div
          className="flex flex-col gap-[20px] lg:sticky lg:top-[112px] lg:max-h-[calc(100vh-128px)] lg:self-start lg:overflow-y-auto lg:[scrollbar-width:none] lg:[&::-webkit-scrollbar]:hidden"
          initial={reduce ? false : { opacity: 0, x: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
        >
          <DocsNav legal={legal} current={page.docKey} />
          <Toc label={legal.toc} sections={page.sections} active={active} onSelect={scrollTo} />
          <HelpCard help={legal.help} className="max-lg:hidden" />
        </motion.div>

        <motion.article
          className="flex min-w-0 flex-col gap-[32px] rounded-[20px] bg-white p-[20px] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.5)] sm:rounded-[28px] sm:p-[36px] lg:gap-[40px] lg:p-[56px]"
          initial={reduce ? false : { opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.45 }}
        >
          {lead}
          {page.sections.map((section, i) => (
            <LegalSection key={section.id} section={section} index={i} divider={Boolean(lead) || i > 0} />
          ))}
        </motion.article>

        <HelpCard help={legal.help} className="lg:hidden" />
      </Container>
    </div>
  )
}
