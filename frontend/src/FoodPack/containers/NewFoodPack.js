import React from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import isEqual from 'lodash.isequal'
import { setAlert } from '../../redux/alertReducer'
import { ADD_FOODPACK, ALL_FOODPACKS } from '../queries'
import FoodPackFormContainer from './FoodPackFormContainer'
import useUpdateCache from '../../general/useUpdateCache'

// eslint-disable-next-line no-shadow
const NewFoodPack = ({ setAlert }) => {
  const history = useHistory()
  const updateCacheWith = useUpdateCache('allFoodPacks', ALL_FOODPACKS, 'ADD')
  const { loading, data } = useQuery(ALL_FOODPACKS)
  const [launchAddFoodPack] = useMutation(ADD_FOODPACK, {
    update: (store, response) => {
      const addedFoodPack = response.data.addFoodPack
      updateCacheWith(addedFoodPack)
      history.push(`/ruokapaketit/${addedFoodPack.name}`)
    },
  })

  if (loading) {
    return <div>...loading</div>
  }
  const foodPacks = data.allFoodPacks
  const foodPackNames = foodPacks.map(fp => fp.name)

  const addFoodPack = async foodPackToAdd => {
    if (foodPackNames.includes(foodPackToAdd.name)) {
      setAlert(
        'danger',
        `Ruokapaketti "${foodPackToAdd.name}" löytyy jo, valitse toinen nimi`
      )
      return
    }
    if (foodPackToAdd.foods.length === 0) {
      setAlert(
        'danger',
        'Ruokapaketissa täytyy olla ruokia. Eihän siinä muuten olisi mitään järkeä.'
      )
      return
    }
    let sameFoods = false
    for (let i = 0; i < foodPacks.length; i++) {
      const foods = foodPacks[i].foods.map(f => f.id)
      if (isEqual(foods, foodPackToAdd.foods)) {
        setAlert(
          'danger',
          `Ruokapaketissa "${foodPacks[i].name}" on jo tismalleen samat ruoat`
        )
        sameFoods = true
      }
    }
    if (sameFoods) {
      return
    }
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
