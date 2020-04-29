import React from 'react'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAlert } from '../../redux/alertReducer'
import { ADD_FOOD, ALL_FOODS } from '../queries'
import FoodFormContainer from './FoodFormContainer'
import useUpdateCache from '../../general/useUpdateCache'

// eslint-disable-next-line no-shadow
const NewFood = ({ setAlert }) => {
  const history = useHistory()
  const updateCacheWith = useUpdateCache('allFoods', ALL_FOODS, 'ADD')

  const [launchAddFood] = useMutation(ADD_FOOD, {
    update: (store, response) => {
      const addedFood = response.data.addFood
      updateCacheWith(addedFood)
      history.push(`/ruoat/${addedFood.name}`)
    },
  })

  const addFood = async foodToAdd => {
    try {
      await launchAddFood({
        variables: {
          name: foodToAdd.name,
          ingredients: foodToAdd.ingredients,
          recipe: foodToAdd.recipe,
        },
      })
      setAlert('success', `Uusi ruoka ${foodToAdd.name} lisätty`)
    } catch (e) {
      console.log('Error adding food in NewFood.js: ', e.message)
      setAlert('danger', 'Jotain meni mönkään. Kokeile uudemman kerran.')
    }
  }

  return (
    <div>
      <FoodFormContainer addFood={addFood} />
    </div>
  )
}

export default connect(null, { setAlert })(NewFood)
