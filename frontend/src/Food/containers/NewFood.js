import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { Redirect } from 'react-router-dom'
import { ADD_FOOD, ALL_FOODS } from '../queries'
import FoodFormContainer from './FoodFormContainer'
import useUpdateCache from '../../general/useUpdateCache'

const NewFood = ({ setAlert }) => {
  const [alreadyAdded, setAlreadyAdded] = useState(false)
  const [foodName, setFoodName] = useState('')
  const updateCacheWith = useUpdateCache('allFoods', ALL_FOODS, 'ADD')

  const [launchAddFood] = useMutation(ADD_FOOD, {
    update: (store, response) => {
      updateCacheWith(response.data.addFood)
    },
  })

  if (alreadyAdded) {
    return <Redirect to={`/ruoat/${foodName}`} />
  }

  const addFood = async foodToAdd => {
    try {
      setAlreadyAdded(true)
      setFoodName(foodToAdd.name)
      await launchAddFood({
        variables: {
          name: foodToAdd.name,
          ingredients: foodToAdd.ingredients,
          recipe: foodToAdd.recipe,
        },
      })
    } catch (e) {
      console.log('Error adding food in NewFood.js: ', e.message)
    }
    setAlert('success', `Uusi ruoka ${foodToAdd.name} lisätty`)
  }

  return (
    <div>
      <FoodFormContainer addFood={addFood} setAlert={setAlert} />
    </div>
  )
}

export default NewFood
