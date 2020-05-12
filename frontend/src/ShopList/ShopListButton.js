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

  const objectForStore = { shopListIds: [] }
  objectForStore.objectId = props.object.id

  if (props.set === 'foodPacks') {
    props.object.foods.forEach(f => {
      f.ingredients.forEach(i => {
        objectForStore.shopListIds.push(i.item.id)
      })
    })
  } else if (props.set === 'foods') {
    props.object.ingredients.forEach(i => {
      objectForStore.shopListIds.push(i.item.id)
    })
  } else if (props.set === 'ingredients') {
    objectForStore.shopListIds.push(props.object.id)
  }

  const handleClick = () => {
    props.setAlert(header, body)
    return shopListAction(objectForStore, props.set)
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
  set: PropTypes.string.isRequired,
}

export default connect(null, {
  setAlert,
  addItem,
  removeItem,
  emptyShopList,
})(ShopListButton)
