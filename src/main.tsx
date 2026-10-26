import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LanguageProvider } from './i18n'
import { initializeAnalytics } from './lib/analytics'

initializeAnalytics()

const root = document.getElementById('root')!
// Mientras carga el chunk de la página, se conserva el HTML estático (shell) en vez de una pantalla en blanco/negra.
const shellHtml = root.innerHTML

createRoot(root).render(
  <StrictMode>
    <LanguageProvider>
      <Suspense fallback={shellHtml ? <div dangerouslySetInnerHTML={{ __html: shellHtml }} /> : null}>
        <App />
      </Suspense>
    </LanguageProvider>
  </StrictMode>,
)
