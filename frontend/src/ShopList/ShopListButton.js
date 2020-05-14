import React, { useState } from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import PropTypes from 'prop-types'
import useUpdateStore from '../hooks/useUpdateStore'

const ShopListButton = props => {
  const [show, setShow] = useState(false)
  const updateStore = useUpdateStore(props.mode)

  const foundInShopList = props.storeSet.find(o => o.id === props.object.id)

  let setInFinnish
  if (props.set === 'foodPacks') {
    setInFinnish = 'ruokapaketti'
  } else if (props.set === 'foods') {
    setInFinnish = 'ruoka'
  } else if (props.set === 'ingredients') {
    setInFinnish = 'ainesosa'
  }

  const objectForStore = { shopListIds: [], set: props.set }
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
    updateStore(objectForStore)
  }

  const variant = props.mode === 'ADD' ? 'light' : 'warning'
  const text =
    props.mode === 'ADD' ? 'Lisää ostoslistaan' : 'Poista ostoslistasta'

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
            props.mode === 'ADD' &&
            `Tämä ${setInFinnish} on jo ostoslistassa. Lisätäänkö uudestaan?`}
          {!foundInShopList &&
            props.mode === 'ADD' &&
            'Lisätäänkö ostoslistaan?'}

          {props.mode === 'REMOVE' &&
            `Poistetaanko ${setInFinnish} ostoslistasta?`}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShow(false)}>
            Peruuta
          </Button>
          <Button variant={variant} onClick={handleClick}>
            {text}
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

export default connect(mapStateToProps)(ShopListButton)
