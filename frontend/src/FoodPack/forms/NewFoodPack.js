import React, { useState } from 'react'
import useField from '../../hooks/useField'
import { useQuery, useMutation } from '@apollo/client'
import { ADD_FOODPACK } from '../queries'
import {
  Form, Button, Dropdown, DropdownButton,
  Table, Alert
} from 'react-bootstrap'
import { ALL_FOODS } from '../../Food/queries'


const NewFoodPack = () => {
  const [name, resetName] = useField('text')
  const [foods, setFoods] = useState([])
  const [price, setPrice] = useState(0)
  const [kcal, setKcal] = useState(0)
  const [alert, setAlert] = useState(null)

  const foodsResult = useQuery(ALL_FOODS)
  const [addFoodPack] = useMutation(ADD_FOODPACK)

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
    
    try {
      await addFoodPack({
        variables: {
          name: name.value,
          foods: foods.map(f => f.id)
        }
      })
    } catch (e) {
      console.log('Error adding foodpack in NewFoodPack.js', e.message)
    }

    resetName()
    setPrice(0)
    setKcal(0)
    setFoods([])
  }

  const removeFood = (event) => {
    const food = foods.find(f => f.id === event.target.id)
    setFoods(foods.filter(f => f.id !== event.target.id))

    setPrice(price - food.price)
    setKcal(kcal - food.kcal)
  }

  return (
    <div>
      <h2>Luo uusi ruokapaketti</h2>
      <strong><p>Yhteishinta: {price.toFixed(2)} €</p></strong>
      <strong><p>Yhteensä kcal: {kcal}</p></strong>
      {alert &&
        <Alert variant='danger'>{alert}</Alert>
      }
      <Form onSubmit={submit}>
        <Form.Group>
          <Button type='submit'>
            Lisää ruokapaketti
          </Button>
          <br />
          <br />
          <Form.Label>Ruokapaketin nimi</Form.Label>
          <Form.Control {...name} />
        </Form.Group>
      </Form>
      <DropdownButton
        id="dropdown-basic-button"
        title="Lisää ruoka"
        flip="offset"
        preventoverflow="padding"
      >
        {foodsForDropdown.map(f => 
          <Dropdown.Item
            key={f.id}
            eventKey={f.id}
            onSelect={handleSelect}
          >
            {f.name}
          </Dropdown.Item>
        )}
      </DropdownButton>
      <Table>
        <thead>
          <tr>
            <th><h6>RUOAT</h6></th>
            <th>nimi</th>
            <th>hinta</th>
            <th>kcal</th>
            <th>ainesosat</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {foods.map(f =>
            <tr key={f.id}>
              <td></td>
              <td>{f.name}</td>
              <td>{f.price}</td>
              <td>{f.kcal}</td>
              <td>
                <DropdownButton
                  id="dropdown-basic-button"
                  title="Näytä"
                  flip="offset"
                  preventoverflow="padding"
                >
                  {f.ingredients.map(i => i.item).map(i =>
                    <Dropdown.Item key={i.id}>
                      {i.name}
                    </Dropdown.Item>
                  )}
                </DropdownButton>
              </td>
              <td>
                <Button
                  variant='light'
                  id={f.id}
                  onClick={removeFood}
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

export default NewFoodPack