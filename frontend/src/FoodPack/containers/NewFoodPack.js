import React from 'react'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAlert } from '../../redux/alertReducer'
import { ADD_FOODPACK, ALL_FOODPACKS } from '../queries'
import FoodPackFormContainer from './FoodPackFormContainer'
import useUpdateCache from '../../general/useUpdateCache'

// eslint-disable-next-line no-shadow
const NewFoodPack = ({ setAlert }) => {
  const history = useHistory()
  const updateCacheWith = useUpdateCache('allFoodPacks', ALL_FOODPACKS, 'ADD')

  const [launchAddFoodPack] = useMutation(ADD_FOODPACK, {
    update: (store, response) => {
      const addedFoodPack = response.data.addFoodPack
      updateCacheWith(addedFoodPack)
      history.push(`/ruokapaketit/${addedFoodPack.name}`)
    },
  })

  const addFoodPack = async foodPackToAdd => {
    try {
      await launchAddFoodPack({
        variables: {
          name: foodPackToAdd.name,
          foods: foodPackToAdd.foods,
        },
      })

      setAlert('success', `Ruokapaketti ${foodPackToAdd.name} lisätty!`)
    } catch (e) {
      console.log('Error adding foodpack in NewFoodPack.js: ', e.message)
      setAlert('danger', 'Jotain meni vikaan. Yritä uudelleen!')
    }
  }

  return (
    <div>
      <FoodPackFormContainer addFoodPack={addFoodPack} />
    </div>
  )
}

export default connect(null, { setAlert })(NewFoodPack)
