import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './font.css'
import App from './Details.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
