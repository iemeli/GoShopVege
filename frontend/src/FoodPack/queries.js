import { gql } from '@apollo/client'
import { FOOD_DETAILS } from '../Food/queries'

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
  query {
    allFoodPacks {
      ...FoodPackDetails
    }
  }
  ${FOODPACK_DETAILS}
`