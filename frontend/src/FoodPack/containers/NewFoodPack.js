import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { Redirect } from 'react-router-dom'
import { ADD_FOODPACK, ALL_FOODPACKS } from '../queries'
import FoodPackFormContainer from './FoodPackFormContainer'
import useUpdateCache from '../../general/useUpdateCache'

const NewFoodPack = ({ setAlert }) => {
  const [alreadyAdded, setAlreadyAdded] = useState(false)
  const [foodPackName, setFoodPackName] = useState('')
  const updateCacheWith = useUpdateCache('allFoodPacks', ALL_FOODPACKS, 'ADD')
  const [launchAddFoodPack] = useMutation(ADD_FOODPACK, {
    update: (store, response) => {
      updateCacheWith(response.data.addFoodPack)
    },
  })

  if (alreadyAdded) {
    return <Redirect to={`/ruokapaketit/${foodPackName}`} />
  }

  const addFoodPack = async foodPackToAdd => {
    try {
      setAlreadyAdded(true)
      setFoodPackName(foodPackToAdd.name)
      await launchAddFoodPack({
        variables: {
          name: foodPackToAdd.name,
          foods: foodPackToAdd.foods,
        },
      })
    } catch (e) {
      console.log('Error adding foodpack in NewFoodPack.js: ', e.message)
    }
    setAlert('success', `Ruokapaketti ${foodPackToAdd.name} lisätty!`)
  }

  return (
    <div>
      <FoodPackFormContainer addFoodPack={addFoodPack} setAlert={setAlert} />
    </div>
  )
}

export default NewFoodPack
