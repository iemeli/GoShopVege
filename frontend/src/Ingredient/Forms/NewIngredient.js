import React, { useState } from 'react'
import { Alert, Form, Button } from 'react-bootstrap'
import { useMutation } from '@apollo/client'
import useField from '../../general/useField'
import { ADD_INGREDIENT, ALL_INGREDIENTS } from '../queries'
import useUpdateCache from '../../general/useUpdateCache'

const NewIngredient = () => {
  const [name, resetName] = useField('text')
  const [price, resetPrice] = useField('number')
  const [kcal, resetKcal] = useField('number')
  const [alert, setAlert] = useState(null)
  const [success, setSuccess] = useState(null)
  const updateCacheWith = useUpdateCache('allIngredients', ALL_INGREDIENTS)
  const [addIngredient] = useMutation(ADD_INGREDIENT, {
    update: (store, response) => {
      updateCacheWith(response.data.addIngredient)
    },
  })

  const submit = async e => {
    e.preventDefault()

    if (name.value.length < 4) {
      setAlert('Nimen pituuden täytyy olla vähintään 4 !')
      setTimeout(() => {
        setAlert(null)
      }, 5000)
      return
    }

    try {
      await addIngredient({
        variables: {
          name: name.value,
          price: Number(price.value),
          ...(kcal.value && { kcal: Number(kcal.value) }),
        },
      })
    } catch (error) {
      console.log('Error adding ingredient in NewIngredient.js', error.message)
    }

    setSuccess(`Uusi ainesosa ${name.value} lisätty!`)
    setTimeout(() => {
      setSuccess(null)
    }, 5000)

    resetName()
    resetPrice()
    resetKcal()
  }

  return (
    <div>
      {alert && <Alert variant="danger">{alert}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={submit}>
        <Form.Group>
          <Form.Label>Nimi</Form.Label>
          <Form.Control {...name} />
          <Form.Label>Hinta</Form.Label>
          <Form.Control {...price} />
          <Form.Label>Kilokalorit</Form.Label>
          <Form.Control {...kcal} />
          <Button type="submit">Lisää ainesosa</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default NewIngredient
