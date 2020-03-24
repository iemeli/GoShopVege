import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_INGREDIENTS } from '../../queries'
import ListIngredients from '../presentational/ListIngredients'

const ListIngredientsContainer = () => {
  const ingredientsResult = useQuery(ALL_INGREDIENTS)

  if (ingredientsResult.loading) {
    return (
      <div>...loading</div>
    )
  }

  const ingredients = ingredientsResult.data.allIngredients

  return (
    <div>
      <ListIngredients ingredients={ingredients} />
    </div>
  )
}

export default ListIngredientsContainer