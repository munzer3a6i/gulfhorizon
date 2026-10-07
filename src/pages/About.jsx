import about from '../content/about.js'
import { useContent } from '../i18n.jsx'
import CtaSection from '../components/CtaSection.jsx'
import AboutHero from '../components/about/AboutHero.jsx'
import MissionVision from '../components/about/MissionVision.jsx'
import Team from '../components/about/Team.jsx'
import Principles from '../components/about/Principles.jsx'
import Process from '../components/about/Process.jsx'
import Footprint from '../components/about/Footprint.jsx'
import Clients from '../components/about/Clients.jsx'

/** Soft radial glows from the design (Figma "Glow" ellipses 133:721–723), drifting slowly. */
function Glows() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
      <div className="absolute -top-[524px] start-[44%] size-[1100px] animate-float-slow rounded-full bg-[radial-gradient(closest-side,rgba(3,199,252,0.18),rgba(3,199,252,0))]" />
      <div
        className="absolute top-[456px] -start-[300px] h-[600px] w-[900px] animate-float rounded-full bg-[radial-gradient(closest-side,rgba(231,171,54,0.12),rgba(231,171,54,0))]"
        style={{ animationDelay: '-4s' }}
      />
      <div
        className="absolute top-[2196px] start-[55%] size-[900px] animate-float-slow rounded-full bg-[radial-gradient(closest-side,rgba(3,199,252,0.1),rgba(3,199,252,0))]"
        style={{ animationDelay: '-7s' }}
      />
    </div>
  )
}

export default function About() {
  const t = useContent(about)
  return (
    <div className="relative">
      <Glows />
      <div className="relative z-[1]">
        <AboutHero t={t.hero} />
        <MissionVision items={t.missionVision} />
        <Team t={t.team} />
        <Principles t={t.principles} />
        <Process t={t.process} />
        <Footprint t={t.footprint} />
        <Clients t={t.clients} />
        <div className="pt-20 lg:pt-[120px]">
          <CtaSection heading={t.cta.heading} subtext={t.cta.subtext} primary={t.cta.primary} secondary={t.cta.secondary} />
        </div>
      </div>
    </div>
  )
}
