import React from 'react'
import { useQuery, useSubscription, useApolloClient } from '@apollo/client'
import { ALL_INGREDIENTS, INGREDIENT_ADDED } from '../queries'
import ListIngredients from '../presentational/ListIngredients'
import NewIngredient from '../Forms/NewIngredient'
import useUpdateCache from '../../general/useUpdateCache'

const ListIngredientsContainer = () => {
  const ingredientsResult = useQuery(ALL_INGREDIENTS)
  const client = useApolloClient()
  const updateCacheWith = useUpdateCache('allIngredients', ALL_INGREDIENTS)

  useSubscription(INGREDIENT_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedIngredient = subscriptionData.data.ingredientAdded
      updateCacheWith(addedIngredient)
    },
  })

  if (ingredientsResult.loading) {
    return <div>...loading</div>
  }

  const dataInStore = client.readQuery({ query: ALL_INGREDIENTS })
  const ingredients = dataInStore.allIngredients

  return (
    <div>
      <NewIngredient />
      <ListIngredients ingredients={ingredients} />
    </div>
  )
}

export default ListIngredientsContainer
