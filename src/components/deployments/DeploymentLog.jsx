import { motion } from 'framer-motion'
import { Container, Eyebrow } from '../ui.jsx'
import { EASE, Reveal, SplitText } from '../../motion/index.jsx'

const VIEWPORT = { once: true, margin: '0px 0px -10% 0px' }

/**
 * "Who we recruit for" table. Rows reveal one by one; rows outside the active
 * sector filter (set by the chips above) fade back so the matches stand out.
 * Below `lg` each row collapses into a stacked card with inline labels.
 */
export default function DeploymentLog({ content, active }) {
  const { columns } = content
  const cell = 'max-lg:flex max-lg:flex-col max-lg:gap-1 max-lg:before:font-body max-lg:before:text-[11px] max-lg:before:font-medium max-lg:before:tracking-[0.96px] max-lg:before:text-haze max-lg:before:uppercase max-lg:before:content-[attr(data-label)] rtl:max-lg:before:tracking-normal'

  return (
    <Container as="section" className="flex flex-col gap-7 pb-[88px] lg:pb-[120px]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-[14px]">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <SplitText
            text={content.title}
            className="font-display text-[34px] font-medium leading-[1.12] tracking-[-0.44px] text-white sm:text-[40px] lg:text-[44px] rtl:leading-[1.35] rtl:tracking-normal"
          />
        </div>
        <Reveal from="end" delay={0.2}>
          <p className="font-body text-[15px] text-haze">{content.note}</p>
        </Reveal>
      </div>

      <Reveal from="scale" duration={0.9} className="overflow-hidden rounded-[24px] border border-white/[0.09] bg-white/[0.04]">
        <table className="w-full border-collapse text-start max-lg:block">
          <thead className="bg-white/[0.04] max-lg:hidden">
            <tr>
              {[
                [columns.employer, 'w-[362px] ps-[32px]'],
                [columns.sector, 'w-[200px]'],
                [columns.location, 'w-[170px]'],
                [columns.roles, 'pe-[32px]'],
              ].map(([label, w]) => (
                <th
                  key={label}
                  scope="col"
                  className={`py-[16px] text-start font-body text-[12px] font-medium tracking-[0.96px] text-haze uppercase rtl:tracking-normal ${w}`}
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <motion.tbody
            className="max-lg:block"
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } } }}
          >
            {content.rows.map((row) => {
              const dim = active !== 'all' && row.sector !== active
              return (
                <motion.tr
                  key={row.employer}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                  }}
                  className={`group relative border-t border-white/[0.06] transition-colors duration-300 hover:bg-white/[0.035] max-lg:grid max-lg:grid-cols-2 max-lg:gap-x-4 max-lg:gap-y-4 max-lg:px-5 max-lg:py-5 max-lg:first:border-t-0 ${
                    dim ? '[&>td]:opacity-35' : ''
                  } ${!dim && active !== 'all' ? 'bg-sky/[0.05]' : ''}`}
                >
                  <th
                    scope="row"
                    data-label={columns.employer}
                    className={`py-[20px] ps-[32px] text-start align-middle font-body text-[15px] font-medium text-white transition-opacity duration-500 max-lg:col-span-2 max-lg:p-0 ${dim ? 'opacity-35' : ''} ${cell}`}
                  >
                    <span className="relative inline-flex items-center gap-3">
                      <span
                        aria-hidden
                        className="absolute -start-[18px] top-1/2 h-[18px] w-[3px] -translate-y-1/2 scale-y-0 rounded-full bg-gold transition-transform duration-300 group-hover:scale-y-100 max-lg:hidden"
                      />
                      {row.employer}
                    </span>
                  </th>
                  <td data-label={columns.sector} className={`py-[20px] align-middle transition-opacity duration-500 max-lg:p-0 ${cell}`}>
                    <span className="inline-flex w-fit rounded-[99px] bg-sky/12 px-[12px] py-[5px] font-body text-[13px] font-medium tracking-[0.39px] text-sky rtl:tracking-normal">
                      {row.sectorLabel}
                    </span>
                  </td>
                  <td data-label={columns.location} className={`py-[20px] align-middle font-body text-[15px] text-cloud transition-opacity duration-500 max-lg:p-0 ${cell}`}>
                    {row.location}
                  </td>
                  <td
                    data-label={columns.roles}
                    className={`py-[20px] pe-[32px] align-middle font-body text-[15px] leading-[1.45] text-cloud transition-opacity duration-500 max-lg:col-span-2 max-lg:p-0 ${cell}`}
                  >
                    {row.roles}
                  </td>
                </motion.tr>
              )
            })}
          </motion.tbody>
        </table>
      </Reveal>
    </Container>
  )
}
