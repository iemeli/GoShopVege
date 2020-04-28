import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { useRouteMatch, Redirect } from 'react-router-dom'
import { ALL_FOODS, UPDATE_FOOD } from '../queries'
import FoodFormContainer from './FoodFormContainer'
import useUpdateCache from '../../general/useUpdateCache'

const UpdateFood = ({ setAlert }) => {
  const [alreadyUpdated, setAlreadyUpdated] = useState(false)
  const [oldIngredients, setOldIngredients] = useState([])
  const foodName = useRouteMatch('/ruoat/paivita/:name').params.name
  const updateCacheWith = useUpdateCache('allFoods', ALL_FOODS, 'UPDATE')
  const [launchUpdateFood] = useMutation(UPDATE_FOOD, {
    update: (store, response) => {
      updateCacheWith(response.data.updateFood, oldIngredients)
    },
  })

  const foodsResult = useQuery(ALL_FOODS)

  useEffect(() => {
    if (!foodsResult.loading) {
      const food = foodsResult.data.allFoods.find(f => f.name === foodName)
      setOldIngredients(food.ingredients.map(i => i.item.id))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foodsResult.loading])

  if (foodsResult.loading) {
    return <div>...loading</div>
  }

  const food = foodsResult.data.allFoods.find(f => f.name === foodName)

  if (alreadyUpdated) {
    return <Redirect to={`/ruoat/${food.name}`} />
  }

  const updateFood = async foodToUpdate => {
    try {
      setAlreadyUpdated(true)
      await launchUpdateFood({
        variables: {
          id: food.id,
          name: foodToUpdate.name,
          ingredients: foodToUpdate.ingredients,
          recipe: foodToUpdate.recipe,
        },
      })
    } catch (e) {
      console.log('Error updating food in UpdateFood.js', e.message)
    }
    setAlert('success', `Ruoka ${foodName} päivitetty`)
  }

  return (
    <div>
      <FoodFormContainer
        food={food}
        updateFood={updateFood}
        setAlert={setAlert}
      />
    </div>
  )
}

export default UpdateFood
