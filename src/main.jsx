/**
 * CONTEXTO: Entrada de React/Vite: carga el CSS global y monta App en #root.
 * StrictMode ayuda a detectar problemas durante desarrollo; puede repetir efectos en ese entorno.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
