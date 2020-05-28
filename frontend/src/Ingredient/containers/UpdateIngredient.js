import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import useUpdateCache from '../../hooks/useUpdateCache'
import IngredientForm from '../Forms/IngredientForm'
import { ALL_INGREDIENTS, UPDATE_INGREDIENT } from '../queries'
import { setAlert } from '../../redux/alertReducer'

// eslint-disable-next-line no-shadow
const UpdateIngredient = ({ setAlert }) => {
  const history = useHistory()
  const ingredientName = useRouteMatch('/ainesosat/paivita/:name').params.name
  const updateCacheWith = useUpdateCache(
    'allIngredients',
    ALL_INGREDIENTS,
    'UPDATE'
  )
  const [launchUpdateIngredient] = useMutation(UPDATE_INGREDIENT, {
    update: (store, response) => {
      updateCacheWith(response.data.updateIngredient)
      history.push(`/ainesosat/${ingredientName}`)
    },
  })

  const { data, loading } = useQuery(ALL_INGREDIENTS)

  if (loading === true) {
    return <div>...loading</div>
  }

  const ingredient = data.allIngredients.find(i => i.name === ingredientName)

  const updateIngredient = async ingredientToUpdate => {
    try {
      const {
        name,
        prices,
        brand,
        pieces,
        weight,
        kcal,
        fat,
        saturatedFat,
        carbs,
        sugars,
        protein,
        salt,
      } = ingredientToUpdate
      await launchUpdateIngredient({
        variables: {
          id: ingredient.id,
          ...(name && { name }),
          ...(prices && { prices }),
          ...(brand && { brand }),
          ...(pieces && { pieces }),
          ...(weight && { weight }),
          ...(kcal && { kcal }),
          ...(fat && { fat }),
          ...(saturatedFat && { saturatedFat }),
          ...(carbs && { carbs }),
          ...(sugars && { sugars }),
          ...(protein && { protein }),
          ...(salt && { salt }),
        },
      })
      setAlert('success', `Ainesosa ${ingredientName} päivitetty!`)
    } catch (e) {
      console.log(
        'Error updating ingredient in UpdateIngredient.js: ',
        e.message
      )
      setAlert('danger', `Hmm... yritäppä uudemman kerran. Jotain on vialla.`)
    }
  }

  return (
    <div>
      <IngredientForm ingredient={ingredient} update={updateIngredient} />
    </div>
  )
}

export default connect(null, { setAlert })(UpdateIngredient)
