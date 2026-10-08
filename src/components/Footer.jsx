import { Link } from 'react-router-dom'
import { Globe, Phone } from 'lucide-react'
import logoMark from '../assets/svg/logo-mark.svg'
import common, { FACEBOOK_URL, PHONE, PHONE_TEL, WEBSITE, whatsappLink } from '../content/common.js'
import { WhatsAppIcon } from './WhatsAppButton.jsx'
import { useContent, useLang } from '../i18n.jsx'
import { Reveal, Stagger, StaggerItem } from '../motion/index.jsx'
import { Container } from './ui.jsx'

function FacebookIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M13.5 21v-7.5h2.53l.38-2.94H13.5V8.69c0-.85.24-1.43 1.46-1.43h1.56V4.63a20.9 20.9 0 0 0-2.27-.12c-2.25 0-3.79 1.37-3.79 3.89v2.17H7.92v2.94h2.54V21h3.04Z" />
    </svg>
  )
}

function FooterLink({ to: path, children }) {
  const { to } = useLang()
  return (
    <Link to={to(path)} className="group relative inline-flex font-body text-[15px] text-haze transition-colors duration-300 hover:text-white">
      <span className="relative">
        {children}
        <span className="absolute -bottom-[3px] start-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100 rtl:origin-right" />
      </span>
    </Link>
  )
}

export default function Footer() {
  const { brand, footer } = useContent(common)
  const { lang, to } = useLang()
  const heading = 'font-body text-[13px] font-medium tracking-[1.82px] text-gold rtl:tracking-normal rtl:text-[15px]'

  return (
    <footer className="relative overflow-hidden border-t-2 border-gold/70 bg-ink-deep">
      <div aria-hidden className="pointer-events-none absolute -top-px inset-x-0 h-[2px] overflow-hidden">
        <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/80 to-transparent animate-shimmer" />
      </div>
      <Container className="pt-[72px]">
        <Stagger className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:flex lg:items-start lg:justify-between">
          <StaggerItem className="flex flex-col gap-[22px] sm:col-span-2 lg:col-auto">
            <Link to={to('/')} className="flex items-center gap-[12px]">
              <img src={logoMark} alt="" className="size-[48px]" />
              <span className="flex flex-col gap-px whitespace-nowrap">
                <span className="font-display text-[19px] font-semibold text-white">{brand.name}</span>
                <span className="font-body text-[13px] tracking-[0.26px] text-sky rtl:tracking-normal">{brand.tagline}</span>
                {lang === 'en' ? (
                  <span className="font-arabic text-[13px] font-semibold text-cloud" dir="rtl" lang="ar">
                    {brand.arabic}
                  </span>
                ) : (
                  <span className="font-[Roboto] text-[13px] text-cloud" dir="ltr" lang="en">
                    {brand.latin}
                  </span>
                )}
              </span>
            </Link>
            <p className="max-w-[320px] font-body text-[15px] leading-[1.65] text-slate">{footer.blurb}</p>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex w-fit items-center gap-[10px] rounded-[12px] border border-gold/45 bg-gold/[0.06] py-[10px] ps-[12px] pe-[16px] font-body text-[14px] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold/15"
            >
              <FacebookIcon className="size-[18px] text-gold transition-transform duration-300 group-hover:scale-110" />
              {footer.facebook}
            </a>
          </StaggerItem>

          <StaggerItem className="flex flex-col gap-[18px]">
            <p className={heading}>{footer.officesTitle}</p>
            {footer.offices.map((o) => (
              <div key={o.name} className="flex flex-col gap-[4px]">
                <p className="font-body text-[16px] font-medium text-white">{o.name}</p>
                <p className="max-w-[240px] font-body text-[15px] leading-[1.5] text-slate">{o.detail}</p>
              </div>
            ))}
          </StaggerItem>

          <StaggerItem className="flex flex-col gap-[14px] lg:w-[200px]">
            <p className={heading}>{footer.quickTitle}</p>
            {footer.quick.map((l) => (
              <FooterLink key={l.label} to={l.to}>
                {l.label}
              </FooterLink>
            ))}
          </StaggerItem>

          <StaggerItem className="flex flex-col gap-[14px] lg:w-[200px]">
            <p className={heading}>{footer.legalTitle}</p>
            {footer.legal.map((l) => (
              <FooterLink key={l.label} to={l.to}>
                {l.label}
              </FooterLink>
            ))}
          </StaggerItem>
        </Stagger>

        <Reveal className="mt-[56px] flex flex-col gap-4 border-t border-white/[0.08] pt-[26px] pb-[32px] md:flex-row md:items-center md:justify-between">
          <p className="font-body text-[14px] text-dusk">{footer.copyright}</p>
          <div className="flex flex-wrap gap-x-[28px] gap-y-2" dir="ltr">
            <a href={PHONE_TEL} className="flex items-center gap-[8px] font-body text-[14px] text-haze transition-colors hover:text-white">
              <Phone className="size-[16px] text-gold" strokeWidth={1.8} />
              {PHONE}
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-[8px] font-body text-[14px] text-haze transition-colors hover:text-white">
              <WhatsAppIcon className="size-[16px] text-[#25D366]" />
              WhatsApp
            </a>
            <a href={`https://${WEBSITE}`} className="flex items-center gap-[8px] font-body text-[14px] text-haze transition-colors hover:text-white">
              <Globe className="size-[16px] text-gold" strokeWidth={1.8} />
              {WEBSITE}
            </a>
          </div>
        </Reveal>
      </Container>
    </footer>
  )
}
