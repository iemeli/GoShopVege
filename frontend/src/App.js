import React from 'react'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import Menu from './Menu/presentational/Menu'
import Routes from './Menu/presentational/Routes'

const App = () => {
  return (
    <Router>
      <div className="container">
        <Menu />
        <Routes />
      </div>
    </Router>
  )
}

export default App
