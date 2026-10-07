import { useContent } from '../i18n.jsx'
import content from '../content/license.js'
import LegalPage from '../components/legal/LegalPage.jsx'
import LicenseCard from '../components/legal/LicenseCard.jsx'

export default function License() {
  const { card } = useContent(content)
  return <LegalPage content={content} lead={<LicenseCard card={card} />} />
}
