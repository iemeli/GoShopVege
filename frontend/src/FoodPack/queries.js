import { gql } from '@apollo/client'

const FOODPACK_DETAILS = gql`
  fragment FoodPackDetails on FoodPack {
    id
    name
    price
    kcal
    foodsCount
    foods {
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
          id
          name
          price
          kcal
        }
      }
    }
  }
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
