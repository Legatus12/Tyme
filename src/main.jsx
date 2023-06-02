import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthProvider } from './AuthProvider'
import './styles.css'

import './i18n'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
)
