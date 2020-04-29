import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useMutation } from '@apollo/client'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAlert } from '../../redux/alertReducer'
import { DELETE_FOOD, ALL_FOODS } from '../queries'
import DeleteModal from '../../general/DeleteModal'
import DeleteModalBody from './DeleteModalBody'
import useUpdateCache from '../../general/useUpdateCache'

// eslint-disable-next-line no-shadow
const DeleteFoodButton = ({ food, setAlert }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [alreadyDeleted, setAlreadyDeleted] = useState(false)
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
      setAlreadyDeleted(true)
      await deleteFood({
        variables: {
          id: food.id,
        },
      })
      setAlert('success', `Ruoka ${food.name} poistettu!`)
    } catch (e) {
      setAlert('danger', 'Jotain meni vikaan, kokeile uudestaan!')
      setAlreadyDeleted(false)
      console.log('Error deleting food in DeleteFoodButton: ', e.message)
    }
  }

  const fireModal = () => {
    setModalVisible(true)
  }

  if (alreadyDeleted) {
    return <Redirect to="/ruoat" />
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

export default connect(null, { setAlert })(DeleteFoodButton)
