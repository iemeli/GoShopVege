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
    if (props.mode !== 'EMPTY') {
      return shopListAction(props.id)
    }
    return shopListAction()
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
    case 'EMPTY':
      variant = 'danger'
      header = 'success'
      body = 'Ostoslista tyhjätty'
      text = 'Tyhjennä ostoslista'
      shopListAction = props.emptyShopList
      break
    default:
      break
  }

  return (
    <div>
      <Button variant={variant} onClick={handleClick}>
        {text}
      </Button>
    </div>
  )
}

ShopListButton.propTypes = {
  mode: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  id: PropTypes.string,
}

export default connect(null, {
  setAlert,
  addItem,
  removeItem,
  emptyShopList,
})(ShopListButton)
