import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/theme.css'
import './assets/font/fonts.css'
import App from './App.jsx'

// Performance monitoring avec Web Vitals (chargement différé)
async function initWebVitals() {
  try {
    const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals')
    
    // Fonction pour envoyer les métriques
    function sendToAnalytics(metric) {
      if (import.meta.env.DEV) {
        console.log(' Web Vitals:', metric)
      }
    }

    // Initialiser le monitoring des Web Vitals
    getCLS(sendToAnalytics)
    getFID(sendToAnalytics)
    getFCP(sendToAnalytics)
    getLCP(sendToAnalytics)
    getTTFB(sendToAnalytics)
  } catch (error) {
    console.warn('Web Vitals could not be loaded:', error)
  }
}

// Lancer le monitoring après le rendu initial
setTimeout(initWebVitals, 100)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
