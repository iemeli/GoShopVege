/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useMutation } from '@apollo/client'
import DeleteIngredientButton from '../utils/DeleteIngredientButton'
import useField from '../../general/useField'
import { UPDATE_INGREDIENT, ALL_INGREDIENTS } from '../queries'
import useUpdateCache from '../../general/useUpdateCache'

const IngredientRow = ({ ingredient, hideButtons, setAlert }) => {
  const [updateMode, setUpdateMode] = useState(false)
  const [name] = useField('text', ingredient.name)
  const [price] = useField('number', ingredient.price)
  const [kcal] = useField('number', ingredient.kcal)

  const updateCacheWith = useUpdateCache(
    'allIngredients',
    ALL_INGREDIENTS,
    'UPDATE'
  )

  const [launchUpdateIngredient] = useMutation(UPDATE_INGREDIENT, {
    update: (store, response) => {
      updateCacheWith(response.data.updateIngredient)
    },
  })

  const toggleUpdateMode = () => {
    setUpdateMode(!updateMode)
  }

  const updateIngredient = async e => {
    e.preventDefault()
    if (name.value.length < 4) {
      setAlert('danger', 'Nimen pituuden täytyy olla vähintään 4!')
      return
    }
    if (!price) {
      setAlert('danger', 'Hinta ei voi olla tyhjä!')
      return
    }
    try {
      await launchUpdateIngredient({
        variables: {
          id: ingredient.id,
          name: name.value,
          price: Number(price.value),
          kcal: kcal.value ? Number(kcal.value) : null,
        },
      })
    } catch (error) {
      console.log('Error updating ingredient in IngredientRow: ', error.message)
    }
    setAlert('success', `Ainesosa päivitetty!`)
    toggleUpdateMode()
  }

  if (updateMode) {
    return (
      <tr>
        <td>
          <input {...name} />
        </td>
        <td>
          <input {...price} />
        </td>
        <td>
          <input {...kcal} />
        </td>
        <td>
          <Button onClick={toggleUpdateMode} variant="outline-danger">
            peruuta
          </Button>
        </td>
        <td>
          <Button onClick={updateIngredient} variant="outline-warning">
            päivitä
          </Button>
        </td>
      </tr>
    )
  }

  return (
    <tr>
      <td>
        <Link to={`/ainesosat/${ingredient.name}`}>{ingredient.name}</Link>
      </td>
      <td>{ingredient.price} €</td>
      <td>{ingredient.kcal}</td>
      <td>
        {!hideButtons && (
          <Button onClick={toggleUpdateMode} variant="outline-warning">
            päivitä
          </Button>
        )}
      </td>
      <td>
        {!hideButtons && <DeleteIngredientButton ingredient={ingredient} />}
      </td>
    </tr>
  )
}

export default IngredientRow
