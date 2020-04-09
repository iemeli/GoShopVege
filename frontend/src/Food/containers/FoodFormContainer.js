import React, { useState, useEffect } from 'react'
import useField from '../../hooks/useField'
import { useQuery } from '@apollo/client'
import { ALL_INGREDIENTS } from '../../Ingredient/queries'
import { Alert } from 'react-bootstrap'
import { v4 as uuid } from 'uuid'
import FoodForm from '../presentational/FoodForm'

const FoodFormContainer = ({ food, updateFood, addFood }) => {
  const [name, resetName] = useField('text', food ? food.name : null)
  const [step, resetStep] = useField('text')
  const [recipe, setRecipe] = useState([])
  const [foodIngredients, setFoodIngredients] = useState(food ? food.ingredients : [])
  const [price, setPrice] = useState(food ? food.price : 0)
  const [kcal, setKcal] = useState(food ? food.kcal : 0)
  const [alert, setAlert] = useState(null)

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

  const ingredients = ingredientsResult.data.allIngredients
    .filter(i =>
      !foodIngredients
        .map(fi => fi.item.id)
        .includes(i.id)
    )

  const parseIngredients = () => {
    return foodIngredients.map(i => `${i.item.id};${i.usedAtOnce ? 1 : 0}`)
  }

  const parseRecipe = () => {
    return recipe.map(row => row.value)
  }

  const toggleUsedAtOnce = (event) => {
    setFoodIngredients(foodIngredients.map(fi =>
      fi.id === event.target.id
        ? { ...fi, usedAtOnce: !fi.usedAtOnce }
        : fi
    ))
  }

  const handleSelect = (ingredientID) => {
    const newFoodIngredient = {
      usedAtOnce: true,
      id: uuid()
    }
    const ingredient = ingredients.find(i => i.id === ingredientID)
    newFoodIngredient.item = ingredient
    setFoodIngredients(foodIngredients.concat(newFoodIngredient))

    setPrice(price + ingredient.price)
    setKcal(kcal + ingredient.kcal)
  }

  const removeIngredient = (event) => {
    const ingredient = foodIngredients
      .find(fi => fi.id === event.target.id)
      .item
    setFoodIngredients(foodIngredients.filter(fi =>
      fi.id !== event.target.id
    ))

    setPrice(price - ingredient.price)
    setKcal(kcal - ingredient.kcal)
  }

  const addStep = () => {
    setRecipe(recipe.concat({ value: step.value, id: uuid() }))
    resetStep()
  }

  const removeStep = (event) => {
    setRecipe(recipe.filter(row => row.id !== event.target.id))
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

    const foodForParent = {
      name: name.value,
      ingredients: parseIngredients(),
      recipe: parseRecipe()
    }

    if (food) {
      updateFood(foodForParent)
    } else {
      addFood(foodForParent)
    }

    // resetName()
    // resetStep()
    // setFoodIngredients([])
    // setRecipe([])
    // setPrice(0)
    // setKcal(0)
  }

  return (
    <div>
      <h2>
        {food ? `Päivitä ${food.name}` : 'Luo uusi ruoka'}
      </h2>
      <strong><p>Yhteishinta: {price.toFixed(2)} €</p></strong>
      <strong><p>Yhteensä kcal: {kcal}</p></strong>
      {alert &&
        <Alert variant='danger'>{alert}</Alert>
      }
      <FoodForm
        toggleUsedAtOnce={toggleUsedAtOnce}
        foodIngredients={foodIngredients}
        ingredients={ingredients}
        recipe={recipe}
        handleSelect={handleSelect}
        removeIngredient={ removeIngredient}
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

export default FoodFormContainer