import React, { useState, useEffect } from 'react'
import useField from '../../hooks/useField'
import { useQuery, useMutation } from '@apollo/client'
import { ADD_FOOD, UPDATE_FOOD } from '../queries'
import { ALL_INGREDIENTS } from '../../Ingredient/queries'
import {
  Form, Button, Dropdown, DropdownButton,
  Table, ListGroup, Alert
} from 'react-bootstrap'
import { v4 as uuid } from 'uuid'
import { Redirect } from 'react-router-dom'

const NewFood = ({ food }) => {
  const [alreadyUpdated, setAlreadyUpdated] = useState(false)
  const [name, resetName] = useField('text', food ? food.name : null)
  const [step, resetStep] = useField('text')
  const [recipe, setRecipe] = useState([])
  const [foodIngredients, setFoodIngredients] = useState(food ? food.ingredients : [])
  const [price, setPrice] = useState(food ? food.price : 0)
  const [kcal, setKcal] = useState(food ? food.kcal : 0)
  const [alert, setAlert] = useState(null)
  

  const ingredientsResult = useQuery(ALL_INGREDIENTS)
  const [launchAddFood] = useMutation(ADD_FOOD)
  const [launchUpdateFood] = useMutation(UPDATE_FOOD)

  useEffect(() => {
    if (food) {
      const recipeRows = food.recipe.map(r => ({ value: r, id: uuid() }))
      setRecipe(recipeRows)
    }
  }, [food])

  if (alreadyUpdated) {
    return <Redirect to={`/ruoat/${food.name}`} />
  }

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

  const addFood = async (e) => {
    e.preventDefault()

    if (name.value.length < 4) {
      setAlert('Nimen pituuden täytyy olla vähintään 4 !')
      setTimeout(() => {
        setAlert(null)
      }, 5000)
      return
    }

    try {
      await launchAddFood({
        variables: {
          name: name.value,
          ingredients: parseIngredients(),
          recipe: parseRecipe()
        }
      })
    } catch (e) {
      console.log('Error adding food in NewFood.js', e.message)
    }

    resetName()
    resetStep()
    setFoodIngredients([])
    setRecipe([])
    setPrice(0)
    setKcal(0)
  }

  const updateFood = async (e) => {
    e.preventDefault()

    if (name.value.length < 4) {
      setAlert('Nimen pituuden täytyy olla vähintään 4 !')
      setTimeout(() => {
        setAlert(null)
      }, 5000)
      return
    }

    try {
      await launchUpdateFood({
        variables: {
          id: food.id,
          name: name.value,
          ingredients: parseIngredients(),
          recipe: parseRecipe()
        }
      })
    } catch (e) {
      console.log('Error updating food in NewFood.js', e.message)
    }
    setAlreadyUpdated(true)
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
      <Form onSubmit={food ? updateFood : addFood}>
        <Form.Group>
          <Button variant="primary" type="submit">
            {food ? 'päivitä' : 'lisää ruoka'}
          </Button>
          <br />
          <br />
          <Form.Label>Ruoan nimi</Form.Label>
          <Form.Control {...name} />
          <Form.Label>Resepti</Form.Label>
          <Form.Control {...step} />
          <Button onClick={addStep}>lisää reseptiin</Button>
        </Form.Group>
      </Form>
      <ListGroup>
        {recipe.map(row =>
          <ListGroup.Item key={row.id}>
            <li>{row.value}
              <Button
                variant='light'
                id={row.id}
                onClick={removeStep}>
                poista
            </Button>
            </li>
          </ListGroup.Item>
        )}
      </ListGroup>
      <DropdownButton
        id='dropdown-basic-button'
        title='Lisää ainesosa'
        flip='true'
      >
        {ingredients.map(i =>
          <Dropdown.Item
            key={i.id}
            eventKey={i.id}
            onSelect={handleSelect}
          >
            {i.name}
          </Dropdown.Item>
        )}
      </DropdownButton>
      <Table>
        <thead>
          <tr>
            <th><h6>AINESOSAT</h6></th>
            <th>nimi</th>
            <th>hinta (€)</th>
            <th>kcal</th>
            <th>menee kerralla</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {foodIngredients.map(fi =>
            <tr key={fi.id}>
              <td></td>
              <td>{fi.item.name}</td>
              <td>{fi.item.price.toFixed(2)}</td>
              <td>{fi.item.kcal}</td>
              <td>
                {
                  fi.usedAtOnce
                    ?
                    <Button
                      variant='success'
                      id={fi.id}
                      onClick={toggleUsedAtOnce}>
                      kyllä
                  </Button>
                    :
                    <Button
                      variant='danger'
                      id={fi.id}
                      onClick={toggleUsedAtOnce}>
                      ei
                  </Button>
                }
              </td>
              <td>
                <Button
                  variant='light'
                  id={fi.id}
                  onClick={removeIngredient}
                >
                  poista
                </Button>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}


export default NewFood