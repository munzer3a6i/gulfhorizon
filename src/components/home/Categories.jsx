import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import cat1 from '../../assets/img/cat-1.jpg'
import cat2 from '../../assets/img/cat-2.jpg'
import cat4 from '../../assets/img/cat-4.jpg'
import bentoSun from '../../assets/svg/bento-sun.svg'
import { useLang } from '../../i18n.jsx'
import { Container, DirArrow, SectionHeader } from '../ui.jsx'
import { EASE, Stagger, StaggerItem, Tilt } from '../../motion/index.jsx'

const IMAGES = { hotel: cat1, hospital: cat2, drivers: cat4 }

function RequestLink({ label, className = '' }) {
  const { to } = useLang()
  return (
    <Link
      to={to('/contact')}
      className={`group/link relative z-30 inline-flex items-center gap-[8px] pt-[6px] font-body text-[15px] font-medium text-gold transition-colors hover:text-[#f5cf7a] ${className}`}
    >
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-bottom bg-no-repeat transition-[background-size] duration-300 group-hover/link:bg-[length:100%_1px] ltr:bg-left rtl:bg-right">
        {label}
      </span>
      <span className="inline-flex transition-transform duration-300 group-hover/link:translate-x-1 rtl:group-hover/link:-translate-x-1">
        <DirArrow className="size-[16px]" />
      </span>
    </Link>
  )
}

function CategoryCard({ card, image, link, className = '' }) {
  const reduce = useReducedMotion()
  return (
    <Tilt max={6} className={`h-full overflow-hidden rounded-[24px] bg-ink-raised ${className}`}>
      {/* The in-view trigger sits on the (unclipped) card: an element that starts fully clipped has no
          visible area, so it would never register as "in view" and the photo would stay hidden. */}
      <motion.article
        className="group relative flex h-full flex-col items-start justify-end gap-[10px] overflow-hidden rounded-[24px] p-[24px] sm:p-[28px]"
        initial={reduce ? false : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          className="absolute inset-0"
          variants={{
            hidden: { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.15 },
            show: { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, transition: { duration: 1.2, ease: EASE } },
          }}
        >
          <img
            src={image}
            alt={card.alt}
            decoding="async"
            className="size-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
          />
        </motion.div>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[rgba(7,26,46,0)] from-25% to-[rgba(7,26,46,0.95)] transition-opacity duration-500 group-hover:opacity-90" />
        <span className="relative rounded-[99px] border border-white/25 bg-white/14 px-[12px] py-[5px] font-body text-[12px] font-medium tracking-[0.96px] text-white backdrop-blur-[4px] rtl:tracking-normal">
          {card.tag}
        </span>
        <h3 className="relative font-display text-[24px] font-medium leading-[1.15] text-white sm:text-[28px]">{card.title}</h3>
        <p className="relative font-body text-[15px] leading-[1.55] text-mist">{card.roles}</p>
        <RequestLink label={link} />
      </motion.article>
    </Tilt>
  )
}

function FeatureCard({ f }) {
  const reduce = useReducedMotion()
  return (
    <Tilt max={4} className="h-full overflow-hidden rounded-[24px]">
      <article className="relative flex h-full min-h-[400px] flex-col justify-between gap-10 overflow-hidden rounded-[24px] bg-gold p-[24px] sm:p-[40px]">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -top-[150px] start-[40%] size-[420px] lg:start-[560px]"
          animate={reduce ? undefined : { scale: [1, 1.12, 1], rotate: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img src={bentoSun} alt="" className="block size-full max-w-none" />
        </motion.div>

        <div className="relative flex items-start justify-between gap-6">
          <div className="flex max-w-[489px] flex-col items-start gap-[14px]">
            <span className="rounded-[99px] bg-navy/10 px-[12px] py-[5px] font-body text-[12px] font-medium tracking-[0.96px] text-navy rtl:tracking-normal">{f.tag}</span>
            <h3 className="font-display text-[28px] font-medium leading-[1.12] tracking-[-0.18px] text-navy sm:text-[36px] rtl:tracking-normal">{f.title}</h3>
            <p className="max-w-[460px] font-body text-[16px] leading-[1.55] text-gold-ink">{f.body}</p>
          </div>
          <motion.span
            className="flex size-[56px] shrink-0 items-center justify-center rounded-[18px] bg-navy text-gold sm:size-[64px]"
            initial={reduce ? false : { scale: 0, rotate: -30 }}
            whileInView={{ scale: 1, rotate: 0 }}
            whileHover={{ rotate: [0, -10, 8, 0], scale: 1.08 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.3 }}
          >
            <Briefcase className="size-[26px] sm:size-[30px]" strokeWidth={1.8} aria-hidden />
          </motion.span>
        </div>

        <Stagger as="ul" className="relative flex flex-wrap gap-[10px]" stagger={0.06} delay={0.35}>
          {f.roles.map((r) => (
            <StaggerItem as="li" key={r} from="scale">
              <motion.span
                className="inline-block cursor-default rounded-[99px] bg-white/55 px-[14px] py-[8px] font-body text-[14px] font-medium text-navy transition-colors duration-300 hover:bg-white/85"
                whileHover={{ y: -3, scale: 1.04 }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
              >
                {r}
              </motion.span>
            </StaggerItem>
          ))}
        </Stagger>
      </article>
    </Tilt>
  )
}

export default function Categories({ t }) {
  const [first, ...rest] = t.cards
  return (
    <Container as="section" id="categories" className="flex scroll-mt-[110px] flex-col gap-10 pb-20 lg:gap-[48px] lg:pb-[120px]">
      <SectionHeader eyebrow={t.eyebrow} title={t.title} description={t.description} />
      <div className="flex flex-col gap-[24px]">
        <Stagger className="grid gap-[24px] lg:grid-cols-[minmax(0,1fr)_minmax(0,428px)]" stagger={0.15}>
          <StaggerItem>
            <FeatureCard f={t.feature} />
          </StaggerItem>
          <StaggerItem className="h-[380px] lg:h-[400px]">
            <CategoryCard card={first} image={IMAGES[first.image]} link={t.link} />
          </StaggerItem>
        </Stagger>
        <Stagger className="grid gap-[24px] sm:grid-cols-2" stagger={0.13}>
          {rest.map((card) => (
            <StaggerItem key={card.title} className="h-[360px]">
              <CategoryCard card={card} image={IMAGES[card.image]} link={t.link} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Container>
  )
}
