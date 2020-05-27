import React, { useState } from 'react'
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
  const history = useHistory()
  const [name] = useField('text')
  const [prices, setPrices] = useState([])
  const [newPrice, resetNewPrice] = useField('number')
  const [pieces] = useField('number')
  const [brand] = useField('text')
  const [weight] = useField('number')
  const [kcal] = useField('number')
  const [fat] = useField('number')
  const [saturatedFat] = useField('number')
  const [carbs] = useField('number')
  const [sugars] = useField('number')
  const [protein] = useField('number')
  const [salt] = useField('number')

  const { loading, data } = useQuery(ALL_INGREDIENTS)

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

    if (prices.length === 0) {
      setAlert('danger', 'Ainesosalla täytyy olla ainakin yksi hinta!')
      return
    }

    try {
      await addIngredient({
        variables: {
          name: name.value,
          price: prices,
          ...(brand.value && { brand: brand.value }),
          ...(pieces.value && { pieces: Number(pieces.value) }),
          ...(weight.value && { weight: Number(weight.value) }),
          ...(kcal.value && { kcal: Number(kcal.value) }),
          ...(fat.value && { fat: Number(fat.value) }),
          ...(saturatedFat.value && {
            saturatedFat: Number(saturatedFat.value),
          }),
          ...(carbs.value && { carbs: Number(carbs.value) }),
          ...(sugars.value && { sugars: Number(sugars.value) }),
          ...(protein.value && { protein: Number(protein.value) }),
          ...(salt.value && { salt: Number(salt.value) }),
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

  const addPrice = () => {
    setPrices(prices.concat(Number(newPrice.value)))
    resetNewPrice()
  }

  const deletePrice = () => {
    const pricesClone = [...prices]
    pricesClone.pop(pricesClone.length)
    setPrices(pricesClone)
  }

  return (
    <div>
      <h2>Uusi ainesosa</h2>
      <Form onSubmit={submit}>
        <Form.Group>
          <Form.Label>
            <strong>Nimi</strong>
          </Form.Label>
          <Form.Control {...name} />
          <Form.Label>
            <strong>Hinta (€)</strong>
            <Button variant="light" onClick={addPrice}>
              lisää hinta
            </Button>
            <Button variant="light" onClick={deletePrice}>
              poista viimeisin hinta
            </Button>
          </Form.Label>
          <div>
            Hinnat: {prices.map(p => `${p.toFixed(2)} €, `)}
            <Form.Control
              bsPrefix={{ display: 'inline-block' }}
              {...newPrice}
            />
          </div>

          <Form.Label>
            <strong>Kappaletta</strong>
          </Form.Label>
          <Form.Control {...pieces} />
          <Form.Label>
            <strong>Brändi</strong>
          </Form.Label>
          <Form.Control {...brand} />
          <Form.Label>
            <strong>Paino (g)</strong>
          </Form.Label>
          <Form.Control {...weight} />
          <Form.Label>
            <strong>Rasvaa (g)</strong>
          </Form.Label>
          <Form.Control {...fat} />
          <Form.Label>
            <strong>joista tyydyttyneitä (g)</strong>
          </Form.Label>
          <Form.Control {...saturatedFat} />
          <Form.Label>
            <strong>Hiilarit (g)</strong>
          </Form.Label>
          <Form.Control {...carbs} />
          <Form.Label>
            <strong>joista sokereita (g)</strong>
          </Form.Label>
          <Form.Control {...sugars} />
          <Form.Label>
            <strong>Protskua (g)</strong>
          </Form.Label>
          <Form.Control {...protein} />
          <Form.Label>
            <strong>Suolaa (g)</strong>
          </Form.Label>
          <Form.Control {...salt} />
          <br />
          <Button type="submit">Lisää ainesosa</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default connect(null, { setAlert })(NewIngredient)
