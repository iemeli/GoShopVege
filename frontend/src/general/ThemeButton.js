import React from 'react'
import PropTypes from 'prop-types'
import '../App.css'

const ThemeButton = ({ onClick, text, mode }) => {
  return (
    <div
      className={mode === 'main' ? 'main_button' : 'accent_button'}
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex="0"
    >
      <div className="button_flex">{text}</div>
    </div>
  )
}

ThemeButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
}

export default ThemeButton
