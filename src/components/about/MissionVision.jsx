import { Eye, Target } from 'lucide-react'
import { Container } from '../ui.jsx'
import { Stagger, StaggerItem, Tilt } from '../../motion/index.jsx'

const ICONS = [Target, Eye]

export default function MissionVision({ items }) {
  return (
    <Container as="section" className="pb-20 lg:pb-[120px]">
      <Stagger className="grid gap-6 lg:grid-cols-2 lg:gap-[32px]" stagger={0.15}>
        {items.map((item, i) => {
          const Icon = ICONS[i] ?? Target
          return (
            <StaggerItem key={item.eyebrow} className="h-full">
              <Tilt max={4} className="group h-full rounded-[24px]">
                <article className="relative flex h-full flex-col items-start gap-[18px] overflow-hidden rounded-[24px] border border-white/[0.09] bg-white/[0.04] p-7 transition-colors duration-500 group-hover:border-sky/30 sm:p-[40px]">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-24 -end-24 size-64 rounded-full bg-[radial-gradient(circle,rgba(3,199,252,0.22),transparent_65%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  />
                  <span className="relative flex size-[52px] items-center justify-center rounded-[14px] bg-[rgba(3,199,252,0.14)] text-sky transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                    <Icon className="size-[26px]" strokeWidth={1.8} aria-hidden />
                  </span>
                  <p className="relative font-body text-[14px] font-medium tracking-[1.96px] text-sky rtl:tracking-normal">{item.eyebrow}</p>
                  <h2 className="relative font-display text-[26px] font-medium leading-[1.18] text-white sm:text-[32px] rtl:leading-[1.4]">{item.title}</h2>
                  <p className="relative font-body text-[16px] leading-[1.6] text-haze sm:text-[17px] rtl:leading-[1.75]">{item.body}</p>
                </article>
              </Tilt>
            </StaggerItem>
          )
        })}
      </Stagger>
    </Container>
  )
}
