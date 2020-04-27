import React from 'react'
import { useQuery, useSubscription } from '@apollo/client'
import { ALL_INGREDIENTS, INGREDIENT_ADDED } from '../queries'
import ListIngredients from '../presentational/ListIngredients'
import NewIngredient from '../Forms/NewIngredient'
import useUpdateCache from '../../general/useUpdateCache'

const ListIngredientsContainer = ({ setAlert }) => {
  const ingredientsResult = useQuery(ALL_INGREDIENTS)

  const updateCacheWith = useUpdateCache(
    'allIngredients',
    ALL_INGREDIENTS,
    'ADD'
  )

  useSubscription(INGREDIENT_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedIngredient = subscriptionData.data.ingredientAdded
      updateCacheWith(addedIngredient)
    },
  })

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
