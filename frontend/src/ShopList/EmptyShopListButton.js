import React, { useState, useRef } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Overlay from 'react-bootstrap/Overlay'
import Tooltip from 'react-bootstrap/Tooltip'
import Cookie from 'js-cookie'
import useUpdateStore from '../hooks/useUpdateStore'

const ClearShopListButton = () => {
  const [showModal, setShowModal] = useState(false)
  const [showOverLay, setShowOverlay] = useState(false)
  const emptyStore = useUpdateStore('EMPTY')
  const target = useRef(null)

  const handleButtonClick = () => {
    if (Cookie.get('currentShopList')) {
      setShowOverlay(true)
      setTimeout(() => {
        setShowOverlay(false)
      }, 3000)
    } else {
      setShowModal(true)
    }
    return
  }

  const handleModalClick = () => {
    setShowModal(false)
    emptyStore()
  }

  return (
    <div style={{ display: 'inline-block', paddingLeft: '3vw' }}>
      <Button variant="danger" ref={target} onClick={handleButtonClick}>
        Tyhjää ostoslista
      </Button>
      <Overlay target={target.current} show={showOverLay} placement="right">
        <Tooltip>Ostoslista on jo tyhjä!</Tooltip>
      </Overlay>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <strong>HUOM!</strong>
        </Modal.Header>
        <Modal.Body>
          Tätä toimintoa ei voi peruttaa. Katkera setti jos menee hyvä
          ostoslista hukkaan.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Peruuta
          </Button>
          <Button variant="danger" onClick={handleModalClick}>
            Tyhjää silti
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ClearShopListButton
