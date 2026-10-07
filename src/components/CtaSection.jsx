import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import common from '../content/common.js'
import { useContent } from '../i18n.jsx'
import { EASE, Reveal, SplitText } from '../motion/index.jsx'
import { Button, Container } from './ui.jsx'

/** Closing gradient banner ("CTA Section" layout component). Props override the default copy. */
export default function CtaSection({ heading, subtext, primary, secondary, primaryTo = '/contact', secondaryTo = '/contact' }) {
  const { cta } = useContent(common)
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const sunY = useTransform(scrollYProgress, [0, 1], [80, -80])
  const duneX = useTransform(scrollYProgress, [0, 1], [-60, 40])

  return (
    <Container as="section" className="pb-[120px]">
      <motion.div
        ref={ref}
        className="relative flex flex-col gap-10 overflow-hidden rounded-[28px] bg-gradient-to-r from-[#0c395d] to-teal px-6 py-12 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-[64px] lg:py-[60px] rtl:bg-gradient-to-l"
        initial={{ opacity: 0, y: 60, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 1, ease: EASE }}
      >
        <motion.div aria-hidden className="pointer-events-none absolute -top-[300px] size-[520px] start-[62%]" style={{ y: sunY }}>
          <div className="size-full animate-[pulse_6s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle,rgba(255,214,79,0.45)_0%,rgba(255,214,79,0)_70%)]" />
        </motion.div>
        <motion.div aria-hidden className="pointer-events-none absolute top-[190px] h-[300px] w-[1500px] start-[250px] max-lg:top-auto max-lg:bottom-[-160px] max-lg:start-[-200px] rtl:-scale-x-100" style={{ x: duneX }}>
          <div className="size-full rounded-[50%] bg-[linear-gradient(180deg,rgba(231,171,54,0.35)_0%,rgba(231,171,54,0)_60%)]" />
        </motion.div>

        <div className="relative flex flex-col gap-[14px]">
          <SplitText
            text={heading ?? cta.heading}
            className="max-w-[700px] font-display text-[30px] font-medium leading-[1.15] tracking-[-0.4px] text-white sm:text-[40px] rtl:tracking-normal"
          />
          <Reveal delay={0.2}>
            <p className="max-w-[560px] font-body text-[17px] leading-[1.55] text-mist">{subtext ?? cta.subtext}</p>
          </Reveal>
        </div>
        <Reveal delay={0.35} className="relative flex flex-wrap items-center gap-[14px]">
          <Button to={primaryTo}>{primary ?? cta.primary}</Button>
          <Button to={secondaryTo} variant="outline" arrow={false}>
            {secondary ?? cta.secondary}
          </Button>
        </Reveal>
      </motion.div>
    </Container>
  )
}
