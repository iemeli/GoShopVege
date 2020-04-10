import React, { useState } from 'react'
import useField from '../../hooks/useField'
import { useQuery } from '@apollo/client'
import { Alert } from 'react-bootstrap'
import { ALL_FOODS } from '../../Food/queries'
import FoodPackForm from '../presentational/FoodPackForm'

const FoodPackFormContainer = ({
  foodPack, addFoodPack, updateFoodPack 
}) => {
  const [name] = useField('text',
    foodPack ? foodPack.name : null
  )
  const [foods, setFoods] = useState(foodPack ? foodPack.foods : [])
  const [price, setPrice] = useState(foodPack ? foodPack.price : 0)
  const [kcal, setKcal] = useState(foodPack ? foodPack.kcal : 0)
  const [alert, setAlert] = useState(null)

  const foodsResult = useQuery(ALL_FOODS)


  if (foodsResult.loading) {
    return <div>...loading</div>
  }

  const foodsForDropdown = foodsResult.data.allFoods
    .filter(ffd =>
      !foods
        .map(f => f.id)
        .includes(ffd.id)
    )

  const handleSelect = (foodId) => {
    const food = foodsForDropdown.find(f => f.id === foodId)

    setFoods(foods.concat(food))

    setPrice(price + food.price)
    setKcal(kcal + food.kcal)
  }

  const submit = async (e) => {
    e.preventDefault()

    if (name.value.length < 4) {
      setAlert('Nimen pituuden täytyy olla vähintään 4 !')
      setTimeout(() => {
        setAlert(null)
      }, 5000)
      return
    }

    const foodPackForParent = {
      name: name.value,
      foods: foods.map(f => f.id)
    }

    if (foodPack) {
      updateFoodPack(foodPackForParent)
    } else {
      addFoodPack(foodPackForParent)
    }
  }

  const removeFood = (event) => {
    const food = foods.find(f => f.id === event.target.id)
    setFoods(foods.filter(f => f.id !== event.target.id))

    setPrice(price - food.price)
    setKcal(kcal - food.kcal)
  }

  return (
    <div>
      <h2>
        {foodPack ? `Päivitä ${foodPack.name}` : 'Luo uusi ruokapaketti'}
      </h2>
      <strong><p>Yhteishinta: {price.toFixed(2)} €</p></strong>
      <strong><p>Yhteensä kcal: {kcal}</p></strong>
      {alert &&
        <Alert variant='danger'>{alert}</Alert>
      }
      <FoodPackForm
        submit={submit}
        name={name}
        foodsForDropdown={foodsForDropdown}
        foods={foods}
        handleSelect={handleSelect}
        removeFood={removeFood}
        foodPack={foodPack}
      />
    </div>
  )
}

export default FoodPackFormContainer