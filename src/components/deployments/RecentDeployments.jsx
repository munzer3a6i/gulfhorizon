import { useRef } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { MapPin, SearchX, Users } from 'lucide-react'
import aboutHero from '../../assets/img/about-hero.jpg'
import citySaudi from '../../assets/img/city-saudi.jpg'
import deploy4 from '../../assets/img/deploy-4.jpg'
import cityPhilippines from '../../assets/img/city-philippines.jpg'
import { Container, Eyebrow } from '../ui.jsx'
import { EASE, SplitText, Tilt } from '../../motion/index.jsx'

const IMAGES = { aboutHero, citySaudi, deploy4, cityPhilippines }

/** Sector filter chips; the gold "selected" pill slides between chips. */
function FilterChips({ filters, active, onChange, label }) {
  return (
    <motion.div
      role="tablist"
      aria-label={label}
      className="flex flex-wrap gap-[10px]"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
    >
      {filters.map((f) => {
        const selected = f.id === active
        return (
          <motion.button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(f.id)}
            variants={{ hidden: { opacity: 0, y: 14, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE } } }}
            whileTap={{ scale: 0.94 }}
            className={`relative isolate rounded-[99px] border px-[18px] py-[10px] font-body text-[15px] font-medium leading-[normal] whitespace-nowrap transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
              selected
                ? 'border-transparent text-navy'
                : 'border-white/18 bg-white/[0.04] text-cloud hover:border-white/40 hover:bg-white/[0.08] hover:text-white'
            }`}
          >
            {selected && (
              <motion.span
                layoutId="deploy-chip"
                aria-hidden
                className="absolute inset-[-1px] -z-10 rounded-[99px] bg-gold shadow-[0_8px_24px_-10px_rgba(231,171,54,0.8)]"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            {f.label}
          </motion.button>
        )
      })}
    </motion.div>
  )
}

function DeploymentCard({ card }) {
  return (
    <Tilt max={6} className="h-full rounded-[20px]">
      <article className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-white/[0.08] bg-ink-panel transition-[border-color,box-shadow] duration-500 hover:border-sky/35 hover:shadow-[0_30px_60px_-30px_rgba(3,199,252,0.45)]">
        <div className="relative h-[190px] shrink-0 overflow-hidden bg-ink-raised">
          <img
            src={IMAGES[card.image]}
            alt={card.alt}
            loading="lazy"
            className="absolute inset-0 size-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.09]"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-panel/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
        <div className="flex flex-1 flex-col items-start gap-[12px] px-[22px] pt-[22px] pb-[24px]">
          <span className="rounded-[99px] bg-sky/12 px-[10px] py-[4px] font-body text-[12px] font-medium tracking-[0.48px] text-sky uppercase rtl:tracking-normal">
            {card.sectorLabel}
          </span>
          <h3 className="font-display text-[20px] font-medium leading-[1.28] text-white rtl:leading-[1.5]">{card.title}</h3>
          <p className="flex items-center gap-[6px] font-body text-[14px] text-haze">
            <MapPin className="size-[15px] shrink-0" strokeWidth={1.8} aria-hidden />
            {card.city}
          </p>
          <span aria-hidden className="relative h-px w-full overflow-hidden bg-white/[0.08]">
            <span className="absolute inset-y-0 start-0 w-full origin-left scale-x-0 bg-gradient-to-r from-gold to-sky transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 rtl:origin-right rtl:bg-gradient-to-l" />
          </span>
          <p className="mt-auto flex items-center gap-[8px] font-body text-[15px] font-medium text-gold">
            <Users className="size-[18px] shrink-0" strokeWidth={1.8} aria-hidden />
            {card.roles}
          </p>
        </div>
      </article>
    </Tilt>
  )
}

/** "Recent deployments" section: header with sector chips + animated, filterable card grid. */
export default function RecentDeployments({ content, active, onChange }) {
  const gridRef = useRef(null)
  const inView = useInView(gridRef, { once: true, margin: '0px 0px -12% 0px' })
  const reduce = useReducedMotion()
  const cards = content.cards.filter((c) => active === 'all' || c.sector === active)

  return (
    <Container as="section" className="flex flex-col gap-8 pb-[88px] lg:pb-[120px]">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-[14px]">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <SplitText
            text={content.title}
            className="font-display text-[34px] font-medium leading-[1.12] tracking-[-0.44px] text-white sm:text-[40px] lg:text-[44px] rtl:leading-[1.35] rtl:tracking-normal"
          />
        </div>
        <FilterChips filters={content.filters} active={active} onChange={onChange} label={content.filterLabel} />
      </div>

      <motion.ul ref={gridRef} layout className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <AnimatePresence mode="popLayout" initial={false}>
          {cards.map((card, i) => (
            <motion.li
              key={card.id}
              layout
              className="h-full"
              initial={reduce ? false : { opacity: 0, y: 40, scale: 0.94 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.94 }}
              exit={{ opacity: 0, scale: 0.88, filter: 'blur(6px)', transition: { duration: 0.35, ease: EASE } }}
              transition={{
                duration: 0.75,
                ease: EASE,
                delay: inView ? i * 0.1 : 0,
                layout: { type: 'spring', stiffness: 260, damping: 30 },
              }}
            >
              <DeploymentCard card={card} />
            </motion.li>
          ))}
          {cards.length === 0 && (
            <motion.li
              key="empty"
              layout
              className="col-span-full flex items-center gap-4 rounded-[20px] border border-dashed border-white/15 bg-white/[0.03] px-6 py-10 font-body text-[16px] text-haze sm:px-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.25 } }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
            >
              <SearchX className="size-7 shrink-0 text-sky" strokeWidth={1.6} aria-hidden />
              {content.empty}
            </motion.li>
          )}
        </AnimatePresence>
      </motion.ul>
    </Container>
  )
}
