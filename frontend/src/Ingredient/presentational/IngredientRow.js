import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useMutation } from '@apollo/client'
import DeleteIngredientButton from '../utils/DeleteIngredientButton'
import useField from '../../hooks/useField'
import { UPDATE_INGREDIENT } from '../queries'

const IngredientRow = ({ ingredient, hideButtons }) => {
  const [updateMode, setUpdateMode] = useState(false)
  const [name] = useField('text', ingredient.name)
  const [price] = useField('number', ingredient.price)
  const [kcal] = useField('number', ingredient.kcal)

  const [launchUpdateIngredient] = useMutation(UPDATE_INGREDIENT)

  const toggleUpdateMode = () => {
    setUpdateMode(!updateMode)
  }

  const updateIngredient = async (e) => {
    e.preventDefault()

    try {
      await launchUpdateIngredient({
        variables: {
          id: ingredient.id,
          name: name.value,
          price: price.value,
          kcal: kcal.value,
        },
      })
    } catch (error) {
      console.log('Error updating ingredient in IngredientRow: ', error.message)
    }

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
