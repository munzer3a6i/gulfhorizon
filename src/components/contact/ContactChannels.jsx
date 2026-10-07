import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Building2, Mail, MapPin, Phone } from 'lucide-react'
import { FACEBOOK_URL } from '../../content/common.js'
import { MAP_URL } from '../../content/contact.js'
import { useLang } from '../../i18n.jsx'
import { EASE, Reveal, Stagger, StaggerItem, Tilt } from '../../motion/index.jsx'
import { DirArrow } from '../ui.jsx'

function FacebookIcon({ className, style }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

const ICONS = { phone: Phone, mail: Mail, facebook: FacebookIcon }

const glass = 'border border-white/[0.09] bg-white/[0.04] rounded-[24px]'

function OfficeCard({ office }) {
  return (
    <Tilt max={4} className="rounded-[24px]">
      <div className={`group relative flex flex-col items-start gap-4 overflow-hidden p-6 sm:p-8 ${glass} transition-colors duration-500 hover:border-sky/30`}>
        {/* soft sky wash that follows hover */}
        <span aria-hidden className="pointer-events-none absolute -top-24 -end-24 size-[260px] rounded-full bg-[radial-gradient(circle,rgba(3,199,252,0.18),transparent_65%)] opacity-60 transition-opacity duration-700 group-hover:opacity-100" />
        <span className="relative flex size-[52px] items-center justify-center rounded-[14px] bg-sky/[0.14] text-sky">
          <span aria-hidden className="absolute inset-0 rounded-[14px] border border-sky/50 animate-pulse-ring" />
          <Building2 className="size-[26px] transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:scale-110" strokeWidth={1.8} aria-hidden />
        </span>
        <h2 className="font-display text-[24px] font-medium leading-normal text-white sm:text-[26px]">{office.title}</h2>
        <address className="font-body text-[16px] not-italic leading-[1.6] text-haze">
          {office.address.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </address>
        <a
          href={MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group/map relative inline-flex items-center gap-2 font-body text-[15px] font-medium text-gold"
        >
          <span className="relative">
            {office.mapLabel}
            <span className="absolute -bottom-[3px] start-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover/map:scale-x-100 rtl:origin-right" />
          </span>
          <span className="inline-flex transition-transform duration-300 group-hover/map:translate-x-1 rtl:group-hover/map:-translate-x-1">
            <DirArrow className="size-4" />
          </span>
        </a>
      </div>
    </Tilt>
  )
}

function ChannelRow({ channel, first }) {
  const Icon = ICONS[channel.icon]
  const href = channel.facebook ? FACEBOOK_URL : channel.href
  const external = channel.facebook
  return (
    <StaggerItem as="li" from="start" className={first ? '' : 'border-t border-white/[0.08]'}>
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="group relative -mx-3 flex items-center gap-4 rounded-[16px] px-3 py-5 transition-colors duration-300 hover:bg-white/[0.04] focus-visible:outline-2 focus-visible:outline-gold"
      >
        <span className="relative flex size-[44px] shrink-0 items-center justify-center rounded-[12px] bg-gold/[0.14] text-gold transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-6">
          <Icon className="size-[22px]" style={{ width: 22, height: 22 }} strokeWidth={1.8} aria-hidden />
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-[3px] leading-normal">
          <span className="font-body text-[12px] font-medium tracking-[0.96px] text-haze rtl:tracking-normal">{channel.label}</span>
          <span
            className="font-display text-[17px] font-medium text-white break-words transition-colors duration-300 group-hover:text-gold sm:text-[19px] rtl:text-end"
            {...(channel.ltr ? { dir: 'ltr' } : {})}
          >
            {channel.value}
          </span>
          {channel.note && <span className="font-body text-[13px] text-slate">{channel.note}</span>}
        </span>
        <ArrowUpRight
          className="size-[18px] shrink-0 text-gold opacity-0 transition-all duration-300 -translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 rtl:-scale-x-100"
          strokeWidth={2}
          aria-hidden
        />
      </a>
    </StaggerItem>
  )
}

function BranchesCard({ branches }) {
  const { to } = useLang()
  const reduce = useReducedMotion()
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.4, ease: EASE }}>
      <Link
        to={to('/about')}
        className="group relative flex items-center gap-4 overflow-hidden rounded-[24px] bg-gradient-to-r from-teal to-sky py-6 ps-6 pe-7 shadow-[0_24px_60px_-30px_rgba(3,199,252,0.8)] rtl:bg-gradient-to-l focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
      >
        <span aria-hidden className="pointer-events-none absolute inset-y-0 start-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer" />
        <span className="relative flex size-[52px] shrink-0 items-center justify-center rounded-[14px] bg-white/[0.18] text-white">
          <span aria-hidden className="absolute inset-0 rounded-[14px] border border-white/60 animate-pulse-ring" />
          <motion.span
            className="relative inline-flex"
            animate={reduce ? undefined : { y: [0, -3, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <MapPin className="size-[26px]" strokeWidth={1.8} aria-hidden />
          </motion.span>
        </span>
        <span className="relative flex min-w-0 flex-1 flex-col gap-[3px] leading-normal">
          <span className="font-display text-[20px] font-semibold text-white">{branches.title}</span>
          <span className="font-body text-[14px] text-white/85">{branches.list}</span>
        </span>
        <span className="relative inline-flex text-white transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
          <DirArrow className="size-[22px]" />
        </span>
      </Link>
    </motion.div>
  )
}

/** Start column of the Contact body: office card, direct channels list and regional branches card. */
export default function ContactChannels({ office, channels, branches }) {
  return (
    <div className="flex flex-col gap-6">
      <Reveal from="start">
        <OfficeCard office={office} />
      </Reveal>
      <Reveal from="start" delay={0.1}>
        <div className={`px-6 py-2 sm:px-8 ${glass}`}>
          <Stagger as="ul" stagger={0.1} delay={0.15}>
            {channels.map((c, i) => (
              <ChannelRow key={c.key} channel={c} first={i === 0} />
            ))}
          </Stagger>
        </div>
      </Reveal>
      <Reveal from="start" delay={0.2}>
        <BranchesCard branches={branches} />
      </Reveal>
    </div>
  )
}
