import React, { useState } from 'react'
import useField from '../../hooks/useField'
import { useQuery, useMutation } from '@apollo/client'
import { ADD_FOOD } from '../queries'
import { ALL_INGREDIENTS } from '../../Ingredient/queries'
import {
  Form, Button, Dropdown, DropdownButton
} from 'react-bootstrap'

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

  return (
    <div>
      <h2>Luo uusi ruoka</h2>
      <Form onSubmit={submit}>
        <Form.Group>
          <Form.Label>Nimi</Form.Label>
          <Form.Control {...name} />
          <Form.Label>Ruoat</Form.Label>
          <DropdownButton
            id="dropdown-basic-button"
            title="Lisää ainesosa"
          >
            {ingredients.map(i => 
              <Dropdown.Item key={i.id}>
                {i.name}
              </Dropdown.Item>
            )}
          </DropdownButton>
        </Form.Group>
      </Form>
    </div>
  )
}


export default NewFood