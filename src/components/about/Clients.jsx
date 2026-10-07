import { motion, useReducedMotion } from 'framer-motion'
import { Briefcase, Building, Globe, Heart } from 'lucide-react'
import { Container } from '../ui.jsx'
import { CountUp, EASE, Reveal, Stagger, StaggerItem } from '../../motion/index.jsx'
import Heading from './Heading.jsx'

// Client logos exported from Figma as logo-<first 10 chars of image hash>.png.
const LOGOS = Object.fromEntries(
  Object.entries(import.meta.glob('../../assets/img/logo-*.png', { eager: true, import: 'default' })).map(([path, url]) => [
    path.match(/logo-([0-9a-f]+)\.png$/)[1],
    url,
  ]),
)

const SECTOR_ICONS = [Heart, Building, Briefcase, Globe]

function initials(name) {
  return name
    .replace(/[()&.]/g, ' ')
    .split(/\s+/)
    .filter((w) => w && !/^(al|co|of|the|and)$/i.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

function Monogram({ client }) {
  const src = client.logo ? LOGOS[client.logo] : null
  const bg = client.bg === 'black' ? 'bg-black' : client.bg === 'white' ? 'bg-white' : client.tint || !src ? 'bg-[rgba(10,110,140,0.1)]' : ''
  return (
    <span
      className={`flex size-[46px] shrink-0 items-center justify-center overflow-hidden rounded-[12px] transition-transform duration-500 group-hover:scale-110 ${bg}`}
      aria-hidden
    >
      {src ? (
        <img src={src} alt="" loading="lazy" className={`size-full ${client.fit || client.inset ? 'object-contain' : 'object-cover'} ${client.inset ? 'p-[2px]' : ''}`} />
      ) : (
        <span className="font-display text-[16px] font-semibold text-teal">{client.mono ?? initials(client.name)}</span>
      )}
    </span>
  )
}

function ClientTile({ client }) {
  return (
    <div className="group flex min-h-[80px] items-center gap-[14px] rounded-[16px] border border-[#dce4ec] bg-white px-[20px] py-[16px] transition-[transform,box-shadow,border-color] duration-400 hover:-translate-y-1 hover:border-teal/35 hover:shadow-[0_18px_40px_-24px_rgba(11,27,43,0.35)]">
      <Monogram client={client} />
      <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
        <p className="font-body text-[15px] font-medium leading-[1.35] text-navy">{client.name}</p>
        <p className="font-body text-[13px] text-[#6b7a8c]">{client.city}</p>
      </div>
    </div>
  )
}

export default function Clients({ t }) {
  const reduce = useReducedMotion()
  return (
    <section className="relative bg-paper">
      <Container className="flex flex-col gap-10 py-20 lg:gap-[48px] lg:py-[120px]">
        <Heading eyebrow={t.eyebrow} title={t.title} description={t.description} light />

        <div className="grid gap-10 sm:grid-cols-2 sm:gap-x-[24px] lg:grid-cols-4">
          {t.sectors.map((sector, si) => {
            const Icon = SECTOR_ICONS[si] ?? Globe
            return (
              <Stagger key={sector.title} className="flex flex-col gap-[12px]" stagger={0.07} delay={si * 0.1}>
                <StaggerItem className="flex items-center gap-[10px] pb-[6px]">
                  <motion.span
                    className="flex size-[36px] shrink-0 items-center justify-center rounded-[10px] bg-gold text-navy"
                    whileHover={reduce ? undefined : { rotate: -8, scale: 1.08 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    <Icon className="size-[18px]" strokeWidth={1.8} aria-hidden />
                  </motion.span>
                  <h3 className="font-display text-[20px] font-medium text-navy">{sector.title}</h3>
                </StaggerItem>
                <ul className="contents">
                  {sector.clients.map((client) => (
                    <StaggerItem as="li" key={client.name}>
                      <ClientTile client={client} />
                    </StaggerItem>
                  ))}
                </ul>
              </Stagger>
            )
          })}
        </div>

        <Reveal className="flex flex-col gap-2 rounded-[16px] bg-[rgba(10,110,140,0.08)] px-[24px] py-[18px] sm:flex-row sm:items-center sm:gap-[12px]">
          <CountUp value={t.note.count} className="shrink-0 font-display text-[18px] font-semibold text-teal" />
          <p className="flex-1 font-body text-[15px] text-body">{t.note.detail}</p>
        </Reveal>
      </Container>
    </section>
  )
}
