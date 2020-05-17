import React from 'react'
import { Link } from 'react-router-dom'
import '../../css/SideDrawer.css'

const SideDrawer = ({ show }) => {
  let drawerClasses = 'side_drawer'
  if (show) {
    drawerClasses = 'side_drawer open'
  }
  return (
    <nav className={drawerClasses}>
      <ul>
        <ul>
          <li>
            <Link to="/ruokapaketit">Ruokapaketit</Link>
          </li>
          <li>
            <Link to="/ruoat">Ruoat</Link>
          </li>
          <li>
            <Link to="/ainesosat">Ainesosat</Link>
          </li>
        </ul>
      </ul>
    </nav>
  )
}

export default SideDrawer
