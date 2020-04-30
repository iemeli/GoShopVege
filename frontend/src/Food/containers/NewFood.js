import React from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import isEqual from 'lodash.isequal'
import { setAlert } from '../../redux/alertReducer'
import { ADD_FOOD, ALL_FOODS } from '../queries'
import FoodFormContainer from './FoodFormContainer'
import useUpdateCache from '../../general/useUpdateCache'

// eslint-disable-next-line no-shadow
const NewFood = ({ setAlert }) => {
  const history = useHistory()
  const updateCacheWith = useUpdateCache('allFoods', ALL_FOODS, 'ADD')
  const { loading, data } = useQuery(ALL_FOODS)
  const [launchAddFood] = useMutation(ADD_FOOD, {
    update: (store, response) => {
      const addedFood = response.data.addFood
      updateCacheWith(addedFood)
      history.push(`/ruoat/${addedFood.name}`)
    },
  })

  if (loading) {
    return <div>...loading</div>
  }
  const foods = data.allFoods
  const foodNames = foods.map(f => f.name)

  const addFood = async foodToAdd => {
    if (foodNames.includes(foodToAdd.name)) {
      setAlert(
        'danger',
        `Ruoka "${foodToAdd.name}" on jo olemassa, valitse toinen nimi`
      )
      return
    }
    if (foodToAdd.ingredients.length === 0) {
      setAlert(
        'danger',
        'Ruoassa täytyy olla ainesosia. Muuten tulee aika mitäänsanomaton safka.'
      )
      return
    }
    const newFoodsIngredients = foodToAdd.ingredients.map(i =>
      i.substring(0, i.length - 2)
    )
    for (let i = 0; i < foods.length; i++) {
      const existingFoodsIngredients = foods[i].ingredients.map(
        ingr => ingr.item.id
      )
      if (isEqual(existingFoodsIngredients, newFoodsIngredients)) {
        setAlert(
          'danger',
          `Ruoassa "${foods[i].name}" on jo täysin samat ainesosat.`
        )
        return
      }
    }
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
