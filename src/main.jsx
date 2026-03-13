import React from 'react'
import ReactDOM from 'react-dom/client'
import PaletteBuilder from './PaletteBuilder'
import './index.css'  // your Tailwind imports

ReactDOM.createRoot(document.getElementById('color-palette-builder')).render(
  <React.StrictMode>
    <PaletteBuilder />
  </React.StrictMode>
)

if (import.meta.env.DEV) {
  const style = document.createElement('style')
  style.textContent = `
    html {
      background: #EFF8FF;
    }
    body {
      max-width: 900px;
      margin: 0 auto;
      min-height: 100vh;
      padding: 20px;
    }
  `
  document.head.appendChild(style)
}