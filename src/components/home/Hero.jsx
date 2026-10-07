import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Clock } from 'lucide-react'
import heroPhoto from '../../assets/img/hero-home.jpg'
import glowSky from '../../assets/svg/glow-sky.svg'
import glowSand from '../../assets/svg/glow-sand.svg'
import avatar1 from '../../assets/img/logo-cb35568e39.png'
import avatar2 from '../../assets/img/logo-3d3cffd7c1.png'
import avatar3 from '../../assets/img/logo-118521a2ca.png'
import avatar4 from '../../assets/img/logo-e4424934c5.png'
import { Button, Container } from '../ui.jsx'
import { EASE, Glow, SplitText } from '../../motion/index.jsx'

const AVATARS = [
  { src: avatar1, contain: false },
  { src: avatar2, contain: true },
  { src: avatar3, contain: true },
  { src: avatar4, contain: false },
]

/** Fade-up on page load (not on scroll) for the hero's staggered entrance. */
function Enter({ delay = 0, y = 24, className, children, as = 'div' }) {
  const reduce = useReducedMotion()
  const Comp = motion[as] ?? motion.div
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </Comp>
  )
}

export default function Hero({ t }) {
  const mediaRef = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: mediaRef, offset: ['start end', 'end start'] })
  const photoY = useTransform(scrollYProgress, [0, 1], ['-9%', '9%'])
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -40])

  return (
    <section className="relative">
      <Glow src={glowSky} className="-top-[484px] -end-[280px] size-[700px] sm:size-[1100px] max-sm:-end-[300px] max-sm:-top-[300px]" slow />
      <Glow src={glowSand} className="top-[416px] -start-[260px] h-[520px] w-[900px] max-sm:w-[600px] max-sm:h-[360px]" delay={-4} />

      <Container className="flex flex-col gap-12 pt-10 pb-16 sm:pt-14 lg:flex-row lg:items-center lg:gap-12 lg:py-[96px] xl:gap-[88px]">
        {/* Copy */}
        <div className="relative flex min-w-0 flex-1 flex-col items-start gap-[32px]">
          <Enter delay={0.55}>
            <p className="flex items-center gap-[8px] rounded-[90px] border border-sky/55 bg-sky/8 py-[9px] ps-[14px] pe-[16px] font-body text-[13px] text-white sm:text-[15px]">
              <span className="relative flex size-[7px] shrink-0" aria-hidden>
                <span className="absolute inset-0 rounded-full bg-sky animate-pulse-ring" />
                <span className="relative size-[7px] rounded-full bg-sky" />
              </span>
              <span>{t.eyebrow}</span>
            </p>
          </Enter>

          <div className="flex w-full flex-col gap-[20px]">
            <SplitText
              as="h1"
              text={t.title}
              highlight={t.highlight}
              delay={0.7}
              stagger={0.07}
              className="font-display text-[42px] font-medium leading-[1.06] tracking-[-0.6px] text-white sm:text-[56px] xl:text-[70px] xl:tracking-[-1.05px] rtl:tracking-normal rtl:leading-[1.25]"
            />
            <Enter delay={1.05} as="p" className="max-w-[520px] font-body text-[16px] leading-[1.58] text-cloud sm:text-[17px]">
              {t.body}
            </Enter>
          </div>

          <Enter delay={1.25} className="flex flex-wrap items-center gap-x-[28px] gap-y-5">
            <Button to="/contact">{t.cta}</Button>
            <div className="flex items-center gap-[12px]">
              <ul className="flex shrink-0" aria-label={t.avatarsAlt}>
                {AVATARS.map((a, i) => (
                  <motion.li
                    key={i}
                    className={`relative size-[36px] overflow-hidden rounded-[18px] border-2 border-ink ${i < AVATARS.length - 1 ? '-me-[10px]' : ''} ${a.contain ? 'bg-white' : 'bg-ink-raised'}`}
                    style={{ zIndex: AVATARS.length - i }}
                    initial={reduce ? false : { opacity: 0, scale: 0.4, x: -12 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 18, delay: 1.45 + i * 0.08 }}
                    whileHover={{ y: -4, scale: 1.12, zIndex: 10 }}
                  >
                    <img src={a.src} alt="" className={`size-full rounded-[18px] ${a.contain ? 'object-contain' : 'object-cover'}`} />
                  </motion.li>
                ))}
              </ul>
              <div className="flex flex-col gap-[4px]">
                <p className="font-body text-[15px] font-medium text-white">{t.proofTitle}</p>
                <p className="font-body text-[14px] text-white/50">{t.proofSub}</p>
              </div>
            </div>
          </Enter>
        </div>

        {/* Media */}
        <motion.div
          ref={mediaRef}
          className="relative h-[460px] w-full shrink-0 overflow-hidden rounded-[24px] bg-ink-raised sm:h-[560px] lg:h-[585px] lg:w-[44%] xl:w-[537px]"
          initial={reduce ? false : { opacity: 0, clipPath: 'inset(14% 10% 14% 10% round 24px)' }}
          animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 24px)' }}
          transition={{ duration: 1.3, delay: 0.6, ease: EASE }}
        >
          <motion.div className="absolute inset-x-0 -top-[16.6%] h-[133%]" style={reduce ? undefined : { y: photoY }}>
            <motion.img
              src={heroPhoto}
              alt={t.photoAlt}
              className="size-full object-cover"
              initial={reduce ? false : { scale: 1.18 }}
              animate={reduce ? undefined : { scale: [1.18, 1.04, 1.1] }}
              transition={{ duration: 22, times: [0, 0.3, 1], ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }}
            />
          </motion.div>
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[rgba(7,26,46,0)] from-35% to-[rgba(7,26,46,0.92)]" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[rgba(3,199,252,0.18)] to-[rgba(3,199,252,0)] to-40%" />

          <motion.div className="absolute start-[16px] end-[16px] bottom-[16px] flex flex-col items-start gap-[12px] sm:start-[28px] sm:bottom-[28px]" style={reduce ? undefined : { y: cardY }}>
            <Enter delay={1.4}>
              <Button to="#categories" variant="outline" className="backdrop-blur-[6px] max-sm:text-[15px]">
                {t.mediaCta}
              </Button>
            </Enter>
            <Enter delay={1.55}>
              <motion.div
                className="flex items-center gap-[14px] rounded-[16px] border border-white/22 bg-white/10 py-[14px] ps-[14px] pe-[20px] backdrop-blur-[8px]"
                animate={reduce ? undefined : { y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="flex size-[44px] shrink-0 items-center justify-center rounded-[12px] bg-gold text-navy">
                  <Clock className="size-[22px]" strokeWidth={2} aria-hidden />
                </span>
                <span className="flex flex-col gap-[2px] whitespace-nowrap">
                  <span className="font-display text-[18px] font-semibold text-white">{t.statValue}</span>
                  <span className="font-body text-[13px] text-white/70">{t.statLabel}</span>
                </span>
              </motion.div>
            </Enter>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
