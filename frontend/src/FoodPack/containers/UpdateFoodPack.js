import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { useRouteMatch, Redirect } from 'react-router-dom'
import { ALL_FOODPACKS, UPDATE_FOODPACK } from '../queries'
import FoodPackFormContainer from './FoodPackFormContainer'
import useUpdateCache from '../../general/useUpdateCache'

const UpdateFoodPack = ({ setAlert }) => {
  const [alreadyUpdated, setAlreadyUpdated] = useState(false)
  const [oldFoods, setOldFoods] = useState([])
  const foodPackName = useRouteMatch('/ruokapaketit/paivita/:name').params.name
  const updateCacheWith = useUpdateCache(
    'allFoodPacks',
    ALL_FOODPACKS,
    'UPDATE'
  )
  const [launchUpdateFoodPack] = useMutation(UPDATE_FOODPACK, {
    update: (store, response) => {
      updateCacheWith(response.data.updateFoodPack, oldFoods)
    },
  })

  const foodPacksResult = useQuery(ALL_FOODPACKS, {
    variables: { name: foodPackName },
  })

  useEffect(() => {
    if (!foodPacksResult.loading) {
      setOldFoods(foodPacksResult.data.allFoodPacks[0].foods.map(f => f.id))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foodPacksResult.loading])

  if (foodPacksResult.loading) {
    return <div>...loading</div>
  }

  const foodPack = foodPacksResult.data.allFoodPacks[0]

  if (alreadyUpdated) {
    return <Redirect to={`/ruokapaketit/${foodPack.name}`} />
  }

  const updateFoodPack = async foodPackToUpdate => {
    try {
      setAlreadyUpdated(true)
      await launchUpdateFoodPack({
        variables: {
          id: foodPack.id,
          name: foodPackToUpdate.name,
          foods: foodPackToUpdate.foods,
        },
      })
    } catch (e) {
      setAlreadyUpdated(false)
      console.log('Error updating foodPack in UpdateFoodPack.js: ', e.message)
    }
    setAlert('success', `Ruokapaketti ${foodPack.name} päivitetty!`)
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
