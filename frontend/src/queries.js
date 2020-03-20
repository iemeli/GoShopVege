import { gql } from '@apollo/client'

export const ALL_FOODS = gql`
  query {
    allFoods  {
      name
      price
      kiloCalories
      recipe
      id
      ingredients {
        name
        id
      }
    }
  }
`

export const ALL_INGREDIENTS = gql`
  query {
    allIngredients {
      name
      price
      kiloCalories
      id
    }
  }
`