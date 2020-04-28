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
        let newRefs
        let refQuery
        let refCollection
        let usedInObjects
        if (collection === 'allFoods') {
          newRefs = object.ingredients.map(i => i.item.id)
          refQuery = ALL_INGREDIENTS
          refCollection = 'allIngredients'
          usedInObjects = 'usedInFoods'
        }
        if (collection === 'allFoodPacks') {
          newRefs = object.foods.map(f => f.id)
          refQuery = ALL_FOODS
          refCollection = 'allFoods'
          usedInObjects = 'usedInFoodPacks'
        }

        if (!isEqual(oldRefs, newRefs)) {
          const setWithUniqueValues = new Set([...oldRefs, ...newRefs])

          const dataFromDB = client.readQuery({
            query: refQuery,
          })
          const refsFromDB = dataFromDB[refCollection]

          const uniqueRefObjectFromCache = refsFromDB.find(r =>
            setWithUniqueValues.has(r.id)
          )
          const notUpdatedYet = refObject => {
            if (oldRefs.includes(refObject.id)) {
              return refObject[usedInObjects].map(o => o.id).includes(object.id)
            }
            return !refObject[usedInObjects].map(o => o.id).includes(object.id)
          }

          if (notUpdatedYet(uniqueRefObjectFromCache)) {
            const data = refsFromDB.map(refObject => {
              if (setWithUniqueValues.has(refObject.id)) {
                if (!newRefs.includes(refObject.id)) {
                  return {
                    ...refObject,
                    [usedInObjects]: refObject[usedInObjects].filter(
                      o => o.id !== object.id
                    ),
                  }
                }
                if (oldRefs.includes(refObject.id)) {
                  return refObject
                }
                return {
                  ...refObject,
                  [usedInObjects]: refObject[usedInObjects].concat(object),
                }
              }
              return refObject
            })

            client.writeQuery({
              query: refQuery,
              data: {
                [refCollection]: data,
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
