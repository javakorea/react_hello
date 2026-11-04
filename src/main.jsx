import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './lesson9/Lesson9Fetch.jsx'   // 원래: './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
