import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { BadgeCheck, FileText, Mail, Phone, ShieldCheck } from 'lucide-react'
import { useLang } from '../../i18n.jsx'
import { EASE } from '../../motion/index.jsx'
import { PHONE_TEL } from '../../content/common.js'

const DOC_ICONS = { license: BadgeCheck, privacy: ShieldCheck, terms: FileText }
const CARD = 'rounded-[20px] border border-white/[0.09] bg-white/[0.04]'

/** "LEGAL" card: links between the three legal documents, current one highlighted in gold. */
export function DocsNav({ legal, current }) {
  const { to } = useLang()
  return (
    <nav aria-label={legal.docsNavLabel} className={`flex flex-col gap-[4px] p-[12px] ${CARD}`}>
      <p className="px-[12px] pt-[6px] pb-[8px] font-body text-[12px] font-medium tracking-[1.2px] text-haze rtl:tracking-normal">{legal.legalLabel}</p>
      {legal.docs.map((doc) => {
        const Icon = DOC_ICONS[doc.key]
        const active = doc.key === current
        return (
          <Link
            key={doc.key}
            to={to(doc.to)}
            aria-current={active ? 'page' : undefined}
            className={`group flex items-center gap-[10px] rounded-[12px] p-[12px] font-body text-[15px] font-medium transition-colors duration-300 ${
              active ? 'bg-gold text-navy shadow-[0_10px_30px_-14px_rgba(231,171,54,0.8)]' : 'text-white hover:bg-white/[0.06]'
            }`}
          >
            <Icon
              className={`size-[18px] shrink-0 transition-transform duration-300 group-hover:scale-110 ${active ? 'text-navy' : 'text-gold'}`}
              strokeWidth={2}
              aria-hidden
            />
            <span>{doc.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

/** "ON THIS PAGE" table of contents with a sliding scroll-spy indicator. */
export function Toc({ label, sections, active, onSelect }) {
  return (
    <nav aria-label={label} className={`flex flex-col px-[24px] py-[20px] ${CARD}`}>
      <p className="pb-[10px] font-body text-[12px] font-medium tracking-[1.2px] text-haze rtl:tracking-normal">{label}</p>
      <ol className="flex flex-col gap-[2px]">
        {sections.map((s, i) => {
          const isActive = s.id === active
          return (
            <li key={s.id} className="relative">
              <span aria-hidden className="absolute inset-y-0 start-0 w-[2px] bg-white/10" />
              {isActive && (
                <motion.span
                  layoutId="legal-toc-indicator"
                  aria-hidden
                  className="absolute inset-y-0 start-0 w-[2px] bg-sky shadow-[0_0_12px_rgba(3,199,252,0.8)]"
                  transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                />
              )}
              <a
                href={`#${s.id}`}
                aria-current={isActive ? 'location' : undefined}
                onClick={(e) => {
                  e.preventDefault()
                  onSelect(s.id)
                }}
                className={`block py-[8px] ps-[14px] font-body text-[14px] leading-[1.4] whitespace-pre-wrap transition-[color,transform] duration-300 rtl:leading-[1.6] ${
                  isActive ? 'font-medium text-white' : 'text-haze hover:translate-x-[3px] hover:text-white rtl:hover:-translate-x-[3px]'
                }`}
              >
                {`${String(i + 1).padStart(2, '0')}  ${s.title}`}
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

/** Gradient "Questions?" card with email + phone. */
export function HelpCard({ help, className = '' }) {
  const reduce = useReducedMotion()
  return (
    <motion.aside
      className={`group relative flex flex-col gap-[12px] overflow-hidden rounded-[20px] bg-gradient-to-r from-teal to-[#0c395d] p-[24px] rtl:bg-gradient-to-l ${className}`}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <span aria-hidden className="pointer-events-none absolute -end-[60px] -top-[60px] size-[180px] animate-float-slow rounded-full bg-[radial-gradient(closest-side,rgba(3,199,252,0.35),transparent)]" />
      <p className="relative font-display text-[22px] font-medium text-white">{help.title}</p>
      <p className="relative font-body text-[14px] leading-[1.5] text-mist">{help.text}</p>
      <a href={`mailto:${help.email}`} className="relative flex w-fit items-center gap-[8px] font-body text-[14px] font-medium text-white transition-colors hover:text-gold">
        <Mail className="size-[16px] shrink-0 text-gold" strokeWidth={2} aria-hidden />
        <span dir="ltr">{help.email}</span>
      </a>
      <a href={PHONE_TEL} className="relative flex w-fit items-center gap-[8px] font-body text-[14px] font-medium text-white transition-colors hover:text-gold">
        <Phone className="size-[16px] shrink-0 text-gold" strokeWidth={2} aria-hidden />
        <span dir="ltr">{help.phone}</span>
      </a>
    </motion.aside>
  )
}
