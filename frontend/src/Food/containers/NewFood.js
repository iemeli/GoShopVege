import React, { useState } from 'react'
import { useMutation, useSubscription } from '@apollo/client'
import { Redirect } from 'react-router-dom'
import { ADD_FOOD, FOOD_ADDED, ALL_FOODS } from '../queries'
import FoodFormContainer from './FoodFormContainer'
import useUpdateCache from '../../general/useUpdateCache'

const NewFood = () => {
  const [alreadyAdded, setAlreadyAdded] = useState(false)
  const [foodName, setFoodName] = useState('')
  const updateCacheWith = useUpdateCache('allFoods', ALL_FOODS)

  const [launchAddFood] = useMutation(ADD_FOOD, {
    update: (store, response) => {
      updateCacheWith(response.data.addFood)
    },
  })

  useSubscription(FOOD_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedFood = subscriptionData.data.foodAdded
      window.alert(`Uusi ruoka lisätty: ${addedFood.name}`)
      updateCacheWith(addedFood)
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
  }

  return (
    <div>
      <FoodFormContainer addFood={addFood} />
    </div>
  )
}

export default NewFood
