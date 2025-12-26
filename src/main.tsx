import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx' // Ou { App } se você usou Named Export
import './index.css' // Se você tiver um CSS global
import 'bootstrap-icons/font/bootstrap-icons.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)