import content from '../content/home.js'
import { useContent } from '../i18n.jsx'
import CtaSection from '../components/CtaSection.jsx'
import Hero from '../components/home/Hero.jsx'
import Stats from '../components/home/Stats.jsx'
import Values from '../components/home/Values.jsx'
import Categories from '../components/home/Categories.jsx'
import Process from '../components/home/Process.jsx'
import Clients from '../components/home/Clients.jsx'
import VisitUs from '../components/home/VisitUs.jsx'

export default function Home() {
  const t = useContent(content)
  return (
    <>
      <Hero t={t.hero} />
      <Stats stats={t.stats} label={t.statsLabel} />
      <Values t={t.values} />
      <Categories t={t.categories} />
      <Process t={t.process} />
      <Clients t={t.clients} />
      <VisitUs t={t.visit} />
      <CtaSection />
    </>
  )
}
