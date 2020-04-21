import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useMutation } from '@apollo/client'
import { DELETE_FOOD, ALL_FOODS } from '../queries'
import DeleteModal from '../../general/DeleteModal'
import DeleteModalBody from './DeleteModalBody'
import useUpdateCache from '../../general/useUpdateCache'

const DeleteFoodButton = ({ food }) => {
  const [modalVisible, setModalVisible] = useState(false)

  const updateCacheWith = useUpdateCache('allFoods', ALL_FOODS, 'DELETE')

  const [deleteFood] = useMutation(DELETE_FOOD, {
    update: (store, response) => {
      updateCacheWith(response.data.deleteFood)
    },
  })

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
