import { gql } from '@apollo/client'

export const INGREDIENT_DETAILS = gql`
  fragment IngredientDetails on Ingredient {
    id
    name
    prices
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
  }
`

const INGREDIENT_DETAILS_WITH_REF = gql`
  fragment IngredientDetailsWithRef on Ingredient {
    usedInFoods {
      id
      name
    }
    ...IngredientDetails
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
  mutation addIngredient(
    $name: String!
    $prices: [Float!]
    $brand: String
    $pieces: Int
    $weight: Float
    $kcal: Float
    $fat: Float
    $saturatedFat: Float
    $carbs: Float
    $sugars: Float
    $protein: Float
    $salt: Float
  ) {
    addIngredient(
      name: $name
      prices: $prices
      pieces: $pieces
      brand: $brand
      weight: $weight
      kcal: $kcal
      fat: $fat
      saturatedFat: $saturatedFat
      carbs: $carbs
      sugars: $sugars
      protein: $protein
      salt: $salt
    ) {
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
  mutation deleteIngredient($id: ID!) {
    deleteIngredient(id: $id) {
      ...IngredientDetailsWithRef
    }
  }
  ${INGREDIENT_DETAILS_WITH_REF}
`

export const UPDATE_INGREDIENT = gql`
  mutation updateIngredient(
    $id: ID!
    $name: String!
    $prices: [Float!]
    $brand: String
    $pieces: Int
    $weight: Float
    $kcal: Float
    $fat: Float
    $saturatedFat: Float
    $carbs: Float
    $sugars: Float
    $protein: Float
    $salt: Float
  ) {
    updateIngredient(
      id: $id
      name: $name
      prices: $prices
      pieces: $pieces
      brand: $brand
      weight: $weight
      kcal: $kcal
      fat: $fat
      saturatedFat: $saturatedFat
      carbs: $carbs
      sugars: $sugars
      protein: $protein
      salt: $salt
    ) {
      ...IngredientDetailsWithRef
    }
  }
  ${INGREDIENT_DETAILS_WITH_REF}
`
