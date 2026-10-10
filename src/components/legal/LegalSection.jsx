import { motion, useReducedMotion } from 'framer-motion'
import { ShieldCheck, Zap } from 'lucide-react'
import { EASE, Reveal, SplitText } from '../../motion/index.jsx'

const VIEWPORT = { once: true, margin: '0px 0px -10% 0px' }

// Latin snippets inside the copy (email, phone, license no., DMW site). They become links where useful
// and are isolated as LTR runs so they read correctly inside Arabic paragraphs.
const TOKENS = /(contact@gulfhorizon\.net|\+63 917 888 8970|DMW-217-LB-11282023-R|dmw\.gov\.ph|Gulf Horizon International Services(?![,.]? Inc))/
const LINK_CLS = 'whitespace-nowrap font-medium text-teal underline decoration-teal/30 underline-offset-[3px] transition-colors hover:decoration-teal'

export function Rich({ text }) {
  return String(text)
    .split(TOKENS)
    .map((part, i) => {
      if (i % 2 === 0) return part
      if (part.includes('@'))
        return (
          <a key={i} dir="ltr" href={`mailto:${part}`} className={LINK_CLS}>
            {part}
          </a>
        )
      if (part.startsWith('+'))
        return (
          <a key={i} dir="ltr" href="tel:+639178888970" className={LINK_CLS}>
            {part}
          </a>
        )
      if (part === 'dmw.gov.ph')
        return (
          <a key={i} dir="ltr" href="https://dmw.gov.ph" target="_blank" rel="noreferrer" className={LINK_CLS}>
            {part}
          </a>
        )
      if (part.startsWith('Gulf')) return <span key={i} dir="ltr">{part}</span>
      return (
        <span key={i} dir="ltr" className="font-medium text-navy">
          {part}
        </span>
      )
    })
}

const P_CLS = 'font-body text-[15px] leading-[1.68] text-[#3a4656] sm:text-[16px] rtl:leading-[1.75]'

function Paragraph({ text }) {
  return (
    <Reveal as="p" distance={18} duration={0.7} className={P_CLS}>
      <Rich text={text} />
    </Reveal>
  )
}

function Bullets({ items }) {
  const reduce = useReducedMotion()
  return (
    <motion.ul
      className="flex flex-col gap-[10px]"
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
    >
      {items.map((item, i) => (
        <motion.li
          key={i}
          className="flex items-start gap-[12px]"
          variants={{ hidden: reduce ? {} : { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
        >
          <motion.span
            aria-hidden
            className="mt-[9px] size-[7px] shrink-0 rounded-full bg-gold rtl:mt-[10px]"
            variants={{ hidden: reduce ? {} : { scale: 0 }, show: { scale: 1, transition: { type: 'spring', stiffness: 420, damping: 16, delay: 0.1 } } }}
          />
          <span className="flex-1 font-body text-[15px] leading-[1.6] text-[#3a4656] sm:text-[16px] rtl:leading-[1.75]">
            {typeof item === 'string' ? (
              <Rich text={item} />
            ) : (
              <>
                <strong className="font-medium text-navy">{item.lead}</strong>
                <Rich text={item.text} />
              </>
            )}
          </span>
        </motion.li>
      ))}
    </motion.ul>
  )
}

/** Numbered steps; the badges pop in one after another while a thin connector draws down between them. */
function Steps({ items }) {
  const reduce = useReducedMotion()
  return (
    <motion.ol
      className="flex flex-col gap-[10px]"
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
    >
      {items.map((item, i) => (
        <motion.li
          key={i}
          className="group relative flex items-start gap-[12px]"
          variants={{ hidden: reduce ? {} : { opacity: 0, x: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } } }}
        >
          {i < items.length - 1 && (
            <motion.span
              aria-hidden
              className="absolute start-[12.5px] top-[30px] bottom-[-6px] w-px origin-top bg-teal/20"
              variants={{ hidden: reduce ? {} : { scaleY: 0 }, show: { scaleY: 1, transition: { duration: 0.5, ease: EASE, delay: 0.25 } } }}
            />
          )}
          <motion.span
            aria-hidden
            className="relative flex size-[26px] shrink-0 items-center justify-center rounded-[13px] bg-teal/10 font-body text-[13px] font-medium text-teal transition-colors duration-300 group-hover:bg-teal group-hover:text-white"
            variants={{ hidden: reduce ? {} : { scale: 0.4, opacity: 0 }, show: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 380, damping: 18 } } }}
          >
            {i + 1}
          </motion.span>
          <span className="flex-1 font-body text-[15px] leading-[1.6] text-[#3a4656] sm:text-[16px] rtl:leading-[1.75]">
            <Rich text={item} />
          </span>
        </motion.li>
      ))}
    </motion.ol>
  )
}

const CALLOUT_TONES = {
  sky: { box: 'bg-sky/10 border-sky/45', icon: 'text-teal', glow: 'from-sky/25' },
  gold: { box: 'bg-gold/14 border-gold/45', icon: 'text-[#9a6508]', glow: 'from-gold/30' },
}
const CALLOUT_ICONS = { shield: ShieldCheck, zap: Zap }

function Callout({ tone = 'sky', icon = 'shield', title, text }) {
  const t = CALLOUT_TONES[tone]
  const Icon = CALLOUT_ICONS[icon]
  const reduce = useReducedMotion()
  return (
    <Reveal
      from="scale"
      duration={0.7}
      className={`group relative flex gap-[14px] overflow-hidden rounded-[16px] border px-[18px] py-[18px] sm:px-[22px] sm:py-[20px] ${t.box}`}
    >
      {/* soft light that follows the reading direction on hover */}
      <span
        aria-hidden
        className={`pointer-events-none absolute start-0 top-0 h-full w-2/3 bg-gradient-to-r ${t.glow} to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100 rtl:bg-gradient-to-l`}
      />
      <motion.span
        aria-hidden
        className={`relative mt-[1px] shrink-0 ${t.icon}`}
        initial={reduce ? false : { rotate: -25, scale: 0.5, opacity: 0 }}
        whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
        viewport={VIEWPORT}
        transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.25 }}
      >
        <Icon className="size-[22px]" strokeWidth={1.9} />
      </motion.span>
      <div className="relative flex min-w-0 flex-1 flex-col gap-[4px]">
        <p className="font-display text-[17px] font-semibold text-navy">{title}</p>
        <p className="font-body text-[15px] leading-[1.6] text-[#3a4656] rtl:leading-[1.75]">
          <Rich text={text} />
        </p>
      </div>
    </Reveal>
  )
}

const BLOCKS = { p: Paragraph, bullets: Bullets, steps: Steps, callout: Callout }

/** One numbered section of a legal document. */
export default function LegalSection({ section, index, divider }) {
  const num = String(index + 1).padStart(2, '0')
  return (
    <section
      id={section.id}
      className={`flex scroll-mt-[120px] flex-col gap-[16px] ${divider ? 'border-t border-paper-line pt-[32px] sm:pt-[40px]' : ''}`}
    >
      <Reveal as="p" from="start" distance={16} duration={0.6} className="font-body text-[13px] font-medium tracking-[1.3px] text-teal rtl:tracking-normal">
        {num}
      </Reveal>
      <SplitText
        text={section.title}
        stagger={0.04}
        className="font-display text-[24px] font-medium leading-[1.2] text-navy sm:text-[28px] rtl:leading-[1.45]"
      />
      {section.blocks.map((block, i) => {
        const Block = BLOCKS[block.type]
        return Block ? <Block key={i} {...block} /> : null
      })}
    </section>
  )
}
