import { motion, useReducedMotion } from 'framer-motion'
import { Award, BadgeCheck, Zap } from 'lucide-react'
import ContactChannels from '../components/contact/ContactChannels.jsx'
import JobOrderForm from '../components/contact/JobOrderForm.jsx'
import { Container } from '../components/ui.jsx'
import content from '../content/contact.js'
import { useContent } from '../i18n.jsx'
import { EASE, Reveal, SplitText, Stagger, StaggerItem } from '../motion/index.jsx'

const ASSURANCE_ICONS = { badge: BadgeCheck, zap: Zap, award: Award }

/** Page header: eyebrow pill, split heading, intro — staggered on load. */
function PageHeader({ header }) {
  const reduce = useReducedMotion()
  return (
    <section className="relative flex flex-col items-center gap-6 px-4 pt-14 pb-12 text-center sm:px-8 lg:px-[62px] lg:pt-[88px] lg:pb-16">
      <motion.p
        className="inline-flex items-center gap-2 rounded-[90px] border border-sky/55 bg-sky/[0.08] py-[9px] ps-[14px] pe-4 font-body text-[15px] leading-normal text-white"
        initial={reduce ? false : { opacity: 0, y: 16, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
      >
        <span aria-hidden className="relative inline-flex size-[7px]">
          <span className="absolute inset-0 rounded-full bg-sky animate-pulse-ring" />
          <span className="relative size-[7px] rounded-full bg-sky" />
        </span>
        {header.eyebrow}
      </motion.p>
      <SplitText
        as="h1"
        text={header.title}
        highlight={header.highlight}
        delay={0.45}
        className="max-w-[1100px] font-display text-[38px] font-medium leading-[1.06] tracking-[-0.96px] text-white sm:text-[52px] lg:text-[64px] rtl:tracking-normal rtl:leading-[1.25]"
      />
      <motion.p
        className="max-w-[640px] font-body text-[16px] leading-[1.58] text-cloud sm:text-[18px]"
        initial={reduce ? false : { opacity: 0, y: 20, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
      >
        {header.description}
      </motion.p>
    </section>
  )
}

function Assurances({ items }) {
  const reduce = useReducedMotion()
  return (
    <section className="pb-20 lg:pb-[120px]">
      <Container>
        <Reveal from="scale">
          <div className="relative overflow-hidden rounded-[24px] border border-white/[0.09] bg-white/[0.04] px-6 py-7 sm:px-12 sm:py-8">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 start-0 w-1/4 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent animate-shimmer"
              style={{ animationDuration: '6s' }}
            />
            <Stagger as="ul" stagger={0.14} className="relative flex flex-col gap-6 md:flex-row md:flex-wrap md:items-center md:justify-between">
              {items.map((item, i) => {
                const Icon = ASSURANCE_ICONS[item.icon]
                return (
                  <StaggerItem as="li" key={item.title} className="group flex items-center gap-4">
                    <span className="relative flex size-12 shrink-0 items-center justify-center rounded-[13px] bg-gold/[0.14] text-gold transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <motion.span
                        className="inline-flex"
                        animate={reduce ? undefined : { y: [0, -2.5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                      >
                        <Icon className="size-6" strokeWidth={1.8} aria-hidden />
                      </motion.span>
                    </span>
                    <span className="flex flex-col gap-1 leading-normal">
                      <span className="font-display text-[19px] font-medium text-white">{item.title}</span>
                      <span className="font-body text-[14px] text-haze">{item.text}</span>
                    </span>
                  </StaggerItem>
                )
              })}
            </Stagger>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

export default function Contact() {
  const c = useContent(content)
  return (
    <div className="relative">
      {/* Background glows (Figma "Glow" ellipses: sky 20% top-centre, sand 10% lower start) */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-[624px] bottom-0 overflow-hidden">
        <div className="absolute start-1/2 top-0 h-[900px] w-[1200px] -translate-x-1/2 rtl:translate-x-1/2">
          <div className="size-full rounded-full bg-[radial-gradient(closest-side,rgba(3,199,252,0.2),rgba(3,199,252,0))] animate-float-slow" />
        </div>
        <div className="absolute -start-[320px] top-[1220px] h-[700px] w-[900px]">
          <div className="size-full rounded-full bg-[radial-gradient(closest-side,rgba(231,171,54,0.1),rgba(231,171,54,0))] animate-float" style={{ animationDelay: '-4s' }} />
        </div>
      </div>

      <PageHeader header={c.header} />

      <section className="relative pb-16 lg:pb-24" aria-label={c.form.title}>
        <Container>
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[461fr_823fr]">
            <ContactChannels office={c.office} channels={c.channels} branches={c.branches} />
            <Reveal from="end" delay={0.15} id="job-order" className="scroll-mt-28">
              <JobOrderForm copy={c.form} />
            </Reveal>
          </div>
        </Container>
      </section>

      <Assurances items={c.assurances} />
    </div>
  )
}
