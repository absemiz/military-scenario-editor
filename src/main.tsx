// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { MapElementsProvider } from './contexts/MapElementsContext.tsx'
import { ApplicationStateProvider } from './contexts/ApplicationStateContext.tsx'

createRoot(document.getElementById('root')!).render(
  //<StrictMode>
  <ApplicationStateProvider>
    <MapElementsProvider>
      <App />
    </MapElementsProvider>
  </ApplicationStateProvider>
  //</StrictMode>,
)
