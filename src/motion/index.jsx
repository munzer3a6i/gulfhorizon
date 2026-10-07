import { Children, useEffect, useRef, useState } from 'react'
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useLang } from '../i18n.jsx'

export const EASE = [0.22, 1, 0.36, 1]
const VIEWPORT = { once: true, margin: '0px 0px -12% 0px' }

/**
 * Fade + slide an element in when it scrolls into view.
 * `from` is logical: "start" slides in from the reading-start side (left in EN, right in AR).
 */
export function Reveal({ as = 'div', from = 'bottom', delay = 0, distance = 36, duration = 0.8, blur = false, className, children, ...rest }) {
  const { isRtl } = useLang()
  const reduce = useReducedMotion()
  const Comp = motion[as] ?? motion.div
  const sign = isRtl ? -1 : 1
  const offset = {
    bottom: { y: distance },
    top: { y: -distance },
    start: { x: -distance * sign },
    end: { x: distance * sign },
    scale: { scale: 0.92 },
    none: {},
  }[from]
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, ...offset, ...(blur ? { filter: 'blur(10px)' } : {}) }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={VIEWPORT}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Comp>
  )
}

/** Container that staggers its <StaggerItem> children into view. */
export function Stagger({ as = 'div', stagger = 0.09, delay = 0, className, children, ...rest }) {
  const Comp = motion[as] ?? motion.div
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...rest}
    >
      {children}
    </Comp>
  )
}

export function StaggerItem({ as = 'div', from = 'bottom', distance = 28, className, children, ...rest }) {
  const { isRtl } = useLang()
  const reduce = useReducedMotion()
  const Comp = motion[as] ?? motion.div
  const sign = isRtl ? -1 : 1
  const hidden = { opacity: 0, ...(from === 'bottom' ? { y: distance } : from === 'scale' ? { scale: 0.9 } : { x: -distance * sign }) }
  return (
    <Comp
      className={className}
      variants={{
        hidden: reduce ? { opacity: 1 } : hidden,
        show: { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE } },
      }}
      {...rest}
    >
      {children}
    </Comp>
  )
}

/** Heading that reveals word by word, rising out of a mask. */
export function SplitText({ as = 'h2', text, className, delay = 0, stagger = 0.055, highlight }) {
  const reduce = useReducedMotion()
  const Comp = motion[as] ?? motion.h2
  const words = String(text).split(' ')
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top" aria-hidden="true">
          <motion.span
            className={`inline-block ${highlight && highlight.includes(word.replace(/[.,’'!?؟،]/g, '')) ? 'text-gold' : ''}`}
            variants={{
              hidden: reduce ? { y: 0 } : { y: '110%', rotate: 4 },
              show: { y: '0%', rotate: 0, transition: { duration: 0.9, ease: EASE } },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Comp>
  )
}

/** Animates the numeric part of a value like "1,200+" or "45–60 days" when it enters view. */
export function CountUp({ value, duration = 2, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reduce = useReducedMotion()
  const match = String(value).match(/^(\D*)([\d,.]+)(.*)$/)
  const [display, setDisplay] = useState(match && !reduce ? `${match[1]}0${match[3]}` : value)

  useEffect(() => {
    if (!match || !inView || reduce) return
    const target = parseFloat(match[2].replace(/,/g, ''))
    const decimals = (match[2].split('.')[1] || '').length
    const useComma = match[2].includes(',')
    const controls = animate(0, target, {
      duration,
      ease: EASE,
      onUpdate: (v) => {
        let n = v.toFixed(decimals)
        if (useComma) n = Number(n).toLocaleString('en-US', { minimumFractionDigits: decimals })
        setDisplay(`${match[1]}${n}${match[3]}`)
      },
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}

/** Moves children vertically at a different rate than the scroll. */
export function Parallax({ speed = 0.15, className, children }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}%`, `${speed * 100}%`])
  return (
    <motion.div ref={ref} className={className} style={reduce ? undefined : { y }}>
      {children}
    </motion.div>
  )
}

/** Pulls its child gently toward the pointer. */
export function Magnetic({ strength = 0.3, className, children }) {
  const ref = useRef(null)
  const x = useSpring(0, { stiffness: 220, damping: 15, mass: 0.3 })
  const y = useSpring(0, { stiffness: 220, damping: 15, mass: 0.3 })
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }
  return (
    <motion.div ref={ref} className={`inline-flex ${className ?? ''}`} style={{ x, y }} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </motion.div>
  )
}

/** 3D tilt + moving glare on hover. */
export function Tilt({ max = 7, className, children, glare = true, ...rest }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 180, damping: 18 })
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 180, damping: 18 })
  const gx = useTransform(px, (v) => `${v * 100}%`)
  const gy = useTransform(py, (v) => `${v * 100}%`)
  const glareBg = useTransform([gx, gy], ([x, y]) => `radial-gradient(420px circle at ${x} ${y}, rgba(255,255,255,0.13), transparent 45%)`)
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  const reset = () => {
    px.set(0.5)
    py.set(0.5)
  }
  return (
    <motion.div
      ref={ref}
      className={`group/tilt relative [transform-style:preserve-3d] ${className ?? ''}`}
      style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      {...rest}
    >
      {children}
      {glare && !reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/tilt:opacity-100"
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  )
}

/** Infinite horizontal ticker; content is duplicated for a seamless loop. */
export function Marquee({ className, itemClassName, children, speed = 40 }) {
  const { isRtl } = useLang()
  const items = Children.toArray(children)
  return (
    <div className={`group/marquee relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] ${className ?? ''}`} dir="ltr">
      <div
        className={`flex w-max shrink-0 animate-marquee group-hover/marquee:[animation-play-state:paused] ${isRtl ? 'marquee-rtl' : ''}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {[...items, ...items].map((child, i) => (
          <div key={i} className={itemClassName} aria-hidden={i >= items.length}>
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}

/** Thin gold bar at the top of the viewport tracking page scroll. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 })
  const { isRtl } = useLang()
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-gradient-to-r from-gold via-[#f5cf7a] to-sky"
      style={{ scaleX, transformOrigin: isRtl ? '100% 50%' : '0% 50%' }}
    />
  )
}

/** Soft glow blob that drifts slowly — use for background atmosphere. */
export function Glow({ src, className, slow = false, delay = 0 }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute ${className ?? ''}`}>
      <img src={src} alt="" className={`block size-full max-w-none ${slow ? 'animate-float-slow' : 'animate-float'}`} style={{ animationDelay: `${delay}s` }} />
    </div>
  )
}
