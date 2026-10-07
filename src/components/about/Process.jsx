import { motion, useReducedMotion } from 'framer-motion'
import { useLang } from '../../i18n.jsx'
import { Container } from '../ui.jsx'
import { EASE } from '../../motion/index.jsx'
import Heading from './Heading.jsx'

const VIEWPORT = { once: true, margin: '0px 0px -15% 0px' }
const DRAW = 1.8 // seconds for the track to draw across

export default function Process({ t }) {
  const reduce = useReducedMotion()
  const { isRtl } = useLang()
  const n = t.steps.length

  return (
    <Container as="section" className="flex flex-col gap-10 pb-20 lg:gap-[48px] lg:pb-[120px]">
      <Heading eyebrow={t.eyebrow} title={t.title} />

      <motion.ol className="relative grid gap-8 overflow-hidden lg:grid-cols-5 lg:gap-[24px]" initial="hidden" whileInView="show" viewport={VIEWPORT}>
        {/* Track — horizontal on desktop, vertical on mobile; draws in from the reading start */}
        <motion.span
          aria-hidden
          className="absolute inset-x-0 top-[35px] hidden h-[2px] bg-gradient-to-r from-[rgba(3,199,252,0.6)] to-[rgba(231,171,54,0.6)] lg:block rtl:bg-gradient-to-l"
          style={{ transformOrigin: isRtl ? '100% 50%' : '0% 50%' }}
          variants={{ hidden: { scaleX: reduce ? 1 : 0 }, show: { scaleX: 1, transition: { duration: DRAW, ease: EASE } } }}
        />
        <motion.span
          aria-hidden
          className="absolute start-[35px] top-[36px] bottom-[36px] w-[2px] bg-gradient-to-b from-[rgba(3,199,252,0.6)] to-[rgba(231,171,54,0.6)] lg:hidden"
          style={{ transformOrigin: '50% 0%' }}
          variants={{ hidden: { scaleY: reduce ? 1 : 0 }, show: { scaleY: 1, transition: { duration: DRAW, ease: EASE } } }}
        />
        {/* Light pulse travelling along the desktop track */}
        {!reduce && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-[30px] hidden h-[12px] lg:block"
            initial={{ x: '0%' }}
            animate={{ x: isRtl ? '-100%' : '100%' }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.5, delay: DRAW + 0.6 }}
          >
            <span className="absolute top-0 -start-[60px] h-[12px] w-[120px] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.85),rgba(3,199,252,0.4)_45%,transparent)] blur-[1px]" />
          </motion.span>
        )}

        {t.steps.map((step, i) => {
          const at = (DRAW / n) * i
          return (
            <li key={step.title} className="group relative flex gap-5 lg:flex-col lg:gap-[16px]">
              <motion.span
                className="relative z-10 flex size-[72px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-[rgba(3,199,252,0.5)] bg-ink-panel transition-[border-color,box-shadow] duration-500 group-hover:border-gold group-hover:shadow-[0_0_0_8px_rgba(231,171,54,0.12)]"
                variants={{
                  hidden: reduce ? { opacity: 1 } : { opacity: 0, scale: 0.4 },
                  show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 18, delay: at } },
                }}
              >
                <span className="font-display text-[22px] font-semibold text-gold" dir="ltr">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </motion.span>
              <motion.div
                className="flex flex-col gap-[16px] pt-3 lg:pt-0"
                variants={{
                  hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay: at + 0.15 } },
                }}
              >
                <h3 className="font-display text-[20px] font-medium text-white">{step.title}</h3>
                <p className="font-body text-[15px] leading-[1.55] text-haze rtl:leading-[1.75]">{step.body}</p>
              </motion.div>
            </li>
          )
        })}
      </motion.ol>
    </Container>
  )
}
