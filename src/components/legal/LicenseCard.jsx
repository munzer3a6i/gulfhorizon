import { motion, useReducedMotion } from 'framer-motion'
import { BadgeCheck } from 'lucide-react'
import { EASE, Tilt } from '../../motion/index.jsx'

/** "License details" certificate card at the top of the DMW License page: tilt, shimmer, live status dot. */
export default function LicenseCard({ card }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 40, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
    >
      <Tilt max={3} className="rounded-[22px]">
        <article className="relative flex flex-col gap-[24px] overflow-hidden rounded-[22px] bg-gradient-to-r from-ink to-[#0c395d] p-[20px] shadow-[0_30px_60px_-30px_rgba(7,26,46,0.55)] sm:p-[32px] rtl:bg-gradient-to-l">
          {/* drifting gold glow (Figma: Ellipse 360×360, gold 40% → 0) */}
          <div aria-hidden className="pointer-events-none absolute -end-[128px] -top-[160px] size-[360px]">
            <div className="size-full animate-float-slow rounded-full bg-[radial-gradient(closest-side,rgba(231,171,54,0.4),rgba(231,171,54,0))]" />
          </div>
          {/* periodic light sweep across the certificate */}
          <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
            <span className="absolute inset-y-0 left-0 w-1/3 animate-shimmer bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" style={{ animationDuration: '7s' }} />
          </span>

          <div className="relative flex flex-col items-start gap-[16px] sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-[14px]">
              <motion.span
                className="relative flex size-[52px] shrink-0 items-center justify-center rounded-[14px] bg-gold text-navy shadow-[0_10px_30px_-10px_rgba(231,171,54,0.8)]"
                initial={reduce ? false : { scale: 0.3, rotate: -40 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 13, delay: 0.85 }}
              >
                <BadgeCheck className="size-[26px]" strokeWidth={1.9} aria-hidden />
              </motion.span>
              <div className="flex min-w-0 flex-col gap-[2px]">
                <p className="font-body text-[12px] font-medium tracking-[1.2px] text-haze rtl:tracking-normal">{card.eyebrow}</p>
                <h2 className="font-display text-[19px] font-medium leading-[1.25] text-white sm:text-[22px]">{card.name}</h2>
              </div>
            </div>
            <span className="inline-flex shrink-0 items-center gap-[8px] rounded-full bg-[rgba(34,197,94,0.16)] px-[14px] py-[8px]">
              <span aria-hidden className="relative flex size-[8px]">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#4ade80]" />
                <span className="relative size-[8px] rounded-full bg-[#4ade80]" />
              </span>
              <span className="font-body text-[14px] font-medium text-[#86efac]">{card.status}</span>
            </span>
          </div>

          <motion.dl
            className="relative grid overflow-hidden rounded-[16px] bg-white/[0.08] gap-px sm:grid-cols-2"
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.9 } } }}
          >
            {card.facts.map((fact) => (
              <motion.div
                key={fact.label}
                className="flex flex-col gap-[6px] bg-[rgba(7,26,46,0.55)] px-[20px] py-[18px] transition-colors duration-300 hover:bg-[rgba(7,26,46,0.35)]"
                variants={{ hidden: reduce ? {} : { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
              >
                <dt className="font-body text-[11px] font-medium tracking-[0.88px] text-haze rtl:tracking-normal">{fact.label}</dt>
                <dd className="font-body text-[16px] font-medium leading-[1.5] text-white rtl:leading-[1.75]">
                  {fact.ltr ? <span dir="ltr">{fact.value}</span> : fact.value}
                </dd>
              </motion.div>
            ))}
          </motion.dl>
        </article>
      </Tilt>
    </motion.div>
  )
}
