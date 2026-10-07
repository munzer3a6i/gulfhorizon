import { BadgeCheck, Heart, ShieldCheck, Zap } from 'lucide-react'
import { Container } from '../ui.jsx'
import { Stagger, StaggerItem } from '../../motion/index.jsx'
import Heading from './Heading.jsx'

const ICONS = [BadgeCheck, ShieldCheck, Zap, Heart]
// The second card (Integrity) is the highlighted gold card in the design.
const FEATURED = 1

export default function Principles({ t }) {
  return (
    <Container as="section" className="flex flex-col gap-[40px] pb-20 lg:pb-[120px]">
      <Heading eyebrow={t.eyebrow} title={t.title} />
      <Stagger as="ul" className="grid gap-4 sm:grid-cols-2 sm:gap-[24px] lg:grid-cols-4" stagger={0.1}>
        {t.items.map((item, i) => {
          const Icon = ICONS[i] ?? BadgeCheck
          const featured = i === FEATURED
          return (
            <StaggerItem as="li" key={item.title} className="h-full">
              <article
                className={`group relative flex h-full flex-col items-start gap-[14px] overflow-hidden rounded-[24px] p-[32px] transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-2 ${
                  featured
                    ? 'bg-gold hover:shadow-[0_30px_60px_-30px_rgba(231,171,54,0.7)]'
                    : 'border border-white/[0.09] bg-white/5 hover:border-gold/40 hover:shadow-[0_30px_60px_-34px_rgba(3,199,252,0.45)]'
                }`}
              >
                <span
                  aria-hidden
                  className={`pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100 rtl:origin-right ${
                    featured ? 'bg-navy/30' : 'bg-gradient-to-r from-gold to-sky rtl:bg-gradient-to-l'
                  }`}
                />
                <Icon
                  className={`size-[28px] transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-115 ${featured ? 'text-navy' : 'text-gold'}`}
                  strokeWidth={1.8}
                  aria-hidden
                />
                <span aria-hidden className="h-[6px]" />
                <h3 className={`font-display text-[24px] font-medium sm:text-[26px] ${featured ? 'text-navy' : 'text-white'}`}>{item.title}</h3>
                <p className={`font-body text-[15px] leading-[1.6] rtl:leading-[1.75] ${featured ? 'text-gold-ink' : 'text-haze'}`}>{item.body}</p>
              </article>
            </StaggerItem>
          )
        })}
      </Stagger>
    </Container>
  )
}
