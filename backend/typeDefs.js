const { gql } = require('apollo-server')

const typeDefs = gql`
  type Ingredient {
    name: String!
    price: Float!
    kiloCalories: Int
  }

  type Food {
    ingredients: [Ingredient!]!
    price: Float!
    kiloCalories: Int
  }

  type Query {
    ingredientsCount: Int!
    allIngredients: [Ingredient!]!

    foodsCount: Int!
    allFoods: [Food!]!
  }
`

module.exports = typeDefs