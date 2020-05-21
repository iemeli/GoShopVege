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
  }
  ${INGREDIENT_DETAILS}
`

const FOODPACK_DETAILS = gql`
  fragment FoodPackDetails on FoodPack {
    id
    name
    price
    kcal
    foodsCount
    foods {
      ...FoodDetails
    }
  }
  ${FOOD_DETAILS}
`

export const ALL_FOODPACKS = gql`
  query allFoodPacks($name: String) {
    allFoodPacks(name: $name) {
      ...FoodPackDetails
    }
  }
  ${FOODPACK_DETAILS}
`

export const ADD_FOODPACK = gql`
  mutation addFoodPack($name: String!, $foods: [String!]!) {
    addFoodPack(name: $name, foods: $foods) {
      ...FoodPackDetails
    }
  }
  ${FOODPACK_DETAILS}
`

export const DELETE_FOODPACK = gql`
  mutation deleteFoodPack($id: String!) {
    deleteFoodPack(id: $id) {
      ...FoodPackDetails
    }
  }
  ${FOODPACK_DETAILS}
`

export const UPDATE_FOODPACK = gql`
  mutation updateFoodPack($id: String!, $name: String, $foods: [String!]) {
    updateFoodPack(id: $id, name: $name, foods: $foods) {
      ...FoodPackDetails
    }
  }
  ${FOODPACK_DETAILS}
`
