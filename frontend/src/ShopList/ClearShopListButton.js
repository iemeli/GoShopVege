import React, { useState } from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { emptyShopList } from '../redux/shopListReducer'
import { setAlert } from '../redux/alertReducer'

const ClearShopListButton = props => {
  const [show, setShow] = useState(false)

  const handleClick = () => {
    setShow(false)
    props.emptyShopList()
    props.setAlert('success', 'Ostoslista tyhjätty!')
  }

  return (
    <div>
      <Button variant="danger" onClick={() => setShow(true)}>
        Tyhjää ostoslista
      </Button>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <strong>HUOM!</strong>
        </Modal.Header>
        <Modal.Body>
          Tätä toimintoa ei voi peruttaa. Katkera setti jos menee hyvä
          ostoslista hukkaan.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShow(false)}>
            Peruuta
          </Button>
          <Button variant="danger" onClick={handleClick}>
            Tyhjää silti
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default connect(null, { emptyShopList, setAlert })(ClearShopListButton)
