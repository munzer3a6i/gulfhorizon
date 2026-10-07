import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useLang } from '../i18n.jsx'
import { Magnetic, Reveal, SplitText } from '../motion/index.jsx'

/** Arrow that points in the reading direction. */
export function DirArrow({ className = 'size-[18px]', strokeWidth = 2 }) {
  return <ArrowRight className={`shrink-0 rtl:-scale-x-100 ${className}`} strokeWidth={strokeWidth} aria-hidden />
}

const VARIANTS = {
  primary: 'bg-gold text-navy hover:bg-[#f0bb4f] shadow-[0_10px_30px_-12px_rgba(231,171,54,0.7)]',
  outline: 'bg-white/[0.06] border border-white/35 text-white hover:bg-white/[0.12] hover:border-white/60',
  ghost: 'text-gold',
}

/**
 * Pill button from the design system ("Button" component: Primary / Outline).
 * Renders a router <Link> when `to` is set (path is localised automatically), <a> for `href`, otherwise <button>.
 */
export function Button({ to, href, variant = 'primary', arrow = true, magnetic = true, size = 'md', className = '', children, ...rest }) {
  const { to: localise } = useLang()
  const sizing = size === 'lg' ? 'px-[26px] py-[14px] text-[17px]' : size === 'sm' ? 'px-[20px] py-[10px] text-[15px]' : 'px-[24px] py-[13px] text-[17px]'
  const cls = `group relative inline-flex items-center justify-center gap-[8px] overflow-hidden rounded-full font-body font-medium leading-none whitespace-nowrap transition-[background-color,border-color,transform,box-shadow] duration-300 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ${sizing} ${VARIANTS[variant]} ${className}`
  const inner = (
    <>
      {variant === 'primary' && (
        <span aria-hidden className="pointer-events-none absolute inset-y-0 start-0 w-1/3 bg-gradient-to-r from-transparent via-white/45 to-transparent animate-shimmer" />
      )}
      <span className="relative">{children}</span>
      {arrow && (
        <span className="relative inline-flex transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
          <DirArrow />
        </span>
      )}
    </>
  )
  let el
  if (to) {
    el = (
      <Link to={to.startsWith('/') ? localise(to) : to} className={cls} {...rest}>
        {inner}
      </Link>
    )
  } else if (href) {
    el = (
      <a href={href} className={cls} {...rest}>
        {inner}
      </a>
    )
  } else {
    el = (
      <button className={cls} {...rest}>
        {inner}
      </button>
    )
  }
  return magnetic ? <Magnetic strength={0.22}>{el}</Magnetic> : el
}

/** Small uppercase label above section titles (gold, wide tracking). */
export function Eyebrow({ children, className = '', tone = 'sky' }) {
  const color = tone === 'gold' ? 'text-gold' : tone === 'teal' ? 'text-teal' : 'text-sky'
  return (
    <Reveal as="p" from="start" distance={20} className={`font-body text-[14px] font-medium tracking-[1.96px] uppercase rtl:tracking-normal ${color} ${className}`}>
      {children}
    </Reveal>
  )
}

/**
 * Two-column section header used throughout the design: eyebrow + title on the start side,
 * description on the end side.
 */
export function SectionHeader({ eyebrow, eyebrowTone, title, description, light = false, className = '', titleClassName = 'max-w-[640px]' }) {
  return (
    <div className={`flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between ${className}`}>
      <div className={`flex flex-col gap-[14px] ${titleClassName}`}>
        {eyebrow && <Eyebrow tone={eyebrowTone ?? (light ? 'teal' : 'sky')}>{eyebrow}</Eyebrow>}
        <SplitText
          text={title}
          className={`font-display text-[34px] font-medium leading-[1.1] tracking-[-0.48px] sm:text-[42px] lg:text-[48px] rtl:tracking-normal ${light ? 'text-navy' : 'text-white'}`}
        />
      </div>
      {description && (
        <Reveal delay={0.15} className={`max-w-[440px] font-body text-[17px] leading-[1.58] ${light ? 'text-body' : 'text-haze'}`}>
          <p>{description}</p>
        </Reveal>
      )}
    </div>
  )
}

/** Horizontal page container matching the 1440 frame with 62px gutters. */
export function Container({ as: Comp = 'div', className = '', children, ...rest }) {
  return (
    <Comp className={`relative mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-[62px] ${className}`} {...rest}>
      {children}
    </Comp>
  )
}

/** Rounded square icon badge (gold tint) used in steps, glass stats and contact details. */
export function IconBadge({ icon: Icon, size = 44, iconSize = 22, className = '', tone = 'gold' }) {
  const tones = {
    gold: 'bg-gold/12 border-gold/40 text-gold',
    sky: 'bg-sky/10 border-sky/40 text-sky',
    solid: 'bg-gold border-transparent text-navy',
  }
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-[12px] border ${tones[tone]} ${className}`}
      style={{ width: size, height: size }}
    >
      <Icon style={{ width: iconSize, height: iconSize }} strokeWidth={1.8} aria-hidden />
    </span>
  )
}
