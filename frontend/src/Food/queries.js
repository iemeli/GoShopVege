import { gql } from '@apollo/client'
import { INGREDIENT_DETAILS } from '../Ingredient/queries'

export const FOOD_DETAILS = gql`
  fragment FoodDetails on Food {
    id
    name
    priceRange {
      min
      max
    }
    recipe
    ingredients {
      item {
        ...IngredientDetails
      }
      pieces
      grams
      id
    }
  }
  ${INGREDIENT_DETAILS}
`

const FOOD_DETAILS_WITH_REF = gql`
  fragment FoodDetailsWithRef on Food {
    ...FoodDetails
    usedInFoodPacks {
      id
      name
    }
  }
  ${FOOD_DETAILS}
`

export const ALL_FOODS = gql`
  query allFoods($name: String) {
    allFoods(name: $name) {
      ...FoodDetailsWithRef
    }
  }
  ${FOOD_DETAILS_WITH_REF}
`

export const ADD_FOOD = gql`
  mutation addFood(
    $name: String!
    $ingredients: [String!]!
    $recipe: [String!]!
  ) {
    addFood(name: $name, ingredients: $ingredients, recipe: $recipe) {
      ...FoodDetailsWithRef
    }
  }
  ${FOOD_DETAILS_WITH_REF}
`

export const FOOD_ADDED = gql`
  subscription {
    foodAdded {
      ...FoodDetailsWithRef
    }
  }
  ${FOOD_DETAILS_WITH_REF}
`

export const DELETE_FOOD = gql`
  mutation deleteFood($id: ID!) {
    deleteFood(id: $id) {
      ...FoodDetailsWithRef
    }
  }
  ${FOOD_DETAILS_WITH_REF}
`

export const UPDATE_FOOD = gql`
  mutation updateFood(
    $id: ID!
    $name: String
    $ingredients: [String!]
    $recipe: [String!]
  ) {
    updateFood(
      id: $id
      name: $name
      ingredients: $ingredients
      recipe: $recipe
    ) {
      ...FoodDetailsWithRef
    }
  }
  ${FOOD_DETAILS_WITH_REF}
`
