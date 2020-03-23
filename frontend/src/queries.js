import { gql } from '@apollo/client'

export const ALL_FOODS = gql`
  query allFoods ($name: String) {
    allFoods(name: $name) {
      name
      price
      kcal
      recipe
      id
      ingredients {
        usedAtOnce
        item {
          name
          id
        }
        id
      }
    }
  }
`

export const ALL_INGREDIENTS = gql`
  query allIngredients ($name: String){
    allIngredients (name: $name) {
      name
      price
      kcal
      id
    }
  }
`