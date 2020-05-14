import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { useRouteMatch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAlert } from '../../redux/alertReducer'
import { ALL_FOODPACKS, UPDATE_FOODPACK } from '../queries'
import FoodPackFormContainer from './FoodPackFormContainer'
import useUpdateCache from '../../hooks/useUpdateCache'

// eslint-disable-next-line no-shadow
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

  const foodPacksResult = useQuery(ALL_FOODPACKS)

  useEffect(() => {
    const foodPack = foodPacksResult.data.allFoodPacks.find(
      fp => fp.name === foodPackName
    )
    if (!foodPacksResult.loading) {
      setOldFoods(foodPack.foods.map(f => f.id))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foodPacksResult.loading])

  if (foodPacksResult.loading) {
    return <div>...loading</div>
  }

  const foodPack = foodPacksResult.data.allFoodPacks.find(
    fp => fp.name === foodPackName
  )

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
      setAlert('danger', 'Jotain meni vikaan. Yritä uudelleen!')
    }
    setAlert('success', `Ruokapaketti ${foodPack.name} päivitetty!`)
  }

  return (
    <div>
      <FoodPackFormContainer
        foodPack={foodPack}
        updateFoodPack={updateFoodPack}
      />
    </div>
  )
}

export default connect(null, { setAlert })(UpdateFoodPack)
