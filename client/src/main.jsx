import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ScoreProvider } from "./context/ScoreContext.jsx"
import { GeneratePieceProvider } from './context/GeneratePieceContext.jsx'
import { ControlsProvider } from './context/ControlsContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GeneratePieceProvider>
      <ControlsProvider>
        <ScoreProvider>
          <App />
        </ScoreProvider>
      </ControlsProvider>
    </GeneratePieceProvider>
  </React.StrictMode>,
)
