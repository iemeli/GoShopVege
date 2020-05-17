import React from 'react'
import '../../css/DrawerToggleButton.css'

const DrawerToggleButton = ({ drawerClickHandler }) => {
  return (
    // eslint-disable-next-line react/button-has-type
    <button className="toggle_button" onClick={drawerClickHandler}>
      <div className="toggle_button_line" />
      <div className="toggle_button_line" />
      <div className="toggle_button_line" />
    </button>
  )
}

export default DrawerToggleButton
