import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_INGREDIENTS } from '../queries'
import ListIngredients from '../presentational/ListIngredients'
import NewIngredient from '../Forms/NewIngredient'

const ListIngredientsContainer = ({ setAlert }) => {
  const ingredientsResult = useQuery(ALL_INGREDIENTS)

  if (ingredientsResult.loading) {
    return <div>...loading</div>
  }

  const ingredients = ingredientsResult.data.allIngredients

  return (
    <div>
      <NewIngredient setAlert={setAlert} />
      <ListIngredients ingredients={ingredients} setAlert={setAlert} />
    </div>
  )
}

export default ListIngredientsContainer
