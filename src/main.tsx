import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { server } from './_lib/server/browser'

if (import.meta.env.VITE_MODE === 'dev') {
  server.start({ onUnhandledRequest: 'bypass' })
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
