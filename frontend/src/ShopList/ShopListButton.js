import React from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button'
import PropTypes from 'prop-types'
import { setAlert } from '../redux/alertReducer'
import { addItem, removeItem, emptyShopList } from '../redux/shopListReducer'

const ShopListButton = props => {
  let variant
  let header
  let body
  let text
  let shopListAction

  const handleClick = () => {
    props.setAlert(header, body)
    return shopListAction(props.id)
  }

  switch (props.mode) {
    case 'ADD':
      variant = 'light'
      header = 'success'
      body = 'Lisätty ostoslistaan!'
      text = 'Lisää ostoslistaan'
      shopListAction = props.addItem
      break
    case 'REMOVE':
      variant = 'warning'
      header = 'success'
      body = 'Poistettu ostoslistasta'
      text = 'Poista ostoslistasta'
      shopListAction = props.removeItem
      break
    default:
      break
  }

  return (
    <Button variant={variant} onClick={handleClick}>
      {text}
    </Button>
  )
}

ShopListButton.propTypes = {
  mode: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}

export default connect(null, {
  setAlert,
  addItem,
  removeItem,
  emptyShopList,
})(ShopListButton)
