import { gql } from '@apollo/client'

export const INGREDIENT_DETAILS = gql`
  fragment IngredientDetails on Ingredient {
    name
    priceRange {
      min
      max
    }
    brand
    weight
    totalKcal
    kcal
    fat
    saturatedFat
    carbs
    sugars
    protein
    salt
    voluntary {
      name
      value
    }
    id
  }
`

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
    usedInFoodPacks {
      id
      name
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
    deleteFood(id: $id) {
      ...FoodDetails
    }
  }
  ${FOOD_DETAILS}
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
