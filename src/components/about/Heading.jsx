import { Eyebrow } from '../ui.jsx'
import { Reveal, SplitText } from '../../motion/index.jsx'

/** About-page section header: eyebrow + 44px title on the start side, optional description on the end side. */
export default function Heading({ eyebrow, title, description, light = false, className = '' }) {
  return (
    <div className={`flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between ${className}`}>
      <div className="flex max-w-[640px] flex-col gap-[14px]">
        <Eyebrow tone={light ? 'teal' : 'sky'}>{eyebrow}</Eyebrow>
        <SplitText
          text={title}
          className={`font-display text-[34px] font-medium leading-[1.12] tracking-[-0.44px] sm:text-[40px] lg:text-[44px] rtl:leading-[1.35] rtl:tracking-normal ${light ? 'text-navy' : 'text-white'}`}
        />
      </div>
      {description && (
        <Reveal delay={0.15} className={`max-w-[460px] font-body text-[17px] leading-[1.58] rtl:leading-[1.75] ${light ? 'text-body' : 'text-haze'}`}>
          <p>{description}</p>
        </Reveal>
      )}
    </div>
  )
}
