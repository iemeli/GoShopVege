import React from 'react'
import { Button } from 'react-bootstrap'
import { DELETE_INGREDIENT } from './queries'
import { useMutation } from '@apollo/client'

const DeleteIngredientButton = ({ ingredient }) => {
  const [deleteIngredient] = useMutation(DELETE_INGREDIENT)

  const handleClick = async (e) => {
    const result = window.confirm(`Poistetaanko ainesosa ${ingredient.name}?`)
    if (result) {
      try {
        await deleteIngredient({
          variables: {
            id: ingredient.id
          }
        })
      } catch (e) {
        console.log('Error deleting ingredient in DeleteIngredientButton: ', e.message)
      }
    }
  }
  
  return (
    <div>
      <Button variant='outline-danger' onClick={handleClick}>
        poista ainesosa
      </Button>
    </div>
  )
}

export default DeleteIngredientButton