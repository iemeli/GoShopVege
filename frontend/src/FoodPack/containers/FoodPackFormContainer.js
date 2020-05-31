import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { connect } from 'react-redux'
import { setAlert } from '../../redux/alertReducer'
import useField from '../../hooks/useField'
import { ALL_FOODS } from '../../Food/queries'
import FoodPackForm from '../presentational/FoodPackForm'
import useMacros from '../../hooks/useMacros'

const unit = {
  PIECES: 'pieces',
  GRAMS: 'grams',
}

const FoodPackFormContainer = ({
  foodPack,
  addFoodPack,
  updateFoodPack,
  // eslint-disable-next-line no-shadow
  setAlert,
}) => {
  const [name] = useField('text', foodPack ? foodPack.name : null)
  const [foods, setFoods] = useState(foodPack ? foodPack.foods : [])
  const [priceRange, setPriceRange] = useState(
    foodPack ? foodPack.priceRange : { min: 0, max: 0 }
  )
  const foodsResult = useQuery(ALL_FOODS)
  //tsiigaa handleSelect ja removeFoodissa macroista lisäys tai vähennys
  const [macros] = useMacros(foodPack, 'foodPack')

  if (foodsResult.loading) {
    return <div>...loading</div>
  }

  const foodsForDropdown = foodsResult.data.allFoods.filter(
    ffd => !foods.map(f => f.id).includes(ffd.id)
  )

  const handleSelect = foodId => {
    const food = foodsForDropdown.find(f => f.id === foodId)

    setFoods(foods.concat(food))

    setPriceRange({
      min: priceRange.min + food.priceRange.min,
      max: priceRange.max + food.priceRange.max,
    })

    // food.ingredients.forEach(fi => {
    //   let amount
    //   let foodIngredientUnit
    //   if (fi.pieces) {
    //     amount = fi.pieces
    //     foodIngredientUnit = unit.PIECES
    //   } else {
    //     amount = fi.grams
    //     foodIngredientUnit = unit.GRAMS
    //   }
    //   macros.addAll(fi, amount, foodIngredientUnit)
    // })
  }

  const submit = async e => {
    e.preventDefault()

    if (name.value.length < 4) {
      setAlert('danger', 'Nimen pituuden täytyy olla vähintään 4 !')
      return
    }

    const foodPackForParent = {
      name: name.value,
      foods: foods.map(f => f.id),
    }

    if (foodPack) {
      updateFoodPack(foodPackForParent)
    } else {
      addFoodPack(foodPackForParent)
    }
  }

  const removeFood = event => {
    const food = foods.find(f => f.id === event.target.id)
    setFoods(foods.filter(f => f.id !== event.target.id))

    const min = priceRange.min - food.priceRange.min
    const max = priceRange.max - food.priceRange.max

    setPriceRange({
      min: min < 0 ? 0 : min,
      max: max < 0 ? 0 : max,
    })

    // food.ingredients.forEach(fi => {
    //   let amount
    //   let foodIngredientUnit
    //   if (fi.pieces) {
    //     amount = fi.pieces
    //     foodIngredientUnit = unit.PIECES
    //   } else {
    //     amount = fi.grams
    //     foodIngredientUnit = unit.GRAMS
    //   }
    //   macros.subtractAll(fi, amount, foodIngredientUnit)
    // })
  }

  return (
    <div>
      <h2>{foodPack ? `Päivitä ${foodPack.name}` : 'Luo uusi ruokapaketti'}</h2>
      <strong>
        Hintahaarukka: {priceRange.min.toFixed(2)} € -{' '}
        {priceRange.min.toFixed(2)} €
      </strong>
      <br />
      <br />
      <div>
        <div>Yhteensä energiaa: {macros.kcal} kcal</div>
        <div>Yhteensä rasvaa: {macros.fat} g</div>
        <div>- josta tyydyttynyttä: {macros.saturatedFat} g</div>
        <div>Yhteensä hiilareita: {macros.carbs} g</div>
        <div>- josta sokereita: {macros.sugars} g</div>
        <div>Yhteensä protskua {macros.protein} g</div>
        <div>Yhteensä suolaa: {macros.salt} g</div>
      </div>
      <br />
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

export default connect(null, { setAlert })(FoodPackFormContainer)
