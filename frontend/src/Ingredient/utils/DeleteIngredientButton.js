import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useMutation } from '@apollo/client'
import { connect } from 'react-redux'
import { setAlert } from '../../redux/alertReducer'
import DeleteModal from '../../general/DeleteModal'
import DeleteModalBody from './DeleteModalBody'
import { DELETE_INGREDIENT, ALL_INGREDIENTS } from '../queries'
import useUpdateCache from '../../hooks/useUpdateCache'

// eslint-disable-next-line no-shadow
const DeleteIngredientButton = ({ ingredient, setAlert }) => {
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
      setAlert('danger', 'Pieleen meni. Kokeile uudemman kerran.')
    }
    setAlert('success', `Ainesosa ${ingredient.name} poistettu`)
  }
  const fireModal = () => {
    setModalVisible(true)
  }

  return (
    <div style={{ display: 'inline-block' }}>
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
        Poista ainesosa
      </Button>
    </div>
  )
}

export default connect(null, { setAlert })(DeleteIngredientButton)
