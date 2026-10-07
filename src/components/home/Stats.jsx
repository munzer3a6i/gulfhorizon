import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { Container } from '../ui.jsx'
import { CountUp, EASE, Stagger, StaggerItem } from '../../motion/index.jsx'

export default function Stats({ stats }) {
  return (
    <Container as="section" aria-label="Key figures">
      <motion.div
        className="relative overflow-hidden rounded-[24px] border border-white/9 bg-white/4 px-6 py-8 sm:px-10 lg:px-[56px] lg:py-[36px]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-8%' }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        {/* light sweep across the band once it enters */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 start-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent rtl:bg-gradient-to-l"
          initial={{ x: '-100%' }}
          whileInView={{ x: '400%' }}
          viewport={{ once: true }}
          transition={{ duration: 2.2, delay: 0.4, ease: 'easeInOut' }}
        />
        <Stagger as="dl" className="relative grid grid-cols-2 gap-x-6 gap-y-8 lg:flex lg:items-center lg:justify-between" stagger={0.12}>
          {stats.map((s, i) => (
            <Fragment key={s.label}>
              {i > 0 && (
                <motion.span
                  aria-hidden
                  className="hidden h-[64px] w-px origin-center bg-white/12 lg:block"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.12, ease: EASE }}
                />
              )}
              <StaggerItem className="flex flex-col-reverse gap-[6px]">
                <dt className="font-body text-[14px] text-haze sm:text-[15px]">{s.label}</dt>
                <dd className="font-display text-[34px] font-semibold leading-[1.1] text-white sm:text-[44px]" dir="ltr">
                  <span className="rtl:block rtl:text-right">
                    <CountUp value={s.value} duration={2.2} />
                  </span>
                </dd>
              </StaggerItem>
            </Fragment>
          ))}
        </Stagger>
      </motion.div>
    </Container>
  )
}
