import { gql } from '@apollo/client'
import { INGREDIENT_DETAILS } from '../Ingredient/queries'

export const FOOD_DETAILS = gql`
  fragment FoodDetails on Food {
    id
    name
    price
    kcal
    recipe
    ingredientsCount
    ingredients {
      id
      usedAtOnce
      item {
        ...IngredientDetails
      }
    }
  }
  ${INGREDIENT_DETAILS}
`

export const ALL_FOODS = gql`
  query allFoods($name: String) {
    allFoods(name: $name) {
      ...FoodDetails
    }
  }
  ${FOOD_DETAILS}
`

export const ADD_FOOD = gql`
  mutation addFood(
    $name: String!
    $ingredients: [String!]!
    $recipe: [String!]!
  ) {
    addFood(name: $name, ingredients: $ingredients, recipe: $recipe) {
      ...FoodDetails
    }
  }
  ${FOOD_DETAILS}
`

export const FOOD_ADDED = gql`
  subscription {
    foodAdded {
      ...FoodDetails
    }
  }
  ${FOOD_DETAILS}
`

export const DELETE_FOOD = gql`
  mutation deleteFood($id: String!) {
    deleteFood(id: $id)
  }
`

export const UPDATE_FOOD = gql`
  mutation updateFood(
    $id: String!
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
      ...FoodDetails
    }
  }
  ${FOOD_DETAILS}
`
