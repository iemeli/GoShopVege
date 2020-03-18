const { gql } = require('apollo-server')

const typeDefs = gql`
  type Ingredient {
    name: String!
  }
`

module.exports = typeDefs