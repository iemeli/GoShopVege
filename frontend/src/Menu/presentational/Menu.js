import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
  return (
    <div>
      <div>
        <Link style={{ padding: 5 }} to="/">
          Etusivu
        </Link>
        <Link style={{ padding: 5 }} to="/ruokapaketit">
          Ruokapaketit
        </Link>
        <Link style={{ padding: 5 }} to="/ruoat">
          Ruoat
        </Link>
        <Link style={{ padding: 5 }} to="/ainesosat">
          Ainesosat
        </Link>
      </div>
    </div>
  )
}

export default Menu
