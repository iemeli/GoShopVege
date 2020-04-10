import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_FOOD } from '../queries'
import FoodFormContainer from './FoodFormContainer'
import { Redirect } from 'react-router-dom'

const NewFood = () => {
  const [alreadyAdded, setAlreadyAdded] = useState(false)
  const [launchAddFood] = useMutation(ADD_FOOD)
  const [foodName, setFoodName] = useState('')

  if (alreadyAdded) {
    return <Redirect to={`/ruoat/${foodName}`} />
  }

  const addFood = async (foodToAdd) => {
    try {
      await launchAddFood({
        variables: {
          name: foodToAdd.name,
          ingredients: foodToAdd.ingredients,
          recipe: foodToAdd.recipe
        }
      })
      setAlreadyAdded(true)
      setFoodName(foodToAdd.name)
    } catch (e) {
      console.log('Error adding food in NewFood.js: ', e.message)
    }
  }

  return (
    <div>
      <FoodFormContainer addFood={addFood} />
    </div>
  )
}

export default NewFood