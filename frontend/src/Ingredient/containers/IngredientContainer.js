import React from 'react'
import { useRouteMatch, Redirect } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { ALL_INGREDIENTS } from '../queries'
import Ingredient from '../presentational/Ingredient'

const IngredientContainer = () => {
  const ingredientName = useRouteMatch('/ainesosat/:name').params.name
  const ingredientsResult = useQuery(ALL_INGREDIENTS)

  if (ingredientsResult.loading) {
    return <div>...loading</div>
  }

  const ingredient = ingredientsResult.data.allIngredients.find(
    i => i.name === ingredientName
  )

  if (!ingredient) {
    return <Redirect to="/ainesosat" />
  }

  return (
    <div>
      <Ingredient ingredient={ingredient} />
    </div>
  )
}

export default IngredientContainer
