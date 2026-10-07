import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown, CircleAlert, LoaderCircle, RotateCcw } from 'lucide-react'
import { FORMSUBMIT_EMAIL, FORMSUBMIT_ENDPOINT } from '../../config.js'
import { useLang } from '../../i18n.jsx'
import { EASE, SplitText } from '../../motion/index.jsx'
import { DirArrow } from '../ui.jsx'

const SUBJECT = 'New job order / enquiry — Gulf Horizon website'
const PHONE_PATTERN = '[\\+\\(\\)0-9\\s\\-]{7,20}'

/**
 * Field structure. `name` is the human-readable key used both by the no-JS POST fallback and the JSON
 * payload, so the inbox is identical whichever path delivers it. Copy lives in content/contact.js.
 */
const FIELDS = [
  { id: 'company', name: 'Company', kind: 'input', type: 'text', autoComplete: 'organization', required: true },
  { id: 'contact', name: 'Contact person', kind: 'input', type: 'text', autoComplete: 'name', required: true },
  { id: 'email', name: 'Email', kind: 'input', type: 'email', autoComplete: 'email', required: true, inputMode: 'email', ltr: true },
  { id: 'phone', name: 'Phone', kind: 'input', type: 'tel', autoComplete: 'tel', required: true, inputMode: 'tel', pattern: PHONE_PATTERN, ltr: true },
  { id: 'category', name: 'Job category', kind: 'select', options: 'categories', required: true },
  { id: 'workers', name: 'Number of workers', kind: 'select', options: 'workers', required: true },
  { id: 'details', name: 'Project details', kind: 'textarea', full: true },
]

const EMPTY = Object.fromEntries(FIELDS.map((f) => [f.id, '']))

function errorFor(el, copy) {
  if (!el || el.validity.valid) return ''
  if (el.validity.valueMissing) return copy.required
  return copy.invalid || copy.required
}

const fieldBase =
  'peer block w-full rounded-[12px] border bg-[#f5f8fb] font-body text-[15px] text-navy placeholder:text-[#8a99ab] outline-none transition-[border-color,box-shadow,background-color] duration-300 focus:bg-white'

function Field({ field, copy, options, value, error, onChange, onBlur, index }) {
  const reduce = useReducedMotion()
  const id = `jo-${field.id}`
  const errId = `${id}-error`
  const tone = error
    ? 'border-[#e5484d] shadow-[0_0_0_4px_rgba(229,72,77,0.12)]'
    : 'border-[#d5dee7] hover:border-[#b8c6d4] focus:border-sky focus:shadow-[0_0_0_4px_rgba(3,199,252,0.16)]'
  const common = {
    id,
    name: field.name,
    value,
    required: field.required,
    onChange: (e) => onChange(field.id, e.target.value),
    onBlur: () => onBlur(field.id),
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errId : undefined,
  }

  let control
  if (field.kind === 'select') {
    control = (
      <div className="relative">
        <select {...common} className={`${fieldBase} ${tone} h-[52px] cursor-pointer appearance-none ps-4 pe-11 ${value ? '' : 'text-[#8a99ab]'}`}>
          <option value="" disabled>
            {copy.placeholder}
          </option>
          {options.map((o) => (
            <option key={o.value} value={o.value} className="text-navy">
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute end-4 top-1/2 size-[18px] -translate-y-1/2 text-[#4a5568] transition-transform duration-300 peer-focus:rotate-180 peer-focus:text-teal"
          strokeWidth={2}
          aria-hidden
        />
        <FocusLine />
      </div>
    )
  } else if (field.kind === 'textarea') {
    control = (
      <div className="relative">
        <textarea {...common} placeholder={copy.placeholder} rows={5} className={`${fieldBase} ${tone} h-[140px] min-h-[120px] resize-y p-4 leading-[1.5]`} />
        <FocusLine />
      </div>
    )
  } else {
    control = (
      <div className="relative">
        <input
          {...common}
          type={field.type}
          autoComplete={field.autoComplete}
          inputMode={field.inputMode}
          pattern={field.pattern}
          placeholder={copy.placeholder}
          dir={field.ltr ? 'ltr' : undefined}
          className={`${fieldBase} ${tone} h-[52px] px-4 ${field.ltr ? 'rtl:text-right' : ''}`}
        />
        <FocusLine />
      </div>
    )
  }

  return (
    <motion.div
      className={`group/field flex flex-col gap-2 ${field.full ? 'sm:col-span-2' : ''}`}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.6, delay: 0.05 * index, ease: EASE }}
    >
      <label
        htmlFor={id}
        className="font-body text-[12px] font-medium leading-normal tracking-[0.96px] text-body transition-colors duration-300 rtl:tracking-normal group-focus-within/field:text-teal"
      >
        {copy.label}
        {field.required && (
          <span aria-hidden className="ms-1 text-gold">
            *
          </span>
        )}
      </label>
      {control}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            key="err"
            id={errId}
            role="alert"
            className="flex items-start gap-1.5 overflow-hidden font-body text-[13px] leading-[1.4] text-[#d43b40]"
            initial={{ opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -4 }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            <CircleAlert className="mt-px size-[14px] shrink-0" strokeWidth={2} aria-hidden />
            <span>{error}</span>
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/** Gradient underline that grows from the reading-start edge when the sibling control is focused. */
function FocusLine() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-x-3 -bottom-px h-[2px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-sky via-[#5fd9ff] to-gold opacity-0 transition-[transform,opacity] duration-500 ease-out peer-focus:scale-x-100 peer-focus:opacity-100 rtl:origin-right rtl:bg-gradient-to-l"
    />
  )
}

function SubmitButton({ sending, label, sendingLabel }) {
  return (
    <motion.button
      type="submit"
      disabled={sending}
      aria-busy={sending}
      whileHover={sending ? undefined : { y: -2 }}
      whileTap={sending ? undefined : { scale: 0.97 }}
      className="group relative inline-flex min-w-[201px] items-center justify-center gap-2 overflow-hidden rounded-full bg-gold px-8 py-4 font-body text-[17px] font-medium leading-none whitespace-nowrap text-navy shadow-[0_10px_30px_-12px_rgba(231,171,54,0.7)] transition-colors duration-300 hover:bg-[#f0bb4f] disabled:cursor-progress disabled:bg-[#efc067] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
    >
      {!sending && (
        <span aria-hidden className="pointer-events-none absolute inset-y-0 start-0 w-1/3 bg-gradient-to-r from-transparent via-white/45 to-transparent animate-shimmer" />
      )}
      {sending && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 start-0 w-full origin-left bg-white/25 rtl:origin-right"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 0.92 }}
          transition={{ duration: 6, ease: [0.1, 0.7, 0.3, 1] }}
        />
      )}
      <AnimatePresence mode="wait" initial={false}>
        {sending ? (
          <motion.span
            key="sending"
            className="relative inline-flex items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <LoaderCircle className="size-[18px] animate-spin" strokeWidth={2.2} aria-hidden />
            {sendingLabel}
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            className="relative inline-flex items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {label}
            <span className="inline-flex transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
              <DirArrow />
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

function SuccessPanel({ copy, onAgain }) {
  const reduce = useReducedMotion()
  const sparks = Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * Math.PI * 2
    return { x: Math.cos(a) * 74, y: Math.sin(a) * 74, c: i % 2 ? '#03c7fc' : '#e7ab36' }
  })
  return (
    <motion.div
      key="success"
      className="flex flex-col items-center px-2 py-10 text-center sm:py-16"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, ease: EASE }}
      role="status"
      aria-live="polite"
    >
      <div className="relative mb-8 flex size-[104px] items-center justify-center">
        {!reduce &&
          sparks.map((s, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="absolute size-[7px] rounded-full"
              style={{ background: s.c }}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
              animate={{ x: s.x, y: s.y, opacity: [0, 1, 0], scale: [0.4, 1, 0.6] }}
              transition={{ duration: 1.1, delay: 0.45, ease: 'easeOut' }}
            />
          ))}
        <span aria-hidden className="absolute inset-0 rounded-full bg-[#1fae6b]/20 animate-pulse-ring" />
        <motion.span
          aria-hidden
          className="relative flex size-[88px] items-center justify-center rounded-full bg-gradient-to-br from-[#2bc47c] to-[#0a6e8c] shadow-[0_20px_50px_-18px_rgba(10,110,140,0.8)]"
          initial={reduce ? false : { scale: 0, rotate: -40 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
        >
          <svg viewBox="0 0 52 52" className="size-[46px]" fill="none">
            <motion.path
              d="M14 27.5 22.5 36 39 18"
              stroke="#fff"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={reduce ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.55, delay: 0.4, ease: EASE }}
            />
          </svg>
        </motion.span>
      </div>
      <motion.h3
        className="font-display text-[28px] font-medium text-navy sm:text-[32px]"
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
      >
        {copy.title}
      </motion.h3>
      <motion.p
        className="mt-3 max-w-[460px] font-body text-[16px] leading-[1.55] text-body"
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.65, ease: EASE }}
      >
        {copy.body}
      </motion.p>
      <motion.button
        type="button"
        onClick={onAgain}
        className="group mt-8 inline-flex items-center gap-2 rounded-full border border-[#d5dee7] px-6 py-3 font-body text-[15px] font-medium text-navy transition-colors duration-300 hover:border-teal hover:text-teal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.75, ease: EASE }}
      >
        <RotateCcw className="size-4 transition-transform duration-500 group-hover:-rotate-180" strokeWidth={2} aria-hidden />
        {copy.again}
      </motion.button>
    </motion.div>
  )
}

/** "Send a job order" card. Submits to FormSubmit via fetch; plain POST to FormSubmit without JavaScript. */
export default function JobOrderForm({ copy }) {
  const { lang } = useLang()
  const formRef = useRef(null)
  const honeyRef = useRef(null)
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [enhanced, setEnhanced] = useState(false)
  const [attempted, setAttempted] = useState(false)

  // Card morph: animate the card height whenever its content (form / success / error) changes size.
  const innerRef = useRef(null)
  const [height, setHeight] = useState(null)
  useEffect(() => {
    const el = innerRef.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(([entry]) => setHeight(entry.target.offsetHeight))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Once hydrated, take over validation so messages appear inline in the page language.
  useEffect(() => setEnhanced(true), [])

  const validate = (id) => {
    const field = FIELDS.find((f) => f.id === id)
    const el = formRef.current?.elements.namedItem(field.name)
    return errorFor(el, copy.fields[id])
  }

  const onChange = (id, v) => {
    setValues((s) => ({ ...s, [id]: v }))
    if (status === 'error') setStatus('idle')
    if (touched[id] || attempted) {
      // validity reflects the new value after React commits
      requestAnimationFrame(() => setErrors((e) => ({ ...e, [id]: validate(id) })))
    }
  }

  const onBlur = (id) => {
    setTouched((t) => ({ ...t, [id]: true }))
    setErrors((e) => ({ ...e, [id]: validate(id) }))
  }

  const send = async () => {
    setStatus('sending')
    const fields = Object.fromEntries(FIELDS.map((f) => [f.name, values[f.id].trim()]))
    try {
      const res = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...fields,
          Language: lang === 'ar' ? 'Arabic' : 'English',
          _subject: SUBJECT,
          _template: 'table',
          _captcha: 'false',
          _honey: '',
          _language: lang,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && String(data.success) !== 'false') {
        setStatus('success')
        setValues(EMPTY)
        setErrors({})
        setTouched({})
        setAttempted(false)
        formRef.current?.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (status === 'sending') return
    // Bots fill every input; quietly pretend it worked.
    if (honeyRef.current?.value) {
      setStatus('success')
      return
    }
    setAttempted(true)
    const next = Object.fromEntries(FIELDS.map((f) => [f.id, validate(f.id)]))
    setErrors(next)
    const firstBad = FIELDS.find((f) => next[f.id])
    if (firstBad) {
      formRef.current.elements.namedItem(firstBad.name)?.focus()
      return
    }
    send()
  }

  const hasErrors = attempted && Object.values(errors).some(Boolean)

  return (
    <motion.div
      animate={{ height: height ?? 'auto' }}
      transition={{ duration: 0.6, ease: EASE }}
      className="relative overflow-hidden rounded-[24px] bg-white shadow-[0_40px_100px_-40px_rgba(0,0,0,0.6)]"
    >
      <div ref={innerRef} className="p-6 sm:p-10">
      {/* accent bar that sweeps in along the top edge */}
      <motion.span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px] origin-left bg-gradient-to-r from-sky via-teal to-gold rtl:origin-right rtl:bg-gradient-to-l"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
      />
      <AnimatePresence mode="wait" initial={false}>
        {status === 'success' ? (
          <SuccessPanel key="success" copy={copy.success} onAgain={() => setStatus('idle')} />
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            action={`https://formsubmit.co/${FORMSUBMIT_EMAIL}`}
            method="POST"
            noValidate={enhanced}
            onSubmit={onSubmit}
            className="flex flex-col gap-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            {/* No-JS fallback options for FormSubmit */}
            <input type="hidden" name="_subject" value={SUBJECT} />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="Language" value={lang === 'ar' ? 'Arabic' : 'English'} />
            <div aria-hidden className="absolute -start-[9999px] top-auto size-px overflow-hidden">
              <label htmlFor="jo-honey">{copy.honeypot}</label>
              <input ref={honeyRef} id="jo-honey" type="text" name="_honey" tabIndex={-1} autoComplete="off" defaultValue="" />
            </div>

            <div className="flex flex-col gap-6">
              <SplitText as="h2" text={copy.title} className="font-display text-[28px] font-medium leading-normal text-navy sm:text-[32px]" />
              <p className="font-body text-[16px] leading-[1.55] text-body">{copy.description}</p>
            </div>

            <div className="grid grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-2">
              {FIELDS.map((f, i) => (
                <Field
                  key={f.id}
                  index={i}
                  field={f}
                  copy={copy.fields[f.id]}
                  options={f.options ? copy[f.options] : null}
                  value={values[f.id]}
                  error={errors[f.id]}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              ))}
            </div>

            <AnimatePresence initial={false}>
              {status === 'error' && (
                <motion.div
                  key="error"
                  role="alert"
                  className="overflow-hidden"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto', x: [0, -8, 8, -5, 5, 0] }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <div className="flex flex-col gap-3 rounded-[14px] border border-[#f3c3c4] bg-[#fdf1f1] p-4 sm:flex-row sm:items-center">
                    <CircleAlert className="size-6 shrink-0 text-[#d43b40]" strokeWidth={2} aria-hidden />
                    <div className="flex-1">
                      <p className="font-display text-[16px] font-medium text-navy">{copy.error.title}</p>
                      <p className="mt-0.5 font-body text-[14px] leading-[1.5] text-body">{copy.error.body}</p>
                    </div>
                    <button
                      type="button"
                      onClick={send}
                      className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-navy px-4 py-2.5 font-body text-[14px] font-medium text-white transition-colors duration-300 hover:bg-teal sm:self-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                    >
                      <RotateCcw className="size-4 transition-transform duration-500 group-hover:-rotate-180" strokeWidth={2} aria-hidden />
                      {copy.error.retry}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col-reverse gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-1 sm:max-w-[380px]">
                <p className="font-body text-[13px] leading-[1.5] text-[#8a99ab]">{copy.consent}</p>
                <AnimatePresence initial={false}>
                  {hasErrors && (
                    <motion.p
                      key="fix"
                      className="font-body text-[13px] font-medium text-[#d43b40]"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                    >
                      {copy.fixErrors}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <SubmitButton sending={status === 'sending'} label={copy.submit} sendingLabel={copy.sending} />
            </div>
          </motion.form>
        )}
      </AnimatePresence>
      </div>
    </motion.div>
  )
}
