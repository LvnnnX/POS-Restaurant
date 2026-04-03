import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

async function enableMocking() {
  // Use Vite's dev flag to enable MSW in development
  if (!import.meta.env.DEV) {
    return
  }
  const { worker } = await import('./mocks/server.ts')
  return worker.start()
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
