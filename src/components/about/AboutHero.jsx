import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { BadgeCheck, Globe, MapPin } from 'lucide-react'
import heroImg from '../../assets/img/about-hero.jpg'
import { Container } from '../ui.jsx'
import { EASE } from '../../motion/index.jsx'

// Time the entrance after the page curtain (Layout) has swept away.
const START = 0.45

function rise(delay, reduce, y = 26) {
  return {
    initial: reduce ? false : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.85, delay, ease: EASE },
  }
}

/** Heading line whose words rise out of a mask one after another, on load. */
function Line({ text, delay, className = '' }) {
  const reduce = useReducedMotion()
  const words = text.split(' ')
  return (
    <span className={`block ${className}`}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-top">
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: '110%', rotate: 5 }}
            animate={{ y: '0%', rotate: 0 }}
            transition={{ duration: 1, delay: delay + i * 0.08, ease: EASE }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  )
}

export default function AboutHero({ t }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const mediaY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 40])
  const badgeIcons = [BadgeCheck, MapPin]
  const altIsArabic = t.altLang === 'ar'

  return (
    <section ref={ref} className="relative">
      <Container className="flex flex-col gap-12 pt-10 pb-20 sm:pt-14 lg:flex-row lg:items-center lg:gap-[88px] lg:pt-[88px] lg:pb-[112px]">
        {/* Copy */}
        <motion.div className="flex min-w-0 flex-1 flex-col items-start gap-6 lg:gap-[28px]" style={reduce ? undefined : { y: copyY }}>
          <motion.div
            {...rise(START, reduce, 16)}
            className="inline-flex items-center gap-[8px] rounded-full border border-[rgba(3,199,252,0.55)] bg-[rgba(3,199,252,0.08)] py-[9px] ps-[14px] pe-[16px]"
          >
            <span className="relative inline-flex size-[7px]" aria-hidden>
              <span className="absolute inset-0 rounded-full bg-sky animate-pulse-ring" />
              <span className="relative size-[7px] rounded-full bg-sky" />
            </span>
            <span className="font-body text-[14px] text-white sm:text-[15px]">{t.eyebrow}</span>
          </motion.div>

          <h1 className="max-w-[640px] font-display text-[46px] font-medium leading-[1.04] tracking-[-1.08px] text-white sm:text-[60px] lg:text-[72px] rtl:leading-[1.35] rtl:tracking-normal">
            <Line text={t.titleLines[0]} delay={START + 0.1} />
            <Line text={t.titleLines[1]} delay={START + 0.3} className="text-gold" />
          </h1>

          <motion.p
            {...rise(START + 0.55, reduce, 14)}
            lang={t.altLang}
            dir={altIsArabic ? 'rtl' : 'ltr'}
            className={`text-[19px] text-gold sm:text-[22px] ${altIsArabic ? 'font-arabic font-semibold' : 'font-body leading-[1.45]'}`}
          >
            {t.alt}
          </motion.p>

          <motion.p {...rise(START + 0.65, reduce)} className="max-w-[600px] font-body text-[16px] leading-[1.6] text-cloud sm:text-[17px] rtl:leading-[1.75]">
            {t.lead}
          </motion.p>
          <motion.p {...rise(START + 0.75, reduce)} className="max-w-[600px] font-body text-[16px] leading-[1.6] text-haze sm:text-[17px] rtl:leading-[1.75]">
            {t.body}
          </motion.p>

          <ul className="flex flex-wrap gap-[12px]">
            {t.badges.map((label, i) => {
              const Icon = badgeIcons[i] ?? BadgeCheck
              return (
                <motion.li
                  key={label}
                  {...rise(START + 0.85 + i * 0.1, reduce, 14)}
                  className="flex items-center gap-[8px] rounded-[12px] border border-white/10 bg-white/5 px-[14px] py-[10px] transition-colors duration-300 hover:border-gold/50 hover:bg-white/[0.08]"
                >
                  <Icon className="size-[18px] text-gold" strokeWidth={2} aria-hidden />
                  <span className="font-body text-[15px] font-medium text-white">{label}</span>
                </motion.li>
              )
            })}
          </ul>
        </motion.div>

        {/* Media: clip-path reveal on load, parallax on scroll */}
        <motion.div className="relative w-full shrink-0 lg:w-[537px]" style={reduce ? undefined : { y: mediaY }}>
          <motion.div
            className="relative h-[420px] overflow-hidden rounded-[24px] sm:h-[500px] lg:h-[560px]"
            initial={reduce ? false : { clipPath: 'inset(100% 0% 0% 0% round 24px)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0% round 24px)' }}
            transition={{ duration: 1.3, delay: START + 0.25, ease: EASE }}
          >
            <motion.div className="absolute inset-x-0 -top-[8%] h-[116%]" style={reduce ? undefined : { y: imgY }}>
              <motion.img
                src={heroImg}
                alt={t.imageAlt}
                className="size-full object-cover"
                initial={reduce ? false : { scale: 1.3 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.8, delay: START + 0.25, ease: EASE }}
              />
            </motion.div>
            <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[rgba(7,26,46,0)] from-30% to-[rgba(7,26,46,0.92)]" />
          </motion.div>

          {/* Floating glass stat */}
          <motion.div
            className="absolute start-4 end-4 bottom-[22px] sm:end-auto sm:start-[28px] sm:bottom-[30px]"
            initial={reduce ? false : { opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: START + 1.1, ease: EASE }}
          >
            <motion.div
              className="flex items-center gap-[14px] rounded-[16px] border border-white/[0.22] bg-white/10 py-[14px] ps-[14px] pe-[22px] backdrop-blur-[8px]"
              animate={reduce ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: START + 2 }}
            >
              <span className="flex size-[44px] shrink-0 items-center justify-center rounded-[12px] bg-gold text-navy">
                <Globe className="size-[22px] animate-spin-slow" strokeWidth={1.8} aria-hidden />
              </span>
              <span className="flex min-w-0 flex-col gap-[2px]">
                <span className="font-display text-[17px] font-semibold text-white sm:text-[18px]">{t.glass.title}</span>
                <span className="font-body text-[12px] text-white/70 sm:text-[13px]">{t.glass.detail}</span>
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
