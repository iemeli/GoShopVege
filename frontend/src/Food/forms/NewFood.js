import React, { useState } from 'react'
import useField from '../../hooks/useField'
import { useQuery, useMutation } from '@apollo/client'
import { ADD_FOOD } from '../queries'
import { ALL_INGREDIENTS } from '../../Ingredient/queries'
import {
  Form, Button, Dropdown, DropdownButton, Table
} from 'react-bootstrap'
import { v4 as uuid } from 'uuid'

const NewFood = () => {
  const [name, resetName] = useField('text')
  const [foodIngredients, setFoodIngredients] = useState([])
  const [price, setPrice] = useState(null)
  const [kcal, setKcal] = useState(null)

  const ingredientsResult = useQuery(ALL_INGREDIENTS)
  const [addFood] = useMutation(ADD_FOOD)

  if (ingredientsResult.loading) {
    return <div>...loading</div>
  }

  const ingredients = ingredientsResult.data.allIngredients

  const submit = async (e) => {
    e.preventDefault()

    try {
      await addFood({
        variables: {
          name: name.value,
          price: Number(price.value),
          ...kcal.value && { kcal: Number(kcal.value) }
        }
      })
    } catch (e) {
      console.log('Error adding food in NewFood.js', e.message)
    }

    resetName()
    setFoodIngredients([])
    setPrice(null)
    setKcal(null)
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
    newFoodIngredient.item = ingredients
      .find(i => i.id === ingredientID)
    setFoodIngredients(foodIngredients.concat(newFoodIngredient))
  }

  return (
    <div>
      <h2>Luo uusi ruoka</h2>
      <Form onSubmit={submit}>
        <Form.Group>
          <Form.Label>Ruoan nimi</Form.Label>
          <Form.Control {...name} />
        </Form.Group>
      </Form>
      <Table>
        <thead>
          <tr>
            <th><h6>AINESOSAT</h6></th>
            <th>nimi</th>
            <th>menee kerralla</th>
          </tr>
        </thead>
        <tbody>
          {foodIngredients.map(fi =>
            <tr key={fi.id}>
              <td></td>
              <td>{fi.item.name}</td>
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
                      variant="danger"
                      id={fi.id}
                      onClick={toggleUsedAtOnce}>
                      ei
                  </Button>
                }
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <DropdownButton
        id="dropdown-basic-button"
        title="Lisää ainesosa"
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
    </div>
  )
}


export default NewFood