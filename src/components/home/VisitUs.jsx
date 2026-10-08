import { motion, useReducedMotion } from 'framer-motion'
import { Clock, Globe, MapPin, Phone } from 'lucide-react'
import glowLower from '../../assets/svg/glow-lower.svg'
import mapHalo from '../../assets/svg/map-halo.svg'
import { Button, Container, Eyebrow } from '../ui.jsx'
import { EASE, Glow, Reveal, SplitText, Stagger, StaggerItem } from '../../motion/index.jsx'
import { WhatsAppIcon } from '../WhatsAppButton.jsx'

const DETAIL_ICONS = { pin: MapPin, phone: Phone, globe: Globe, whatsapp: WhatsAppIcon }

// Stylised street map, in the 600 x 480 coordinate space of the Figma "Map" frame.
const STREETS = [
  { x1: 0, y1: 87, x2: 600, y2: 87, w: 10 },
  { x1: 0, y1: 393, x2: 600, y2: 393, w: 10 },
  { x1: 125, y1: 0, x2: 125, y2: 480, w: 10 },
  { x1: 475, y1: 0, x2: 475, y2: 480, w: 10 },
  { x1: 0, y1: 221, x2: 600, y2: 221, w: 18 }, // Padre Faura St.
  { x1: 291, y1: 0, x2: 291, y2: 480, w: 18 }, // Mabini St.
]
const GRID = Array.from({ length: 16 }, (_, i) => i * 40)

/** Centre point of the pin as a share of the map (291, 221). */
const CENTER = 'start-[48.5%] -translate-x-1/2 rtl:translate-x-1/2'

function OfficeMap({ m }) {
  const reduce = useReducedMotion()
  const view = { once: true, margin: '-12%' }
  return (
    <motion.figure
      className="relative m-0 aspect-[600/480] w-full shrink-0 overflow-hidden rounded-[28px] border border-white/8 bg-ink-panel lg:w-[48%] xl:w-[600px]"
      initial={reduce ? false : { opacity: 0, scale: 0.94, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={view}
      transition={{ duration: 1, ease: EASE }}
      aria-label={m.label}
      role="img"
    >
      <svg viewBox="0 0 600 480" className="absolute inset-0 size-full rtl:-scale-x-100" preserveAspectRatio="none" aria-hidden>
        <motion.g
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={view}
          transition={{ duration: 1.2 }}
        >
          {GRID.map((x) => (
            <line key={`v${x}`} x1={x - 0.5} y1="0" x2={x - 0.5} y2="480" />
          ))}
          {GRID.slice(0, 13).map((y) => (
            <line key={`h${y}`} x1="0" y1={y - 0.5} x2="600" y2={y - 0.5} />
          ))}
        </motion.g>
        <motion.rect
          x="319"
          y="249"
          width="150"
          height="100"
          rx="12"
          fill="rgba(3,199,252,0.06)"
          initial={reduce ? false : { opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={view}
          style={{ transformOrigin: '394px 299px' }}
          transition={{ duration: 0.9, delay: 1.1, ease: EASE }}
        />
        {STREETS.map((s, i) => (
          <motion.line
            key={i}
            x1={s.x1}
            y1={s.y1}
            x2={s.x2}
            y2={s.y2}
            stroke="#1c3a57"
            strokeWidth={s.w}
            initial={reduce ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={view}
            transition={{ duration: 1.1, delay: 0.25 + i * 0.12, ease: EASE }}
          />
        ))}
      </svg>

      <Reveal from="start" delay={0.9} distance={16} className="absolute start-[4%] top-[40%]">
        <span className="font-body text-[10px] font-medium tracking-[0.72px] text-slate sm:text-[12px] rtl:tracking-normal">{m.streetA}</span>
      </Reveal>
      <Reveal from="top" delay={1} distance={16} className="absolute start-[51.6%] top-[5%]">
        <span className="font-body text-[10px] font-medium tracking-[0.72px] text-slate sm:text-[12px] rtl:tracking-normal">{m.streetB}</span>
      </Reveal>

      {/* Halo + pulse rings */}
      <div className={`absolute top-[46%] aspect-square w-[23.3%] -translate-y-1/2 ${CENTER}`} aria-hidden>
        <motion.img
          src={mapHalo}
          alt=""
          className="absolute inset-0 size-full max-w-none"
          initial={reduce ? false : { opacity: 0, scale: 0.3 }}
          whileInView={{ opacity: 1, scale: [0.3, 1.15, 1] }}
          viewport={view}
          transition={{ duration: 1.2, delay: 1.5, ease: EASE }}
        />
        <motion.div
          className="absolute inset-0"
          animate={reduce ? undefined : { scale: [1, 1.12, 1], opacity: [1, 0.75, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 2.6 }}
        >
          <span className="absolute inset-[30%] rounded-full bg-gold/30 animate-pulse-ring" />
          <span className="absolute inset-[30%] rounded-full bg-gold/20 animate-pulse-ring [animation-delay:1.2s]" />
        </motion.div>
      </div>

      {/* Pin */}
      <div className={`absolute top-[46%] -translate-y-1/2 ${CENTER}`}>
        <motion.div
          className="flex size-[40px] items-center justify-center rounded-full border-4 border-ink bg-gold text-navy shadow-[0_10px_24px_-8px_rgba(231,171,54,0.7)] sm:size-[52px]"
          initial={reduce ? false : { opacity: 0, y: -120, scale: 0.6 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={view}
          whileHover={{ scale: 1.12, y: -4 }}
          transition={{ type: 'spring', stiffness: 380, damping: 12, delay: 1.35 }}
        >
          <MapPin className="size-[20px] sm:size-[24px]" strokeWidth={2} aria-hidden />
        </motion.div>
      </div>

      {/* Label */}
      <div className={`absolute top-[54.8%] ${CENTER}`}>
        <motion.div
          className="flex flex-col gap-[2px] whitespace-nowrap rounded-[14px] bg-white px-[12px] py-[9px] shadow-[0_10px_30px_rgba(0,0,0,0.3)] sm:px-[16px] sm:py-[12px]"
          initial={reduce ? false : { opacity: 0, y: 16, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={view}
          transition={{ duration: 0.7, delay: 1.8, ease: EASE }}
        >
          <span className="font-display text-[12.5px] font-semibold text-navy sm:text-[15px]">{m.pinTitle}</span>
          <span className="font-body text-[11px] text-body sm:text-[13px]">{m.pinSub}</span>
        </motion.div>
      </div>

      {/* Hours chip */}
      <Reveal from="bottom" delay={2} distance={14} className="absolute start-[4%] bottom-[5%]">
        <span className="flex items-center gap-[8px] rounded-[12px] border border-white/12 bg-ink/85 px-[12px] py-[8px] backdrop-blur-[4px] sm:px-[14px] sm:py-[10px]">
          <Clock className="size-[16px] text-gold" strokeWidth={2} aria-hidden />
          <span className="font-body text-[12px] font-medium text-white sm:text-[13px]">{m.hours}</span>
        </span>
      </Reveal>
    </motion.figure>
  )
}

export default function VisitUs({ t }) {
  return (
    <section className="relative">
      <Glow src={glowLower} className="top-[195px] start-[700px] h-[800px] w-[1000px] max-lg:start-[-200px] max-lg:top-[30%] max-lg:h-[600px] max-lg:w-[750px]" slow delay={-6} />
      <Container className="flex flex-col gap-12 pb-20 lg:flex-row lg:items-center lg:gap-[64px] lg:pb-[120px]">
        <div className="relative flex min-w-0 flex-1 flex-col items-start gap-[24px]">
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <SplitText
            text={t.title}
            className="font-display text-[34px] font-medium leading-[1.1] tracking-[-0.48px] text-white sm:text-[42px] lg:text-[48px] rtl:tracking-normal"
          />
          <Reveal delay={0.15}>
            <p className="font-body text-[17px] leading-[1.58] text-haze">{t.body}</p>
          </Reveal>
          <Stagger as="ul" className="flex w-full flex-col" stagger={0.12} delay={0.2}>
            {t.details.map((d) => {
              const Icon = DETAIL_ICONS[d.icon] ?? Phone
              return (
                <StaggerItem as="li" key={d.label} from="start" className="group flex items-center gap-[16px] border-t border-white/8 py-[18px]">
                  <span className="flex size-[44px] shrink-0 items-center justify-center rounded-[12px] bg-gold/14 text-gold transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                    <Icon className="size-[22px]" strokeWidth={1.8} aria-hidden />
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col gap-[4px] font-body font-medium">
                    <p className="text-[12px] tracking-[0.96px] text-haze rtl:tracking-normal">{d.label}</p>
                    <p className="text-[16px] leading-[1.5] text-white">
                      {d.href ? (
                        <a href={d.href} dir={d.ltr ? 'ltr' : undefined} className="transition-colors hover:text-gold">
                          {d.value}
                        </a>
                      ) : d.ltr ? (
                        <span dir="ltr">{d.value}</span>
                      ) : (
                        d.value
                      )}
                    </p>
                  </div>
                </StaggerItem>
              )
            })}
          </Stagger>
          <Reveal delay={0.3}>
            <Button href={t.mapsUrl} target="_blank" rel="noopener noreferrer" variant="outline">
              {t.cta}
            </Button>
          </Reveal>
        </div>
        <OfficeMap m={t.map} />
      </Container>
    </section>
  )
}
