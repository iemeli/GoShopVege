import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAlert } from '../../redux/alertReducer'
import { ADD_FOODPACK, ALL_FOODPACKS } from '../queries'
import FoodPackFormContainer from './FoodPackFormContainer'
import useUpdateCache from '../../general/useUpdateCache'

// eslint-disable-next-line no-shadow
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
      setAlert('danger', 'Jotain meni vikaan. Yritä uudelleen!')
    }
    setAlert('success', `Ruokapaketti ${foodPackToAdd.name} lisätty!`)
  }

  return (
    <div>
      <FoodPackFormContainer addFoodPack={addFoodPack} />
    </div>
  )
}

export default connect(null, { setAlert })(NewFoodPack)
