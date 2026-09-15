import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LanguageProvider } from './i18n'
import { initializeAnalytics } from './lib/analytics'

initializeAnalytics()

// Dismiss the HTML splash screen with a smooth fade once React is ready
function dismissSplash() {
  const splash = document.getElementById('splash')
  if (!splash) return
  splash.classList.add('fade-out')
  // Remove from DOM after transition ends to free memory
  splash.addEventListener('transitionend', () => splash.remove(), { once: true })
}

const root = document.getElementById('root')!

createRoot(root).render(
  <StrictMode>
    <LanguageProvider>
      <App onReady={dismissSplash} />
    </LanguageProvider>
  </StrictMode>,
)
