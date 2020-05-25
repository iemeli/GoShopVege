import { gql } from '@apollo/client'

export const INGREDIENT_DETAILS = gql`
  fragment IngredientDetails on Ingredient {
    name
    priceRange {
      min
      max
    }
    pieces
    brand
    weight
    kcal {
      total
      inOnePiece
      in100g
    }
    fat {
      total
      inOnePiece
      in100g
    }
    saturatedFat {
      total
      inOnePiece
      in100g
    }
    carbs {
      total
      inOnePiece
      in100g
    }
    sugars {
      total
      inOnePiece
      in100g
    }
    protein {
      total
      inOnePiece
      in100g
    }
    salt {
      total
      inOnePiece
      in100g
    }
    id
  }
`

const INGREDIENT_DETAILS_WITH_REF = gql`
  fragment IngredientDetailsWithRef on Ingredient {
    ...IngredientDetails
    usedInFoods {
      id
      name
    }
  }
  ${INGREDIENT_DETAILS}
`

export const ALL_INGREDIENTS = gql`
  query allIngredients($name: String) {
    allIngredients(name: $name) {
      ...IngredientDetailsWithRef
    }
  }
  ${INGREDIENT_DETAILS_WITH_REF}
`

export const ADD_INGREDIENT = gql`
  mutation addIngredient($name: String!, $price: Float!, $kcal: Int) {
    addIngredient(name: $name, price: $price, kcal: $kcal) {
      ...IngredientDetailsWithRef
    }
  }
  ${INGREDIENT_DETAILS_WITH_REF}
`

export const INGREDIENT_ADDED = gql`
  subscription {
    ingredientAdded {
      ...IngredientDetailsWithRef
    }
  }
  ${INGREDIENT_DETAILS_WITH_REF}
`

export const DELETE_INGREDIENT = gql`
  mutation deleteIngredient($id: String!) {
    deleteIngredient(id: $id) {
      ...IngredientDetailsWithRef
    }
  }
  ${INGREDIENT_DETAILS_WITH_REF}
`

export const UPDATE_INGREDIENT = gql`
  mutation updateIngredient(
    $id: String!
    $name: String
    $price: Float
    $kcal: Int
  ) {
    updateIngredient(id: $id, name: $name, price: $price, kcal: $kcal) {
      ...IngredientDetailsWithRef
    }
  }
  ${INGREDIENT_DETAILS_WITH_REF}
`
