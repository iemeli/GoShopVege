const { gql } = require('apollo-server')

const typeDefs = gql`
  type Ingredient {
    name: String!
    price: Float!
    kiloCalories: Int
    id: String!
  }

  type Food {
    name: String!
    ingredients: [Ingredient!]!
    price: Float!
    kiloCalories: Int
    recipe: [String!]!
    id: String!
  }

  type Query {
    ingredientsCount: Int!
    allIngredients: [Ingredient!]!

    foodsCount: Int!
    allFoods: [Food!]!
  }
`

module.exports = typeDefs