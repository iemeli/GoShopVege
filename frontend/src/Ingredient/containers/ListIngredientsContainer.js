import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_INGREDIENTS, INGREDIENT_ADDED } from '../queries'
import ListIngredients from '../presentational/ListIngredients'
import NewIngredient from '../Forms/NewIngredient' 
import {
  useSubscription, useApolloClient
} from '@apollo/client'

const ListIngredientsContainer = () => {
  const ingredientsResult = useQuery(ALL_INGREDIENTS)
  const client = useApolloClient()

  const updateCacheWith = (addedIngredient) => {
    const includedIn = (set, object) =>
      set.map(i => i.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_INGREDIENTS })
    if (!includedIn(dataInStore.allIngredients, addedIngredient)) {
      client.writeQuery({
        query: ALL_INGREDIENTS,
        data: { 
          allIngredients: dataInStore.allIngredients.concat(addedIngredient)
        }
      })
    } 
  }

  useSubscription(INGREDIENT_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedIngredient = subscriptionData.data.ingredientAdded
      window.alert(`Uusi ainesosa lisätty: ${addedIngredient.name}`)
      updateCacheWith(addedIngredient)
    }
  })

  if (ingredientsResult.loading) {
    return (
      <div>...loading</div>
    )
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