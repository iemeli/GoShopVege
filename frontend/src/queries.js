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