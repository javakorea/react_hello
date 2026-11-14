import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './example/BoardSearch.jsx'   // 원래: './App.jsx'  (12강: './lesson12/Lesson12Hooks.jsx')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
