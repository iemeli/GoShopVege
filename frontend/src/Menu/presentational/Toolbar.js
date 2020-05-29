import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import '../../css/toolbar.css'
import DrawerToggleButton from './DrawerToggleButton'
import list from '../../resources/list.svg'
// import logo from '../../resources/GoShopVege_logo.png'

const Toolbar = ({ drawerClickHandler }) => {
  const history = useHistory()
  return (
    <header className="toolbar">
      <nav className="toolbar_navigation">
        {/* <div
          className="toolbar_logo"
          onClick={() => history.push('/')}
          onKeyPress={() => history.push('/')}
          role="button"
          tabIndex="0"
        >
          <img src={logo} alt="GoShopVege logo" width="100rem" />
        </div> */}
        <div className="toolbar_toggle_button">
          <DrawerToggleButton drawerClickHandler={drawerClickHandler} />
        </div>
        <div className="toolbar_brand">
          <Link to="/">GoShopVege</Link>
        </div>
        <div className="spacer" />
        <div className="toolbar_navigation_items">
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
        </div>
        <div
          onClick={() => history.push('/ostoslista')}
          onKeyPress={() => history.push('/ostoslista')}
          role="button"
          tabIndex="0"
          className="list_icon"
        >
          <img src={list} alt="list icon" width="40rem" />
        </div>
      </nav>
    </header>
  )
}

export default Toolbar
