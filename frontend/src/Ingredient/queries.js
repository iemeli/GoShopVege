import { gql } from '@apollo/client'

export const INGREDIENTS_DETAILS = gql`
  fragment IngredientsDetails on Ingredient {
    id
    name
    price
    kcal
  }
`

export const ALL_INGREDIENTS = gql`
  query allIngredients ($name: String){
    allIngredients (name: $name) {
      ...IngredientsDetails
    }
  }
  ${INGREDIENTS_DETAILS}
`

export const ADD_INGREDIENT = gql`
  mutation addIngredient(
    $name: String!
    $price: Float!
    $kcal: Int
  ) {
    addIngredient(
      name: $name
      price: $price
      kcal: $kcal
    ) {
      ...IngredientsDetails
    }
  }
  ${INGREDIENTS_DETAILS}
`
