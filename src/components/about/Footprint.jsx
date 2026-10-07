import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import { BadgeCheck, Plane, Users } from 'lucide-react'
import saudiImg from '../../assets/img/city-saudi.jpg'
import philippinesImg from '../../assets/img/city-philippines.jpg'
import { useLang } from '../../i18n.jsx'
import { Container } from '../ui.jsx'
import { EASE, Reveal, Stagger, StaggerItem } from '../../motion/index.jsx'

const GAP = 24 // gap between the two city cards
const PIN_Y = 0.36 // pins sit at this fraction of the card height

/** Point / tangent on a quadratic Bézier. */
function bezier(g, t) {
  const u = 1 - t
  return {
    x: u * u * g.x0 + 2 * u * t * g.cx + t * t * g.x1,
    y: u * u * g.y0 + 2 * u * t * g.cy + t * t * g.y1,
    dx: 2 * u * (g.cx - g.x0) + 2 * t * (g.x1 - g.cx),
    dy: 2 * u * (g.cy - g.y0) + 2 * t * (g.y1 - g.cy),
  }
}

/**
 * Animated flight arc from the Philippines card to the Saudi Arabia card, with a plane flying along it.
 * Geometry is measured in pixels so the plane never distorts.
 */
function RouteArc({ label }) {
  const ref = useRef(null)
  const geo = useRef(null)
  const [size, setSize] = useState(null)
  const { isRtl } = useLang()
  const reduce = useReducedMotion()
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' })
  const t = useMotionValue(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ w: width, h: height })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Physical (left-based) coordinates. The Philippines card is the second card, i.e. on the right in LTR
  // and on the left in RTL. Flights go Philippines -> Saudi Arabia.
  if (size) {
    const half = (size.w - GAP) / 2
    const leftCenter = half / 2
    const rightCenter = size.w - half / 2
    const ph = isRtl ? leftCenter : rightCenter
    const sa = isRtl ? rightCenter : leftCenter
    const y = size.h * PIN_Y
    geo.current = { x0: ph, y0: y, x1: sa, y1: y, cx: size.w / 2, cy: -size.h * 0.12 }
  }
  const g = geo.current

  const x = useTransform(t, (v) => (geo.current ? bezier(geo.current, v).x : 0))
  const y = useTransform(t, (v) => (geo.current ? bezier(geo.current, v).y : 0))
  const rotate = useTransform(t, (v) => {
    if (!geo.current) return 0
    const p = bezier(geo.current, v)
    // Lucide's plane points up-right (-45deg), so offset by 45deg.
    return (Math.atan2(p.dy, p.dx) * 180) / Math.PI + 45
  })
  const opacity = useTransform(t, [0, 0.06, 0.94, 1], [0, 1, 1, 0])

  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(t, [0, 1], { duration: 4.2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.4, delay: 1.4 })
    return () => controls.stop()
  }, [inView, reduce, t])

  const d = g ? `M ${g.x0} ${g.y0} Q ${g.cx} ${g.cy} ${g.x1} ${g.y1}` : ''

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 z-10 hidden sm:block" role="img" aria-label={label}>
      {g && (
        <>
          <svg className="absolute inset-0 size-full overflow-visible" aria-hidden>
            <defs>
              <linearGradient id="about-route" gradientUnits="userSpaceOnUse" x1={g.x0} y1="0" x2={g.x1} y2="0">
                <stop offset="0" stopColor="#03c7fc" />
                <stop offset="1" stopColor="#e7ab36" />
              </linearGradient>
            </defs>
            <path d={d} fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeDasharray="3 7" strokeLinecap="round" />
            <motion.path
              d={d}
              fill="none"
              stroke="url(#about-route)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: reduce ? 1 : 0 }}
              animate={inView ? { pathLength: 1 } : undefined}
              transition={{ duration: 1.6, ease: EASE, delay: 0.2 }}
              style={{ filter: 'drop-shadow(0 0 6px rgba(3,199,252,0.55))' }}
            />
          </svg>
          {[
            [g.x0, g.y0, 'bg-sky'],
            [g.x1, g.y1, 'bg-gold'],
          ].map(([px, py, color], i) => (
            <span key={i} className="absolute -ml-[7px] -mt-[7px] size-[14px]" style={{ left: px, top: py }}>
              <span className={`absolute inset-0 rounded-full ${color} animate-pulse-ring`} />
              <span className={`absolute inset-[3px] rounded-full ${color} ring-2 ring-white/80`} />
            </span>
          ))}
          {!reduce && (
            <motion.span className="absolute left-0 top-0 -ml-[14px] -mt-[14px] flex size-[28px] items-center justify-center" style={{ x, y, opacity }}>
              <motion.span style={{ rotate }} className="flex size-[28px] items-center justify-center rounded-full bg-white text-navy shadow-[0_6px_20px_-4px_rgba(0,0,0,0.5)]">
                <Plane className="size-[15px]" strokeWidth={2} fill="currentColor" aria-hidden />
              </motion.span>
            </motion.span>
          )}
        </>
      )}
    </div>
  )
}

function CityCard({ city, img, delay }) {
  return (
    <Reveal from="scale" delay={delay} className="h-full">
      <div className="group relative h-[260px] overflow-hidden rounded-[20px] sm:h-[320px]">
        <img
          src={img}
          alt={city.imageAlt}
          className="absolute inset-0 size-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.09]"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[rgba(7,26,46,0)] from-30% to-[rgba(7,26,46,0.92)]" />
        <div className="absolute inset-x-[28px] bottom-[28px] flex flex-col gap-[4px] transition-transform duration-500 group-hover:-translate-y-1">
          <h3 className="font-display text-[24px] font-semibold text-white sm:text-[28px]">{city.name}</h3>
          <p className="font-body text-[14px] text-gold">{city.detail}</p>
        </div>
      </div>
    </Reveal>
  )
}

export default function Footprint({ t }) {
  const { isRtl } = useLang()
  const reduce = useReducedMotion()
  const icons = [BadgeCheck, Users]
  return (
    <Container as="section" className="pb-20 lg:pb-[120px]">
      <div className="flex flex-col gap-[32px] lg:flex-row lg:items-end">
        <div className="flex min-w-0 flex-1 flex-col gap-[28px]">
          <div className="flex items-center gap-[24px]">
            <Reveal as="h2" from="start" className="shrink-0 font-display text-[28px] font-medium text-white sm:text-[32px]">
              {t.title}
            </Reveal>
            <motion.span
              aria-hidden
              className="h-px flex-1 bg-white/15"
              style={{ transformOrigin: isRtl ? '100% 50%' : '0% 50%' }}
              initial={{ scaleX: reduce ? 1 : 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
            />
          </div>
          <div className="relative grid gap-[24px] sm:grid-cols-2">
            <CityCard city={t.saudi} img={saudiImg} delay={0} />
            <CityCard city={t.philippines} img={philippinesImg} delay={0.12} />
            <RouteArc label={t.routeLabel} />
          </div>
        </div>

        <Reveal from="end" delay={0.15} className="w-full lg:w-[420px] lg:shrink-0">
          <aside className="flex flex-col gap-[22px] rounded-[24px] border border-white/[0.09] bg-white/[0.04] p-7 sm:p-[36px]">
            <h2 className="font-display text-[26px] font-medium text-white sm:text-[28px]">{t.foundation.title}</h2>
            <p className="font-body text-[16px] leading-[1.6] text-haze rtl:leading-[1.75]">{t.foundation.body}</p>
            <Stagger as="ul" className="flex flex-col gap-[22px]" delay={0.2}>
              {t.foundation.items.map((item, i) => {
                const Icon = icons[i] ?? BadgeCheck
                return (
                  <StaggerItem as="li" from="start" key={item.title} className="group flex items-center gap-[14px]">
                    <span className="flex size-[44px] shrink-0 items-center justify-center rounded-[12px] bg-[rgba(231,171,54,0.14)] text-gold transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <Icon className="size-[22px]" strokeWidth={1.8} aria-hidden />
                    </span>
                    <span className="flex min-w-0 flex-col gap-[2px]">
                      <span className="font-body text-[16px] font-medium text-white">{item.title}</span>
                      <span className="font-body text-[14px] text-haze">{item.detail}</span>
                    </span>
                  </StaggerItem>
                )
              })}
            </Stagger>
          </aside>
        </Reveal>
      </div>
    </Container>
  )
}
