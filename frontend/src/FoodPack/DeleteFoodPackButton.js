import React from 'react'
import { Button } from 'react-bootstrap'
import { DELETE_FOODPACK } from './queries'
import { useMutation } from '@apollo/client'

const DeleteFoodPackButton = ({ foodPack }) => {
  const [deleteFoodPack] = useMutation(DELETE_FOODPACK)

  const handleClick = async (e) => {
    const result = window.confirm(`Poistetaanko ruokapaketti ${foodPack.name}`)
    if (result) {
      try {
        await deleteFoodPack({
          variables: {
            id: foodPack.id
          }
        })
      } catch (e) {
        console.log('Error deleting foodPack in DeleteFoodPackButton: ', e.message)
      }
    }
  }

  return (
    <div>
      <Button variant='outline-danger' onClick={handleClick}>
        poista ruokapaketti
      </Button>    
    </div>
  )
}

export default DeleteFoodPackButton