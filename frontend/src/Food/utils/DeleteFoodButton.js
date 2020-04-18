import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useMutation } from '@apollo/client'
import { DELETE_FOOD } from '../queries'
import DeleteModal from '../../general/DeleteModal'
import DeleteModalBody from './DeleteModalBody'

const DeleteFoodButton = ({ food }) => {
  const [deleteFood] = useMutation(DELETE_FOOD)
  const [modalVisible, setModalVisible] = useState(false)

  const deleteFoodRef = React.createRef()

  const handleClick = async () => {
    deleteFoodRef.current.hideModal()
    try {
      await deleteFood({
        variables: {
          id: food.id,
        },
      })
    } catch (e) {
      console.log('Error deleting food in DeleteFoodButton: ', e.message)
    }
  }
  const fireModal = () => {
    setModalVisible(true)
  }

  return (
    <div>
      {modalVisible && (
        <DeleteModal
          setModalVisible={setModalVisible}
          buttonLabel="poista ruoka"
          handleClick={handleClick}
          ref={deleteFoodRef}
        >
          <DeleteModalBody food={food} />
        </DeleteModal>
      )}
      <Button variant="outline-danger" onClick={fireModal}>
        poista ruoka
      </Button>
    </div>
  )
}

export default DeleteFoodButton
