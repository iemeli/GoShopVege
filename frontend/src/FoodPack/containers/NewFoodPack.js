import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_FOODPACK } from '../queries'
import FoodPackFormContainer from './FoodPackFormContainer'
import { Redirect } from 'react-router-dom'

const NewFoodPack = () => {
  const [alreadyAdded, setAlreadyAdded] = useState(false)
  const [launchAddFoodPack] = useMutation(ADD_FOODPACK)
  const [foodPackName, setFoodPackName] = useState('')

  if (alreadyAdded) {
    return <Redirect to={`/ruokapaketit/${foodPackName}`} />
  }

  const addFoodPack = async (foodPackToAdd) => {
    try {
      await launchAddFoodPack({
        variables: {
          name: foodPackToAdd.name,
          foods: foodPackToAdd.foods
        }
      })
      setAlreadyAdded(true)
      setFoodPackName(foodPackToAdd.name)
    } catch (e) {
      console.log('Error adding foodpack in NewFoodPack.js: ', e.message)
    }
  }
  
  return (
    <div>
      <FoodPackFormContainer addFoodPack={addFoodPack} />
    </div>
  )
}

export default NewFoodPack