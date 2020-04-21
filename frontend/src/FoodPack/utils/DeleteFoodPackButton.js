/* eslint-disable no-alert */
/* eslint-disable no-undef */
import React from 'react'
import { Button } from 'react-bootstrap'
import { useMutation } from '@apollo/client'
import { DELETE_FOODPACK, ALL_FOODPACKS } from '../queries'
import useUpdateCache from '../../general/useUpdateCache'

const DeleteFoodPackButton = ({ foodPack }) => {
  const updateCacheWith = useUpdateCache(
    'allFoodPacks',
    ALL_FOODPACKS,
    'DELETE'
  )
  const [deleteFoodPack] = useMutation(DELETE_FOODPACK, {
    update: (store, response) => {
      updateCacheWith(response.data.deleteFoodPack)
    },
  })

  const handleClick = async () => {
    const result = window.confirm(`Poistetaanko ruokapaketti ${foodPack.name}`)
    if (result) {
      try {
        await deleteFoodPack({
          variables: {
            id: foodPack.id,
          },
        })
      } catch (error) {
        console.log(
          'Error deleting foodPack in DeleteFoodPackButton: ',
          error.message
        )
      }
    }
  }

  return (
    <Button variant="outline-danger" onClick={handleClick}>
      poista ruokapaketti
    </Button>
  )
}

export default DeleteFoodPackButton
