import React, { useState, useImperativeHandle } from 'react'
import { Modal, Button } from 'react-bootstrap'

const DeleteModal = React.forwardRef((props, ref) => {
  const [show, setShow] = useState(true)

  const hideModal = () => {
    setShow(false)
    props.setModalVisible(false)
  }

  useImperativeHandle(ref, () => {
    return {
      hideModal,
    }
  })

  return (
    <div>
      <Modal
        size="lg"
        centered
        show={show}
        animation={false}
        onHide={hideModal}
      >
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Ennen poistamista</Modal.Title>
          </Modal.Header>

          <Modal.Body>{props.children}</Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={props.handleClick}>
              {props.buttonLabel}
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </div>
  )
})

export default DeleteModal
