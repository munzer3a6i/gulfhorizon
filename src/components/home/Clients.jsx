import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import logoKkesh from '../../assets/img/logo-9edb130f70.png'
import logoOthaim from '../../assets/img/logo-3d3cffd7c1.png'
import logoHerfy from '../../assets/img/logo-5b03b81863.png'
import logoGhurair from '../../assets/img/logo-3c74226aff.png'
import logoRadisson from '../../assets/img/logo-118521a2ca.png'
import logoTabuk from '../../assets/img/logo-b8136ca481.png'
import logoMojil from '../../assets/img/logo-c0f6bb1446.png'
import logoSharjah from '../../assets/img/logo-2b4f79cb88.png'
import { useLang } from '../../i18n.jsx'
import { Container, DirArrow, SectionHeader } from '../ui.jsx'
import { Reveal, Stagger, StaggerItem } from '../../motion/index.jsx'

/** Logo treatment per tile, matching the Figma monograms (same order as content.items). */
const LOGOS = [
  { src: logoKkesh, cls: 'object-cover rounded-[12px]' },
  { src: logoOthaim, cls: 'object-contain' },
  { src: logoHerfy, cls: 'object-contain' },
  { src: logoGhurair, cls: 'object-contain' },
  { src: logoRadisson, cls: 'object-contain rounded-[12px] bg-white' },
  { src: logoTabuk, cls: 'object-cover rounded-[12px]' },
  { src: logoMojil, cls: 'object-contain rounded-[12px]' },
  { src: logoSharjah, cls: 'object-cover rounded-[12px]' },
]

export default function Clients({ t }) {
  const { to } = useLang()
  return (
    <Container as="section" className="flex flex-col gap-10 py-20 lg:gap-[48px] lg:py-[120px]">
      <SectionHeader eyebrow={t.eyebrow} title={t.title} description={t.description} />
      <Stagger as="ul" className="grid gap-[14px] sm:grid-cols-2 sm:gap-[20px] lg:grid-cols-4" stagger={0.07}>
        {t.items.map((c, i) => (
          <StaggerItem as="li" key={c.name} from="scale" className="flex">
            <motion.div
              className="group relative flex w-full items-center gap-[14px] overflow-hidden rounded-[16px] border border-white/9 bg-white/4 px-[20px] py-[18px] transition-colors duration-300 hover:border-sky/35 hover:bg-white/[0.07]"
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 320, damping: 20 }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 -start-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent opacity-0 transition-[inset-inline-start,opacity] duration-700 group-hover:start-[120%] group-hover:opacity-100"
              />
              <span className="relative flex size-[46px] shrink-0 items-center justify-center transition-transform duration-500 group-hover:scale-110">
                <img src={LOGOS[i].src} alt={`${c.name} ${t.logoAlt}`} loading="lazy" className={`size-full ${LOGOS[i].cls}`} />
              </span>
              <span className="relative flex min-w-0 flex-1 flex-col gap-[3px]">
                <span className="font-body text-[15px] font-medium leading-[1.35] text-white">{c.name}</span>
                <span className="font-body text-[13px] text-haze">{c.place}</span>
              </span>
            </motion.div>
          </StaggerItem>
        ))}
      </Stagger>
      <Reveal from="start" delay={0.2}>
        <Link to={to('/deployments')} className="group inline-flex items-center gap-[8px] font-body text-[16px] font-medium text-gold transition-colors hover:text-[#f5cf7a]">
          <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-bottom bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_1px] ltr:bg-left rtl:bg-right">
            {t.link}
          </span>
          <span className="inline-flex transition-transform duration-300 group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5">
            <DirArrow className="size-[18px]" />
          </span>
        </Link>
      </Reveal>
    </Container>
  )
}
