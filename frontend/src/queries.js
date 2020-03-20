import { gql } from '@apollo/client'

export const ALL_FOODS = gql`
  query {
    allFoods  {
      name
      price
      kiloCalories
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