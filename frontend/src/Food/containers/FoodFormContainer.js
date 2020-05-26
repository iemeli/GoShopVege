import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { v4 as uuid } from 'uuid'
import { connect } from 'react-redux'
import { setAlert } from '../../redux/alertReducer'
import useField from '../../hooks/useField'
import { ALL_INGREDIENTS } from '../../Ingredient/queries'
import FoodForm from '../presentational/FoodForm'

// eslint-disable-next-line no-shadow
const FoodFormContainer = ({ food, updateFood, addFood, setAlert }) => {
  const [name] = useField('text', food ? food.name : null)
  const [step, resetStep] = useField('text')
  const [recipe, setRecipe] = useState([])
  const [foodIngredients, setFoodIngredients] = useState(
    food ? food.ingredients : []
  )
  const [priceRange, setPriceRange] = useState(
    food ? food.priceRange : { min: 0, max: 0 }
  )
  const [kcal, setKcal] = useState(food ? food.kcal : 0)
  const ingredientsResult = useQuery(ALL_INGREDIENTS)
  console.log('täs foodIngredients', foodIngredients)
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

  const unit = {
    PIECES: 'pieces',
    GRAMS: 'grams',
  }

  const parseIngredients = () => {
    return foodIngredients.map(i => `${i.item.id};${i.usedAtOnce ? 1 : 0}`)
  }

  const parseRecipe = () => {
    return recipe.map(row => row.value)
  }

  //tän idea on saada minkä tahansa makron (kcal, fat, jne)
  //arvo kun määrä on value
  //halutaan siis jotenkin yleistää MINKÄ TAHANSA makron saaminen
  //kun tiedetään
  // A) makron {in100g, inOnePiece}
  // B) foodIngredientin value, eli kuinka monta pieces/grams
  const getMacroByUnit = (
    macroName,
    ingredient,
    foodIngredientValue,
    foodIngredientUnit
  ) => {
    if (foodIngredientUnit === unit.PIECES) {
      return ingredient[macroName].inOnePiece * foodIngredientValue
    }
    return (ingredient[macroName].in100g / 100) * foodIngredientValue
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
    setKcal(
      kcal -
        getMacroByUnit(
          'kcal',
          foodIngredient.item,
          foodIngredient.value,
          oldUnit
        ) +
        getMacroByUnit(
          'kcal',
          foodIngredient.item,
          foodIngredient.value,
          newUnit
        )
    )
  }

  const changeFoodIngredientValue = event => {
    const foodIngredient = foodIngredients.find(fi => fi.id === event.target.id)
    const changeInValue = Number(event.target.value) - foodIngredient.value
    setKcal(
      kcal +
        (foodIngredient.unit === 'pieces'
          ? foodIngredient.item.kcal.inOnePiece * changeInValue
          : (foodIngredient.item.kcal.in100g / 100) * changeInValue)
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
    newFoodIngredient.item = ingredient
    setFoodIngredients(foodIngredients.concat(newFoodIngredient))

    setPriceRange({
      min: priceRange.min + ingredient.priceRange.min,
      max: priceRange.max + ingredient.priceRange.max,
    })

    setKcal(
      kcal +
        getMacroByUnit(
          'kcal',
          ingredient,
          newFoodIngredient.value,
          foodIngredientUnit
        )
    )
  }

  const removeFoodIngredient = event => {
    const ingredient = foodIngredients.find(fi => fi.id === event.target.id)
      .item
    setFoodIngredients(foodIngredients.filter(fi => fi.id !== event.target.id))

    setPriceRange({
      min: priceRange.min - ingredient.priceRange.min,
      max: priceRange.max - ingredient.priceRange.max,
    })
    // setKcal(kcal - ingredient.kcal)
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
        <p>
          Hintahaarukka: {priceRange.min.toFixed(2)} € -{' '}
          {priceRange.max.toFixed(2)} €
        </p>
      </strong>
      <strong>
        <p>Yhteensä energiaa: {kcal.toFixed(1)} kcal</p>
      </strong>
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
