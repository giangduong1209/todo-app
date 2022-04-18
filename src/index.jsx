import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App/App'
import './styles/index.scss'
import '../src/services/i18next'
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
