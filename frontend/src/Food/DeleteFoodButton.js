import React from 'react'
import { Button } from 'react-bootstrap'
import { DELETE_FOOD } from './queries'
import { useMutation } from '@apollo/client'

const DeleteFoodButton = ({ food }) => {
  const [deleteFood] = useMutation(DELETE_FOOD)

  const handleClick = async (e) => {
    const result = window.confirm(`Poistetaanko ruoka ${food.name}?`)
    if (result) {
      try {
        await deleteFood({
          variables: {
            id: food.id
          }
        })
      } catch (e) {
        console.log('Error deleting food in DeleteFoodButton: ', e.message)
      }
    }
  }
  
  return (
    <div>
      <Button variant='outline-danger' onClick={handleClick}>
        poista ruoka
      </Button>
    </div>
  )
}

export default DeleteFoodButton