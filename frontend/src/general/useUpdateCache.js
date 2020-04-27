import { useApolloClient } from '@apollo/client'
import { ALL_INGREDIENTS } from '../Ingredient/queries'
import { ALL_FOODS } from '../Food/queries'

const useUpdateCache = (collection, query, mode) => {
  const client = useApolloClient()

  const includedIn = (set, object) => set.map(i => i.id).includes(object.id)

  const updateCacheWith = object => {
    switch (mode) {
      case 'ADD': {
        const dataInStore = client.readQuery({ query })
        if (!includedIn(dataInStore[collection], object)) {
          const data = dataInStore[collection].concat(object)
          client.writeQuery({
            query,
            data: {
              [collection]: data,
            },
          })

          if (collection === 'allFoods') {
            const { allIngredients } = client.readQuery({
              query: ALL_INGREDIENTS,
            })
            const ingredientsInFood = object.ingredients.map(i => i.item.id)
            const ingredientsData = allIngredients.map(i =>
              ingredientsInFood.includes(i.id)
                ? { ...i, usedInFoods: i.usedInFoods.concat(object.id) }
                : i
            )
            client.writeQuery({
              query: ALL_INGREDIENTS,
              data: {
                allIngredients: ingredientsData,
              },
            })
          } else if (collection === 'allFoodPacks') {
            const { allFoods } = client.readQuery({
              query: ALL_FOODS,
            })
            const foodsInFoodPack = object.foods.map(f => f.id)
            const foodsData = allFoods.map(f =>
              foodsInFoodPack.includes(f.id)
                ? { ...f, usedInFoodPacks: f.usedInFoodPacks.concat(object.id) }
                : f
            )
            client.writeQuery({
              query: ALL_FOODS,
              data: {
                allFoods: foodsData,
              },
            })
          }
        }
        break
      }
      case 'DELETE': {
        const dataInStore = client.readQuery({ query })
        if (includedIn(dataInStore[collection], object)) {
          const data = dataInStore[collection].filter(o => o.id !== object.id)
          client.writeQuery({
            query,
            data: {
              [collection]: data,
            },
          })
          if (collection === 'allIngredients') {
            const { allFoods } = client.readQuery({
              query: ALL_FOODS,
            })
            const usedInFoods = object.usedInFoods.map(f => f.id)
            const foodsData = allFoods.map(f =>
              usedInFoods.includes(f.id)
                ? {
                    ...f,
                    ingredients: f.ingredients.filter(
                      fi => fi.item.id !== object.id
                    ),
                  }
                : f
            )

            client.writeQuery({
              query: ALL_FOODS,
              data: {
                allFoods: foodsData,
              },
            })
          } else if (collection === 'allFoods') {
            const { allIngredients } = client.readQuery({
              query: ALL_INGREDIENTS,
            })
            const ingredientsInFood = object.ingredients.map(i => i.item.id)
            const ingredientsData = allIngredients.map(i =>
              ingredientsInFood.includes(i.id)
                ? {
                    ...i,
                    usedInFoods: i.usedInFoods.filter(f => f.id !== object.id),
                  }
                : i
            )
            client.writeQuery({
              query: ALL_INGREDIENTS,
              data: {
                allIngredients: ingredientsData,
              },
            })
          } else if (collection === 'allFoodPacks') {
            const { allFoods } = client.readQuery({
              query: ALL_FOODS,
            })
            const foodsInFoodPack = object.foods.map(f => f.id)
            const foodsData = allFoods.map(f =>
              foodsInFoodPack.includes(f.id)
                ? {
                    ...f,
                    usedInFoodPacks: f.usedInFoodPacks.filter(
                      fp => fp.id !== object.id
                    ),
                  }
                : f
            )
            client.writeQuery({
              query: ALL_FOODS,
              data: {
                allFoods: foodsData,
              },
            })
          }
        }
        break
      }
      case 'UPDATE': {
        if (collection === 'allFoods') {
          const { food, oldIngredients } = object
          const newIngredients = food.ingredients.map(i => i.item.id)
          if (oldIngredients !== newIngredients) {
            const setWithUniqueValues = new Set([
              ...oldIngredients,
              ...newIngredients,
            ])

            const { allIngredients } = client.readQuery({
              query: ALL_INGREDIENTS,
            })

            const ingredientsData = allIngredients.map(i => {
              if (setWithUniqueValues.has(i.id)) {
                if (oldIngredients.includes(i.id)) {
                  return {
                    ...i,
                    usedInFoods: i.usedInFoods.filter(f => f.id !== food.id),
                  }
                }

                return { ...i, usedInFoods: i.usedInFoods.concat(food.id) }
              }
              return i
            })
            client.writeQuery({
              query: ALL_INGREDIENTS,
              data: {
                allIngredients: ingredientsData,
              },
            })
          }
        }

        break
      }
      default:
        break
    }
  }

  return updateCacheWith
}

export default useUpdateCache
