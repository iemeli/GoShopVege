import { useApolloClient } from '@apollo/client'
import isEqual from 'lodash.isequal'
import { ALL_INGREDIENTS } from '../Ingredient/queries'
import { ALL_FOODS } from '../Food/queries'
import { ALL_FOODPACKS } from '../FoodPack/queries'

const useUpdateCache = (collection, query, mode) => {
  const client = useApolloClient()

  const includedIn = (set, object) => set.map(i => i.id).includes(object.id)

  const updateCacheWith = (object, oldRefs) => {
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
                ? { ...i, usedInFoods: i.usedInFoods.concat(object) }
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
                ? { ...f, usedInFoodPacks: f.usedInFoodPacks.concat(object) }
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

            const { allFoodPacks } = client.readQuery({
              query: ALL_FOODPACKS,
            })
            const usedInFoodPacks = object.usedInFoodPacks.map(fp => fp.id)
            const foodPackData = allFoodPacks.map(fp =>
              usedInFoodPacks.includes(fp.id)
                ? { ...fp, foods: fp.foods.filter(f => f.id !== object.id) }
                : fp
            )
            client.writeQuery({
              query: ALL_FOODPACKS,
              data: {
                allFoodPacks: foodPackData,
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
          const food = object
          const oldIngredients = oldRefs
          const newIngredients = food.ingredients.map(i => i.item.id)
          if (!isEqual(oldIngredients, newIngredients)) {
            const setWithUniqueValues = new Set([
              ...oldIngredients,
              ...newIngredients,
            ])

            const { allIngredients } = client.readQuery({
              query: ALL_INGREDIENTS,
            })

            const uniqueIngredientFromCache = allIngredients.find(i =>
              setWithUniqueValues.has(i.id)
            )
            const notUpdatedYet = i => {
              if (oldIngredients.includes(i.id)) {
                return i.usedInFoods.map(f => f.id).includes(food.id)
              }
              return !i.usedInFoods.map(f => f.id).includes(food.id)
            }

            if (notUpdatedYet(uniqueIngredientFromCache)) {
              const ingredientsData = allIngredients.map(i => {
                if (setWithUniqueValues.has(i.id)) {
                  if (!newIngredients.includes(i.id)) {
                    return {
                      ...i,
                      usedInFoods: i.usedInFoods.filter(f => f.id !== food.id),
                    }
                  }
                  if (oldIngredients.includes(i.id)) {
                    return i
                  }
                  return { ...i, usedInFoods: i.usedInFoods.concat(food) }
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
        }
        if (collection === 'allFoodPacks') {
          const foodPack = object
          const oldFoods = oldRefs
          const newFoods = foodPack.foods.map(f => f.id)
          if (!isEqual(oldFoods, newFoods)) {
            const setWithUniqueValues = new Set([...oldFoods, ...newFoods])

            const { allFoods } = client.readQuery({
              query: ALL_FOODS,
            })

            const uniqueFoodFromCache = allFoods.find(f =>
              setWithUniqueValues.has(f.id)
            )
            const notUpdatedYet = i => {
              if (oldFoods.includes(i.id)) {
                return i.usedInFoodPacks.map(fp => fp.id).includes(foodPack.id)
              }
              return !i.usedInFoodPacks.map(fp => fp.id).includes(foodPack.id)
            }

            if (notUpdatedYet(uniqueFoodFromCache)) {
              const foodsData = allFoods.map(f => {
                if (setWithUniqueValues.has(f.id)) {
                  if (!newFoods.includes(f.id)) {
                    return {
                      ...f,
                      usedInFoodPacks: f.usedInFoodPacks.filter(
                        fp => fp.id !== foodPack.id
                      ),
                    }
                  }
                  if (oldFoods.includes(f.id)) {
                    return f
                  }
                  return {
                    ...f,
                    usedInFoodPacks: f.usedInFoodPacks.concat(foodPack),
                  }
                }
                return f
              })

              client.writeQuery({
                query: ALL_FOODS,
                data: {
                  allFoods: foodsData,
                },
              })
            }
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
