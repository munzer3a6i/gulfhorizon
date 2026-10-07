import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useReducedMotion } from 'framer-motion'
import { Award, BadgeCheck, FileText, Plane, Search } from 'lucide-react'
import { useLang } from '../../i18n.jsx'
import { Container, SectionHeader } from '../ui.jsx'
import { EASE } from '../../motion/index.jsx'

const ICONS = [FileText, Search, Award, BadgeCheck, Plane]
const STEP_DELAY = 0.28

/** Two-digit step number that ticks up from 00 when the card appears. */
function StepNumber({ n, inView, delay }) {
  const reduce = useReducedMotion()
  const [v, setV] = useState(reduce ? n : 0)
  useEffect(() => {
    if (!inView || reduce) return
    const c = animate(0, n, { duration: 0.9, delay, ease: EASE, onUpdate: (x) => setV(Math.round(x)) })
    return () => c.stop()
  }, [inView, n, delay, reduce])
  return (
    <span aria-hidden className="font-display text-[30px] font-semibold text-navy/12 transition-colors duration-500 group-hover:text-sky/60" dir="ltr">
      {String(v).padStart(2, '0')}
    </span>
  )
}

/** True when all five steps sit on one row, so they can play in sequence. */
function useSingleRow() {
  const query = '(min-width: 1280px)'
  const [match, setMatch] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setMatch(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return match
}

function Step({ step, i, total, singleRow }) {
  const { isRtl } = useLang()
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const Icon = ICONS[i]
  const last = i === total - 1
  const delay = 0.15 + (singleRow ? i * STEP_DELAY : 0)
  return (
    <motion.li
      ref={ref}
      className="group relative"
      initial={reduce ? false : { opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.8, delay: inView ? delay : 0, ease: EASE }}
    >
      <div className="flex flex-col gap-[16px] rounded-[20px] border border-[#dce4ec] bg-white px-[24px] pt-[28px] pb-[32px] transition-[transform,box-shadow] duration-500 ease-out group-hover:-translate-y-1.5 group-hover:shadow-[0_24px_50px_-28px_rgba(10,110,140,0.45)]">
        <div className="flex items-center justify-between">
          <motion.span
            className={`flex size-[48px] items-center justify-center rounded-[14px] ${last ? 'bg-gold text-navy' : 'bg-sky/14 text-teal'}`}
            initial={reduce ? false : { scale: 0.4, rotate: -20 }}
            animate={inView ? { scale: 1, rotate: 0 } : undefined}
            transition={{ type: 'spring', stiffness: 260, damping: 14, delay: delay + 0.15 }}
          >
            <Icon className="size-[24px] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" strokeWidth={1.8} aria-hidden />
          </motion.span>
          <StepNumber n={i + 1} inView={inView} delay={delay} />
        </div>
        <div className="h-[4px] w-full overflow-hidden rounded-[4px] bg-paper-line" aria-hidden>
          <motion.div
            className={`h-full rounded-[4px] ${last ? 'bg-gold' : 'bg-sky'}`}
            style={{ width: `${((i + 1) / total) * 100}%`, transformOrigin: isRtl ? '100% 50%' : '0% 50%' }}
            initial={reduce ? false : { scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : undefined}
            transition={{ duration: 0.9, delay: delay + 0.25, ease: EASE }}
          />
        </div>
        <h3 className="font-display text-[21px] font-medium text-navy">{step.title}</h3>
        <p className="font-body text-[15px] leading-[1.55] text-body">{step.body}</p>
      </div>
    </motion.li>
  )
}

export default function Process({ t }) {
  const singleRow = useSingleRow()
  return (
    <section id="process" className="scroll-mt-[90px] bg-paper">
      <Container className="flex flex-col gap-10 py-20 lg:gap-[56px] lg:py-[120px]">
        <SectionHeader light eyebrow={t.eyebrow} title={t.title} description={t.description} />
        <ol className="grid items-start gap-[20px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {t.steps.map((step, i) => (
            <Step key={step.title} step={step} i={i} total={t.steps.length} singleRow={singleRow} />
          ))}
        </ol>
      </Container>
    </section>
  )
}
