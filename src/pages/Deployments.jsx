import { Fragment, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Award, FileText, Plane } from 'lucide-react'
import content from '../content/deployments.js'
import { useContent } from '../i18n.jsx'
import { Button, Container, Eyebrow } from '../components/ui.jsx'
import CtaSection from '../components/CtaSection.jsx'
import RecentDeployments from '../components/deployments/RecentDeployments.jsx'
import DeploymentLog from '../components/deployments/DeploymentLog.jsx'
import { CountUp, EASE, Reveal, SplitText, Stagger, StaggerItem, Tilt } from '../motion/index.jsx'

const PREP_ICONS = { award: Award, file: FileText, plane: Plane }

/** Soft radial glows from the frame (Figma "Glow" ellipses), drifting slowly. Positioned in frame coordinates, so the layer starts behind the fixed nav. */
function Glows() {
  const { scrollY } = useScroll()
  const reduce = useReducedMotion()
  const y1 = useTransform(scrollY, [0, 1200], [0, 160])
  const y2 = useTransform(scrollY, [0, 2000], [0, -140])
  const glow = (rgb, a) => `radial-gradient(closest-side, rgba(${rgb},${a}), rgba(${rgb},0))`
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-[88px] bottom-0 overflow-hidden lg:-top-[104px]">
      <div className="relative mx-auto h-full max-w-[1440px]">
        <motion.div style={reduce ? undefined : { y: y1 }} className="absolute -top-[460px] start-[700px] h-[1000px] w-[1100px] max-lg:start-[20%]">
          <div className="size-full animate-float-slow" style={{ background: glow('3,199,252', 0.18) }} />
        </motion.div>
        <motion.div style={reduce ? undefined : { y: y2 }} className="absolute top-[700px] -start-[360px] h-[700px] w-[1000px]">
          <div className="size-full animate-float" style={{ background: glow('231,171,54', 0.12), animationDelay: '-3s' }} />
        </motion.div>
        <div className="absolute top-[2400px] start-[700px] h-[900px] w-[1000px] max-lg:start-[10%]">
          <div className="size-full animate-float-slow" style={{ background: glow('3,199,252', 0.1), animationDelay: '-6s' }} />
        </div>
      </div>
    </div>
  )
}

function Hero({ hero }) {
  const reduce = useReducedMotion()
  const rise = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 28, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 0.9, ease: EASE, delay },
  })
  return (
    <Container as="section" className="pt-[56px] pb-[48px] lg:pt-[88px] lg:pb-[56px]">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex max-w-[760px] flex-col items-start gap-6">
          <motion.p
            {...rise(0.35)}
            className="inline-flex items-center gap-2 rounded-[90px] border border-sky/55 bg-sky/8 py-[9px] ps-[14px] pe-[16px] font-body text-[15px] text-white"
          >
            <span aria-hidden className="relative flex size-[7px]">
              <span className="absolute inset-0 rounded-full bg-sky animate-pulse-ring" />
              <span className="relative size-[7px] rounded-full bg-sky" />
            </span>
            {hero.eyebrow}
          </motion.p>
          <SplitText
            as="h1"
            text={hero.title}
            highlight={hero.highlight}
            delay={0.5}
            stagger={0.08}
            className="font-display text-[44px] font-medium leading-[1.04] tracking-[-1.08px] text-white sm:text-[58px] lg:text-[72px] rtl:leading-[1.35] rtl:tracking-normal"
          />
          <motion.p {...rise(0.8)} className="max-w-[600px] font-body text-[17px] leading-[1.58] text-cloud rtl:leading-[1.75]">
            {hero.description}
          </motion.p>
        </div>
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 180, damping: 16, delay: 1 }}
          className="shrink-0"
        >
          <Button to="/contact">{hero.cta}</Button>
        </motion.div>
      </div>
    </Container>
  )
}

function Stats({ stats }) {
  return (
    <Container as="section" className="pb-[88px] lg:pb-[112px]">
      <Reveal from="scale" duration={0.9} className="rounded-[24px] border border-white/[0.09] bg-white/[0.04] backdrop-blur-[2px]">
        <Stagger as="dl" stagger={0.12} delay={0.15} className="grid grid-cols-2 gap-x-6 gap-y-8 px-6 py-8 sm:px-10 lg:flex lg:items-center lg:justify-between lg:px-[56px] lg:py-[36px]">
          {stats.map((s, i) => (
            <Fragment key={s.label}>
              {i > 0 && (
                <motion.span
                  aria-hidden
                  className="hidden h-16 w-px origin-top bg-white/12 lg:block"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.3 + i * 0.12 }}
                />
              )}
              <StaggerItem className="flex flex-col gap-[6px]">
                <dt className="order-2 font-body text-[14px] text-haze sm:text-[15px]">{s.label}</dt>
                <dd className="order-1 font-display text-[36px] font-semibold leading-[1.1] text-white sm:text-[44px]">
                  <span dir="ltr">{s.static ? s.value : <CountUp value={s.value} duration={2.2} />}</span>
                </dd>
              </StaggerItem>
            </Fragment>
          ))}
        </Stagger>
      </Reveal>
    </Container>
  )
}

function Preparation({ prep }) {
  return (
    <Container as="section" className="flex flex-col gap-8 pb-[88px] lg:pb-[120px]">
      <div className="flex flex-col gap-[14px]">
        <Eyebrow>{prep.eyebrow}</Eyebrow>
        <SplitText
          text={prep.title}
          className="font-display text-[34px] font-medium leading-[1.12] tracking-[-0.44px] text-white sm:text-[40px] lg:text-[44px] rtl:leading-[1.35] rtl:tracking-normal"
        />
      </div>
      <Stagger as="ul" stagger={0.12} className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
        {prep.cards.map((card) => {
          const Icon = PREP_ICONS[card.icon]
          return (
            <StaggerItem as="li" key={card.title} className="h-full">
              <Tilt max={5} className="h-full rounded-[24px]">
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="group flex h-full flex-col items-start gap-5 overflow-hidden rounded-[24px] bg-white p-7 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.6)] transition-shadow duration-500 hover:shadow-[0_30px_70px_-30px_rgba(231,171,54,0.55)] lg:p-8"
                >
                  <span className="relative inline-flex">
                    <span aria-hidden className="absolute -inset-3 scale-50 rounded-full bg-gold/15 opacity-0 transition-[opacity,scale] duration-500 group-hover:scale-100 group-hover:opacity-100" />
                    <Icon
                      className="relative size-[30px] text-gold transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
                      strokeWidth={1.6}
                      aria-hidden
                    />
                  </span>
                  <h3 className="font-display text-[22px] font-medium text-navy lg:text-[24px]">{card.title}</h3>
                  <p className="font-body text-[16px] leading-[1.6] text-body rtl:leading-[1.75]">{card.text}</p>
                </motion.div>
              </Tilt>
            </StaggerItem>
          )
        })}
      </Stagger>
    </Container>
  )
}

export default function Deployments() {
  const t = useContent(content)
  const [sector, setSector] = useState('all')

  return (
    <div className="relative">
      <Glows />
      <Hero hero={t.hero} />
      <Stats stats={t.stats} />
      <RecentDeployments content={t.recent} active={sector} onChange={setSector} />
      <DeploymentLog content={t.log} active={sector} />
      <Preparation prep={t.prep} />
      <CtaSection heading={t.cta.heading} subtext={t.cta.subtext} primary={t.cta.primary} secondary={t.cta.secondary} />
    </div>
  )
}
