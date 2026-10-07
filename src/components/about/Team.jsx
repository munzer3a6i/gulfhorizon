import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Users } from 'lucide-react'
import teamImg from '../../assets/img/team.jpg'
import leaderImg from '../../assets/img/leader.jpg'
import { Container } from '../ui.jsx'
import { CountUp, EASE, Reveal, Stagger, StaggerItem, Tilt } from '../../motion/index.jsx'
import Heading from './Heading.jsx'

function TeamPhoto({ t }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.55], [1.22, 1])
  const y = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])

  return (
    <motion.div
      ref={ref}
      className="relative h-[320px] overflow-hidden rounded-[20px] sm:h-[480px] sm:rounded-[28px] lg:h-[720px]"
      initial={reduce ? false : { clipPath: 'inset(12% 6% 12% 6% round 28px)', opacity: 0.4 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 28px)', opacity: 1 }}
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      transition={{ duration: 1.3, ease: EASE }}
    >
      <motion.img
        src={teamImg}
        alt={t.photoAlt}
        className="absolute inset-0 size-full object-cover"
        style={reduce ? undefined : { scale, y }}
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[rgba(7,26,46,0)] from-55% to-[rgba(7,26,46,0.85)]" />
      <Reveal delay={0.5} className="absolute start-4 bottom-4 end-4 sm:end-auto sm:start-[32px] sm:bottom-[32px]">
        <div className="flex items-center gap-[14px] rounded-[16px] border border-white/[0.22] bg-white/[0.12] py-[14px] ps-[14px] pe-[22px] backdrop-blur-[8px]">
          <span className="flex size-[44px] shrink-0 items-center justify-center rounded-[12px] bg-gold text-navy">
            <Users className="size-[22px]" strokeWidth={1.8} aria-hidden />
          </span>
          <span className="flex flex-col gap-[2px]">
            <span className="font-display text-[18px] font-semibold text-white">{t.caption.title}</span>
            <span className="font-body text-[13px] text-white/75">{t.caption.detail}</span>
          </span>
        </div>
      </Reveal>
    </motion.div>
  )
}

function LeaderCard({ leader }) {
  const altIsArabic = leader.altLang === 'ar'
  return (
    <Reveal from="start" className="w-full lg:w-[640px] lg:shrink-0">
      <Tilt max={5} className="group rounded-[24px]">
        <article className="flex flex-col overflow-hidden rounded-[24px] border border-white/[0.09] bg-white/[0.04] transition-colors duration-500 group-hover:border-gold/35 sm:flex-row">
          <div className="relative h-[280px] shrink-0 overflow-hidden sm:h-auto sm:w-[240px]">
            <img
              src={leaderImg}
              alt={leader.photoAlt}
              className="absolute inset-0 size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.07]"
            />
          </div>
          <div className="flex flex-1 flex-col justify-center gap-[10px] p-6 sm:p-[32px]">
            <p className="font-body text-[14px] font-medium tracking-[1.96px] text-gold rtl:tracking-normal">{leader.eyebrow}</p>
            <h3 className="font-display text-[26px] font-medium text-white sm:text-[30px]">{leader.name}</h3>
            <p className="font-body text-[15px] font-medium text-sky">{leader.role}</p>
            <p
              lang={leader.altLang}
              dir={altIsArabic ? 'rtl' : 'ltr'}
              className={`text-[14px] text-haze ${altIsArabic ? 'font-arabic font-semibold' : 'font-body'} rtl:text-end ltr:text-start`}
            >
              {leader.alt}
            </p>
            <p className="font-body text-[15px] leading-[1.58] text-haze rtl:leading-[1.75]">{leader.bio}</p>
          </div>
        </article>
      </Tilt>
    </Reveal>
  )
}

function Stats({ stats }) {
  return (
    <Stagger className="grid flex-1 gap-4 sm:grid-cols-3 sm:gap-[24px]" stagger={0.12}>
      {stats.map((s, i) => {
        const featured = i === 0
        return (
          <StaggerItem key={s.label} className="h-full">
            <div
              className={`group relative flex h-full min-h-[170px] flex-col justify-end gap-[8px] overflow-hidden rounded-[24px] p-[28px] transition-transform duration-500 hover:-translate-y-1.5 sm:min-h-[260px] lg:min-h-[300px] ${
                featured ? 'bg-gold' : 'border border-white/[0.09] bg-white/[0.04] hover:border-sky/30'
              }`}
            >
              <span
                aria-hidden
                className={`pointer-events-none absolute -top-16 -end-16 size-44 rounded-full transition-transform duration-700 group-hover:scale-150 ${
                  featured ? 'bg-white/20' : 'bg-sky/[0.07]'
                }`}
              />
              <span dir="ltr" className={`relative self-start font-display text-[44px] font-semibold leading-[1.05] ${featured ? 'text-navy' : 'text-white'}`}>
                <CountUp value={s.value} />
              </span>
              <p className={`relative font-body text-[15px] leading-[1.5] ${featured ? 'text-gold-ink' : 'text-haze'}`}>{s.label}</p>
            </div>
          </StaggerItem>
        )
      })}
    </Stagger>
  )
}

export default function Team({ t }) {
  return (
    <Container as="section" className="flex flex-col gap-[40px] pb-20 lg:pb-[120px]">
      <Heading eyebrow={t.eyebrow} title={t.title} description={t.description} />
      <TeamPhoto t={t} />
      <div className="flex flex-col gap-[24px] lg:flex-row lg:items-stretch">
        <LeaderCard leader={t.leader} />
        <Stats stats={t.stats} />
      </div>
    </Container>
  )
}
