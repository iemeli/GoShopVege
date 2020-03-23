import { gql } from '@apollo/client'



export const ALL_INGREDIENTS = gql`
  query allIngredients ($name: String){
    allIngredients (name: $name) {
      id
      name
      price
      kcal
    }
  }
`

export const ALL_FOODS = gql`
  query allFoods ($name: String) {
    allFoods(name: $name) {
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
        }
      }
    }
  }
`

export const ALL_FOODPACKS = gql`
  query {
    allFoodPacks {
      id
      name
      price
      kcal
      foodsCount
      foods {
        id
        name  
      }
    }
  }
`
