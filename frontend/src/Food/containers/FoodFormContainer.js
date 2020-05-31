import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { v4 as uuid } from 'uuid'
import { connect } from 'react-redux'
import { setAlert } from '../../redux/alertReducer'
import useField from '../../hooks/useField'
import { ALL_INGREDIENTS } from '../../Ingredient/queries'
import FoodForm from '../presentational/FoodForm'
import useMacros from '../../hooks/useMacros'

const unit = {
  PIECES: 'pieces',
  GRAMS: 'grams',
}

const getFoodIngredient = fi => {
  return {
    unit: fi.pieces ? unit.PIECES : unit.GRAMS,
    onlyGrams: fi.pieces === null,
    value: fi.pieces ? fi.pieces : fi.grams,
    item: fi.item,
    id: uuid(),
  }
}

// eslint-disable-next-line no-shadow
const FoodFormContainer = ({ food, updateFood, addFood, setAlert }) => {
  const [name] = useField('text', food ? food.name : null)
  const [step, resetStep] = useField('text')
  const [recipe, setRecipe] = useState([])
  const [foodIngredients, setFoodIngredients] = useState(
    food ? food.ingredients.map(fi => getFoodIngredient(fi)) : []
  )
  const [priceRange, setPriceRange] = useState(
    food ? food.priceRange : { min: 0, max: 0 }
  )
  const [macros] = useMacros(food, 'food')

  const ingredientsResult = useQuery(ALL_INGREDIENTS)

  useEffect(() => {
    if (food) {
      const recipeRows = food.recipe.map(r => ({ value: r, id: uuid() }))
      setRecipe(recipeRows)
    }
  }, [food])

  if (ingredientsResult.loading) {
    return <div>...loading</div>
  }

  const ingredients = ingredientsResult.data.allIngredients.filter(
    i => !foodIngredients.map(fi => fi.item.id).includes(i.id)
  )

  const parseIngredients = () => {
    return foodIngredients.map(fi => `${fi.item.id};${fi.unit};${fi.value}`)
  }

  const parseRecipe = () => {
    return recipe.map(row => row.value)
  }

  const toggleUnit = event => {
    const foodIngredient = foodIngredients.find(fi => fi.id === event.target.id)
    const oldUnit = foodIngredient.unit
    const newUnit =
      foodIngredient.unit === unit.PIECES ? unit.GRAMS : unit.PIECES
    foodIngredient.unit = newUnit

    setFoodIngredients(
      foodIngredients.map(fi =>
        fi.id === event.target.id ? foodIngredient : fi
      )
    )

    macros.subtractAll(foodIngredient.item, foodIngredient.value, oldUnit)
    macros.addAll(foodIngredient.item, foodIngredient.value, newUnit)
  }

  const changeFoodIngredientValue = event => {
    const foodIngredient = foodIngredients.find(fi => fi.id === event.target.id)
    const changeInValue = Number(event.target.value) - foodIngredient.value

    macros.addAll(
      foodIngredient.item,
      changeInValue,
      foodIngredient.unit,
      'food'
    )

    setFoodIngredients(
      foodIngredients.map(fi =>
        fi.id === event.target.id
          ? { ...fi, value: Number(event.target.value) }
          : fi
      )
    )
  }

  const addFoodIngredient = ingredientID => {
    const ingredient = ingredients.find(i => i.id === ingredientID)
    const foodIngredientUnit = ingredient.pieces ? unit.PIECES : unit.GRAMS
    const newFoodIngredient = {
      unit: foodIngredientUnit,
      onlyGrams: ingredient.pieces === null,
      value: 0,
      item: ingredient,
      id: uuid(),
    }

    setFoodIngredients(foodIngredients.concat(newFoodIngredient))

    setPriceRange({
      min: priceRange.min + ingredient.priceRange.min,
      max: priceRange.max + ingredient.priceRange.max,
    })
  }

  const removeFoodIngredient = event => {
    const foodIngredient = foodIngredients.find(fi => fi.id === event.target.id)
    setFoodIngredients(
      foodIngredients.filter(fi => fi.id !== foodIngredient.id)
    )
    const min = priceRange.min - foodIngredient.item.priceRange.min
    const max = priceRange.max - foodIngredient.item.priceRange.max
    setPriceRange({
      min: min < 0 ? 0 : min,
      max: max < 0 ? 0 : max,
    })
    macros.subtractAll(
      foodIngredient.item,
      foodIngredient.value,
      foodIngredient.unit,
      'food'
    )
  }

  const addStep = () => {
    if (step.value.length < 3) {
      setAlert(
        'danger',
        'Yhden reseptin rivin pituuden täytyy olla vähintään 3!'
      )
      return
    }
    if (recipe.map(r => r.value).includes(step.value)) {
      setAlert('danger', 'Reseptissä ei voi olla samoja rivejä!')
      return
    }
    setRecipe(recipe.concat({ value: step.value, id: uuid() }))
    resetStep()
  }

  const removeStep = event => {
    setRecipe(recipe.filter(row => row.id !== event.target.id))
  }

  const submit = async e => {
    e.preventDefault()

    if (name.value.length < 4) {
      setAlert('danger', 'Nimen pituuden täytyy olla vähintään 4 !')
      return
    }

    const foodForParent = {
      name: name.value,
      ingredients: parseIngredients(),
      recipe: parseRecipe(),
    }

    if (food) {
      updateFood(foodForParent)
    } else {
      addFood(foodForParent)
    }
  }

  return (
    <div>
      <h2>{food ? `Päivitä ${food.name}` : 'Luo uusi ruoka'}</h2>
      <strong>
        <div>
          Hintahaarukka: {priceRange.min.toFixed(2)} € -{' '}
          {priceRange.max.toFixed(2)} €
        </div>
      </strong>
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
      <FoodForm
        changeFoodIngredientValue={changeFoodIngredientValue}
        toggleUnit={toggleUnit}
        foodIngredients={foodIngredients}
        ingredients={ingredients}
        recipe={recipe}
        handleSelect={addFoodIngredient}
        removeFoodIngredient={removeFoodIngredient}
        addStep={addStep}
        removeStep={removeStep}
        submit={submit}
        step={step}
        food={food}
        name={name}
      />
    </div>
  )
}

export default connect(null, { setAlert })(FoodFormContainer)
