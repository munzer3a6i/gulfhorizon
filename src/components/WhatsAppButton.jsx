import { motion } from 'framer-motion'
import common, { whatsappLink } from '../content/common.js'
import { useContent } from '../i18n.jsx'
import { EASE } from '../motion/index.jsx'

export function WhatsAppIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
      <path d="M12.04 2C6.58 2 2.15 6.43 2.15 11.88c0 1.75.46 3.45 1.33 4.95L2.06 22l5.3-1.39a9.86 9.86 0 0 0 4.68 1.19h.01c5.45 0 9.89-4.43 9.89-9.88A9.83 9.83 0 0 0 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.14.82.84-3.06-.2-.31a8.2 8.2 0 0 1-1.26-4.37c0-4.53 3.7-8.22 8.25-8.22a8.22 8.22 0 0 1 8.24 8.23c0 4.54-3.7 8.24-8.24 8.24Z" />
    </svg>
  )
}

/** Floating WhatsApp chat button, bottom corner on every page (mirrors to the left in Arabic). */
export default function WhatsAppButton() {
  const { whatsapp } = useContent(common)
  return (
    <motion.a
      href={whatsappLink(whatsapp.message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={whatsapp.label}
      className="group fixed bottom-5 end-5 z-30 flex items-center gap-3 sm:bottom-7 sm:end-7"
      initial={{ opacity: 0, scale: 0.4, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.4, type: 'spring', stiffness: 260, damping: 18 }}
    >
      <span className="pointer-events-none hidden translate-x-2 rounded-full bg-white px-4 py-2 font-body text-[14px] font-medium whitespace-nowrap text-navy opacity-0 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 rtl:-translate-x-2 rtl:group-hover:translate-x-0 sm:block">
        {whatsapp.label}
      </span>
      <span className="relative flex size-[58px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_34px_-10px_rgba(37,211,102,0.75)] transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
        <span aria-hidden className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring" />
        <motion.span
          className="relative"
          animate={{ rotate: [0, -14, 12, -8, 0] }}
          transition={{ delay: 3, duration: 0.9, ease: EASE, repeat: Infinity, repeatDelay: 6 }}
        >
          <WhatsAppIcon className="size-[30px]" />
        </motion.span>
      </span>
    </motion.a>
  )
}
