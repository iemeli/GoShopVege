import { gql } from '@apollo/client'

const INGREDIENTS_DETAILS = gql`
  fragment IngredientsDetails on Ingredient {
    id
    name
    price
    kcal
  }
`

const FOOD_DETAILS = gql`
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
        ...IngredientsDetails
      }
    }
  }
  ${INGREDIENTS_DETAILS}
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

export const ALL_FOODS = gql`
  query allFoods ($name: String) {
    allFoods(name: $name) {
      ...FoodDetails
    }
  }
  ${FOOD_DETAILS}
`

export const ALL_FOODPACKS = gql`
  query {
    allFoodPacks {
      ...FoodPackDetails
    }
  }
  ${FOODPACK_DETAILS}
`

