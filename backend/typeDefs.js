const { gql } = require('apollo-server')

const typeDefs = gql`
  type Ingredient {
    name: String!
    price: Float!
    kcal: Int
    id: String!
  }

  type Food {
    name: String!
    ingredients: [Ingredient!]!
    price: Float!
    kcal: Int
    recipe: [String!]!
    id: String!
  }

  type Query {
    ingredientsCount: Int!
    allIngredients: [Ingredient!]!
    foodsCount: Int!
    allFoods(name: String): [Food!]!
  }
`

module.exports = typeDefs