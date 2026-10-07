import { motion } from 'framer-motion'
import { Award, BadgeCheck, Compass, ShieldCheck } from 'lucide-react'
import { Container, SectionHeader } from '../ui.jsx'
import { Stagger, StaggerItem } from '../../motion/index.jsx'

const ICONS = [Compass, ShieldCheck, Award, BadgeCheck]

export default function Values({ t }) {
  return (
    <Container as="section" className="flex flex-col gap-10 py-20 lg:gap-[48px] lg:py-[120px]">
      <SectionHeader eyebrow={t.eyebrow} title={t.title} description={t.description} />
      <Stagger as="ul" className="grid gap-5 sm:grid-cols-2 lg:gap-[32px] xl:grid-cols-4" stagger={0.12}>
        {t.items.map((item, i) => {
          const Icon = ICONS[i]
          return (
            <StaggerItem as="li" key={item.title} className="flex">
              <motion.article
                className="group relative flex min-h-[292px] w-full flex-col overflow-hidden rounded-[20px] border border-[#dce4ec] bg-white p-[28px] sm:p-[32px]"
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={{
                  rest: { y: 0, boxShadow: '0 0 0 rgba(3,199,252,0)' },
                  hover: { y: -8, boxShadow: '0 24px 50px -24px rgba(3,199,252,0.55)' },
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
                {/* sky wash that rises on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 translate-y-full bg-gradient-to-t from-sky/10 to-transparent transition-transform duration-500 group-hover:translate-y-0"
                />
                <span className="relative flex size-[52px] items-center justify-center rounded-[14px] bg-sky/14 text-teal transition-colors duration-300 group-hover:bg-sky/25">
                  <motion.span
                    className="inline-flex"
                    variants={{ rest: { rotate: 0, scale: 1 }, hover: { rotate: [0, -14, 10, -6, 0], scale: 1.12 } }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="size-[26px]" strokeWidth={1.8} aria-hidden />
                  </motion.span>
                </span>
                <h3 className="relative mt-[28px] font-display text-[22px] font-medium leading-[1.25] text-navy sm:text-[23px]">{item.title}</h3>
                <p className="relative mt-[12px] font-body text-[16px] leading-[1.55] text-body">{item.body}</p>
              </motion.article>
            </StaggerItem>
          )
        })}
      </Stagger>
    </Container>
  )
}
