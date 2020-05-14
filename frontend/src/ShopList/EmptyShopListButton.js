import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import useUpdateStore from '../hooks/useUpdateStore'

const ClearShopListButton = () => {
  const [show, setShow] = useState(false)
  const emptyStore = useUpdateStore('EMPTY')

  const handleClick = () => {
    setShow(false)
    emptyStore()
  }

  return (
    <div style={{ display: 'inline-block' }}>
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

export default ClearShopListButton
