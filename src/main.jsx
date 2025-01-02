import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import EndPage from './EndPage.jsx'
import "./i18n.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EndPage />
  </StrictMode>,
)
