import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_FOODS, UPDATE_FOOD } from '../queries'
import { useRouteMatch, Redirect } from 'react-router-dom'
import FoodFormContainer from './FoodFormContainer'
import { useMutation } from '@apollo/client'

const UpdateFood = () => {
  const [alreadyUpdated, setAlreadyUpdated] = useState(false)
  const foodName = useRouteMatch('/ruoat/paivita/:name').params.name
  const [launchUpdateFood] = useMutation(UPDATE_FOOD)

  const foodsResult = useQuery(ALL_FOODS, {
    variables: { name: foodName }
  })

  if (foodsResult.loading) {
    return <div>...loading</div>
  }

  const food = foodsResult.data.allFoods[0]

  if (alreadyUpdated) {
    return <Redirect to={`/ruoat/${food.name}`} />
  }

  const updateFood = async (foodToUpdate) => {
    try {
      await launchUpdateFood({
        variables: {
          id: food.id,
          name: foodToUpdate.name,
          ingredients: foodToUpdate.ingredients,
          recipe: foodToUpdate.recipe
        }
      })
    } catch (e) {
      console.log('Error updating food in UpdateFood.js', e.message)
    }
    setAlreadyUpdated(true)
  }

  return (
    <div>
      <FoodFormContainer food={food} updateFood={updateFood} />
    </div>
  )
}

export default UpdateFood