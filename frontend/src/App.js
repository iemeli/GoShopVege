import React from 'react'
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import Menu from './Menu/presentational/Menu'


const App = () => {
  

  return (
    <Router>
      <div>
        <Menu />
      </div>
    </Router>
  )
}

export default App
