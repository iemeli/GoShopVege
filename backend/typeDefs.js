const { gql } = require('apollo-server')

const typeDefs = gql`
  type Ingredient {
    name: String!
  }

  type Query {
    ingredientsCount: Int!
  }
`

module.exports = typeDefs