/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useMutation } from '@apollo/client'
import { connect } from 'react-redux'
import { setAlert } from '../../redux/alertReducer'
import DeleteIngredientButton from '../utils/DeleteIngredientButton'
import useField from '../../general/useField'
import { UPDATE_INGREDIENT, ALL_INGREDIENTS } from '../queries'
import useUpdateCache from '../../general/useUpdateCache'
import ShopListButton from '../../ShopList/ShopListButton'

// eslint-disable-next-line no-shadow
const IngredientRow = ({ ingredient, hideButtons, setAlert }) => {
  const [updateMode, setUpdateMode] = useState(false)
  const [freezeFields, setFreezeFields] = useState(null)
  const [name, resetName, setName] = useField('text', ingredient.name)
  const [price, resetPrice, setPrice] = useField('number', ingredient.price)
  const [kcal, resetKcal, setKcal] = useField('number', ingredient.kcal)

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

  const toggleUpdateMode = cancel => {
    if (!updateMode) {
      setFreezeFields({
        name: name.value,
        price: price.value,
        kcal: kcal.value,
      })
    }
    if (cancel && updateMode) {
      setName(freezeFields.name)
      setPrice(freezeFields.price)
      setKcal(freezeFields.kcal)
    }
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
      setAlert('danger', 'Hitsi, ei mennyt putkeen. Koita uudestaan.')
    }
    setAlert(
      'success',
      `Ainesosa ${
        name.value !== freezeFields.name
          ? `"${name.value}" (ennen "${freezeFields.name}")`
          : `"${name.value}"`
      } päivitetty!`
    )
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
          <Button
            onClick={() => toggleUpdateMode('cancel')}
            variant="outline-danger"
          >
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
      <td>
        {!hideButtons && (
          <ShopListButton mode="ADD" id={ingredient.id} object="ingredients" />
        )}
      </td>
    </tr>
  )
}

export default connect(null, { setAlert })(IngredientRow)
