import React, { useState } from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import PropTypes from 'prop-types'
import { setAlert } from '../redux/alertReducer'
import { addItem, removeItem, emptyShopList } from '../redux/shopListReducer'

const ShopListButton = props => {
  const [show, setShow] = useState(false)

  const foundInShopList = props.storeSet.find(o => o.id === props.object.id)
  let setInFinnish
  if (props.set === 'foodPacks') {
    setInFinnish = 'ruokapaketti'
  } else if (props.set === 'foods') {
    setInFinnish = 'ruoka'
  } else if (props.set === 'ingredients') {
    setInFinnish = 'ainesosa'
  }

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
    setShow(false)
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
    <div style={{ display: 'inline-block' }}>
      <Button variant={variant} onClick={() => setShow(true)}>
        {text}
      </Button>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <strong>Lisätäänkö ostoslistaan?</strong>
        </Modal.Header>
        <Modal.Body>
          {foundInShopList &&
            `Tämä ${setInFinnish} on jo ostoslistassa. Lisätäänkö uudestaan?`}
          {!foundInShopList && 'Lisätäänkö ostoslistaan?'}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShow(false)}>
            Peruuta
          </Button>
          <Button variant="light" onClick={handleClick}>
            Lisää
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

ShopListButton.propTypes = {
  mode: PropTypes.string.isRequired,
  set: PropTypes.string.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {
    storeSet: state.shopList[ownProps.set],
  }
}

export default connect(mapStateToProps, {
  setAlert,
  addItem,
  removeItem,
  emptyShopList,
})(ShopListButton)
