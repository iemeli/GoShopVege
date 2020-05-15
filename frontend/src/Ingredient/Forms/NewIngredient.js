import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { connect } from 'react-redux'
import useField from '../../hooks/useField'
import { ADD_INGREDIENT, ALL_INGREDIENTS } from '../queries'
import useUpdateCache from '../../hooks/useUpdateCache'
import { setAlert } from '../../redux/alertReducer'

// eslint-disable-next-line no-shadow
const NewIngredient = ({ setAlert }) => {
  const [name] = useField('text')
  const [price] = useField('number')
  const [kcal] = useField('number')
  const { loading, data } = useQuery(ALL_INGREDIENTS)
  const history = useHistory()
  const updateCacheWith = useUpdateCache(
    'allIngredients',
    ALL_INGREDIENTS,
    'ADD'
  )
  const [addIngredient] = useMutation(ADD_INGREDIENT, {
    update: (store, response) => {
      updateCacheWith(response.data.addIngredient)
      history.push('/ainesosat')
    },
  })

  if (loading) {
    return <div>...loading</div>
  }

  const ingredientNames = data.allIngredients.map(i => i.name)

  const submit = async e => {
    e.preventDefault()

    if (name.value.length < 4) {
      setAlert('danger', 'Nimen pituuden täytyy olla vähintään 4 !')
      return
    }

    if (ingredientNames.includes(name.value)) {
      setAlert(
        'danger',
        `Ainesosa "${name.value}" on jo olemassa. Valitse toinen nimi!`
      )
      return
    }

    if (!price.value) {
      setAlert('danger', 'Ainesosalla täytyy olla hinta!')
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
      setAlert('success', `Uusi ainesosa ${name.value} lisätty!`)
    } catch (error) {
      console.log('Error adding ingredient in NewIngredient.js', error.message)
      setAlert(
        'danger',
        'Hmm... bitti taitaa olla poikittain. Kokeile uudestaan.'
      )
    }
  }

  return (
    <div>
      <h2>Uusi ainesosa</h2>
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

export default connect(null, { setAlert })(NewIngredient)
