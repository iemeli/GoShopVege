import { gql } from '@apollo/client'

export const INGREDIENT_DETAILS = gql`
  fragment IngredientDetails on Ingredient {
    id
    name
    price
    kcal
    usedInFoods {
      id
      name
    }
  }
`

export const ALL_INGREDIENTS = gql`
  query allIngredients($name: String) {
    allIngredients(name: $name) {
      ...IngredientDetails
    }
  }
  ${INGREDIENT_DETAILS}
`

export const ADD_INGREDIENT = gql`
  mutation addIngredient($name: String!, $price: Float!, $kcal: Int) {
    addIngredient(name: $name, price: $price, kcal: $kcal) {
      ...IngredientDetails
    }
  }
  ${INGREDIENT_DETAILS}
`

export const INGREDIENT_ADDED = gql`
  subscription {
    ingredientAdded {
      ...IngredientDetails
    }
  }
  ${INGREDIENT_DETAILS}
`

export const DELETE_INGREDIENT = gql`
  mutation deleteIngredient($id: String!) {
    deleteIngredient(id: $id) {
      ...IngredientDetails
    }
  }
  ${INGREDIENT_DETAILS}
`

export const UPDATE_INGREDIENT = gql`
  mutation updateIngredient(
    $id: String!
    $name: String
    $price: Float
    $kcal: Int
  ) {
    updateIngredient(id: $id, name: $name, price: $price, kcal: $kcal) {
      ...IngredientDetails
    }
  }
  ${INGREDIENT_DETAILS}
`
