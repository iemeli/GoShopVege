import { gql } from '@apollo/client'

const INGR_DETAILS = gql`
  fragment IngrDetails on Ingredient {
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
        ...IngrDetails
      }
    }
  }
  ${INGR_DETAILS}
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
      ...IngrDetails
    }
  }
  ${INGR_DETAILS}
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
