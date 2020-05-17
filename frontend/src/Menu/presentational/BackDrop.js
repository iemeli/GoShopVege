import React from 'react'
import '../../css/BackDrop.css'

const BackDrop = ({ backDropClickHandler }) => (
  <div
    className="back_drop"
    onClick={backDropClickHandler}
    onKeyDown={backDropClickHandler}
    role="button"
    aria-label="Close side drawer"
    tabIndex="0"
  />
)

export default BackDrop
