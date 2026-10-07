import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LangProvider } from './i18n.jsx'
import Layout from './components/Layout.jsx'

// Each page is its own chunk; the page curtain in Layout covers the brief load.
const PAGES = [
  ['', lazy(() => import('./pages/Home.jsx'))],
  ['deployments', lazy(() => import('./pages/Deployments.jsx'))],
  ['about', lazy(() => import('./pages/About.jsx'))],
  ['contact', lazy(() => import('./pages/Contact.jsx'))],
  ['dmw-license', lazy(() => import('./pages/License.jsx'))],
  ['privacy', lazy(() => import('./pages/Privacy.jsx'))],
  ['terms', lazy(() => import('./pages/Terms.jsx'))],
]

export default function App() {
  return (
    <LangProvider>
      <Layout>
        <Suspense fallback={<div className="min-h-[70vh]" />}>
          <Routes>
            {['', '/ar'].map((prefix) =>
              PAGES.map(([path, Page]) => <Route key={`${prefix}/${path}`} path={`${prefix}/${path}`} element={<Page />} />),
            )}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Layout>
    </LangProvider>
  )
}
