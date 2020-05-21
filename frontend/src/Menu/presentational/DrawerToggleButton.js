import React from 'react'
import PropTypes from 'prop-types'
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

DrawerToggleButton.propTypes = {
  drawerClickHandler: PropTypes.func.isRequired,
}

export default DrawerToggleButton
