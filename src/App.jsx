import { Navigate, Route, Routes } from 'react-router-dom'
import { LangProvider } from './i18n.jsx'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Deployments from './pages/Deployments.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import License from './pages/License.jsx'
import Privacy from './pages/Privacy.jsx'
import Terms from './pages/Terms.jsx'

const PAGES = [
  ['', Home],
  ['deployments', Deployments],
  ['about', About],
  ['contact', Contact],
  ['dmw-license', License],
  ['privacy', Privacy],
  ['terms', Terms],
]

export default function App() {
  return (
    <LangProvider>
      <Layout>
        <Routes>
          {['', '/ar'].map((prefix) =>
            PAGES.map(([path, Page]) => <Route key={`${prefix}/${path}`} path={`${prefix}/${path}`} element={<Page />} />),
          )}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </LangProvider>
  )
}
