import React, { useState } from 'react'
import { useMutation, useSubscription, useApolloClient } from '@apollo/client'
import { Redirect } from 'react-router-dom'
import { ADD_FOOD, FOOD_ADDED, ALL_FOODS } from '../queries'
import FoodFormContainer from './FoodFormContainer'

const NewFood = () => {
  const [alreadyAdded, setAlreadyAdded] = useState(false)
  const [foodName, setFoodName] = useState('')
  const client = useApolloClient()

  const updateCacheWith = (addedFood) => {
    const includedIn = (set, object) => set.map((f) => f.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_FOODS })
    if (!includedIn(dataInStore.allFoods, addedFood)) {
      client.writeQuery({
        query: ALL_FOODS,
        data: {
          allFoods: dataInStore.allFoods.concat(addedFood),
        },
      })
    }
  }

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

  const addFood = async (foodToAdd) => {
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
