import { useSubscription } from '@apollo/client'
import useUpdateCache from './useUpdateCache'
import { ALL_INGREDIENTS, INGREDIENT_ADDED } from '../Ingredient/queries'
import { ALL_FOODS, FOOD_ADDED } from '../Food/queries'

const useEpicSubscription = () => {
  //Subscriptions for Ingredient
  const updateCacheWithIngredient = useUpdateCache(
    'allIngredients',
    ALL_INGREDIENTS,
    'ADD'
  )
  useSubscription(INGREDIENT_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedIngredient = subscriptionData.data.ingredientAdded
      updateCacheWithIngredient(addedIngredient)
    },
  })

  //Subscriptions for Food
  const updateCacheWithFood = useUpdateCache('allFoods', ALL_FOODS, 'ADD')
  useSubscription(FOOD_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedFood = subscriptionData.data.foodAdded
      updateCacheWithFood(addedFood)
    },
  })
}

export default useEpicSubscription
