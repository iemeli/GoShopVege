import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { useRouteMatch, Redirect } from 'react-router-dom'
import { ALL_FOODPACKS, UPDATE_FOODPACK } from '../queries'
import FoodPackFormContainer from './FoodPackFormContainer'
import useUpdateCache from '../../general/useUpdateCache'

const UpdateFoodPack = ({ setAlert }) => {
  const [alreadyUpdated, setAlreadyUpdated] = useState(false)
  const foodPackName = useRouteMatch('/ruokapaketit/paivita/:name').params.name
  const updateCacheWith = useUpdateCache(
    'allFoodPacks',
    ALL_FOODPACKS,
    'UPDATE'
  )
  const [launchUpdateFoodPack] = useMutation(UPDATE_FOODPACK, {
    update: (store, response) => {
      updateCacheWith(response.data.updateFoodPack)
    },
  })

  const foodPacksResult = useQuery(ALL_FOODPACKS, {
    variables: { name: foodPackName },
  })

  if (foodPacksResult.loading) {
    return <div>...loading</div>
  }

  const foodPack = foodPacksResult.data.allFoodPacks[0]

  if (alreadyUpdated) {
    return <Redirect to={`/ruokapaketit/${foodPack.name}`} />
  }

  const updateFoodPack = async foodPackToUpdate => {
    try {
      await launchUpdateFoodPack({
        variables: {
          id: foodPack.id,
          name: foodPackToUpdate.name,
          foods: foodPackToUpdate.foods,
        },
      })
    } catch (e) {
      console.log('Error updating foodPack in UpdateFoodPack.js: ', e.message)
    }
    setAlreadyUpdated(true)
  }

  return (
    <div>
      <FoodPackFormContainer
        foodPack={foodPack}
        updateFoodPack={updateFoodPack}
        setAlert={setAlert}
      />
    </div>
  )
}

export default UpdateFoodPack
