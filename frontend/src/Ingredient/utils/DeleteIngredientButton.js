import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useMutation } from '@apollo/client'
import DeleteModal from '../../general/DeleteModal'
import DeleteModalBody from './DeleteModalBody'
import { DELETE_INGREDIENT, ALL_INGREDIENTS } from '../queries'
import useUpdateCache from '../../general/useUpdateCache'

const DeleteIngredientButton = ({ ingredient }) => {
  const updateCacheWith = useUpdateCache(
    'allIngredients',
    ALL_INGREDIENTS,
    'DELETE'
  )
  const [deleteIngredient] = useMutation(DELETE_INGREDIENT, {
    update: (store, response) => {
      updateCacheWith(response.data.deleteIngredient)
    },
  })
  const [modalVisible, setModalVisible] = useState(false)

  const deleteIngrRef = React.createRef()

  const handleClick = async () => {
    deleteIngrRef.current.hideModal()
    try {
      await deleteIngredient({
        variables: {
          id: ingredient.id,
        },
      })
    } catch (e) {
      console.log(
        'Error deleting ingredient in DeleteIngredientButton: ',
        e.message
      )
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
          buttonLabel="poista ainesosa"
          handleClick={handleClick}
          ref={deleteIngrRef}
        >
          <DeleteModalBody ingredient={ingredient} />
        </DeleteModal>
      )}
      <Button variant="outline-danger" onClick={fireModal}>
        poista ainesosa
      </Button>
    </div>
  )
}

export default DeleteIngredientButton
