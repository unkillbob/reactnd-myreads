import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

const ghPagesPath = '/reactnd-myreads'
const basePath = window.location.pathname.indexOf(ghPagesPath) === 0 ? ghPagesPath : ''

ReactDOM.render(
  <BrowserRouter basename={basePath}><App /></BrowserRouter>,
  document.getElementById('root')
)
