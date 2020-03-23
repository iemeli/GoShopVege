const { gql } = require('apollo-server')

const typeDefs = gql`
  type Ingredient {
    name: String!
    price: Float!
    kcal: Int
    id: String!
  }

  type FoodIngredient {
    item: Ingredient!
    usedAtOnce: Boolean!
    id: String!
  }

  type Food {
    name: String!
    ingredients: [FoodIngredient!]!
    price: Float!
    kcal: Int!
    recipe: [String!]!
    ingredientsCount: Int!
    id: String!
  }

  type FoodPack {
    name: String!
    price: Float!
    kcal: Int!
    foods: [Food!]!
    foodsCount: Int!
  }

  type Query {
    ingredientsCount: Int!
    allIngredients: [Ingredient!]!
    foodsCount: Int!
    allFoods(name: String): [Food!]!
    foodPacksCount: Int!
    allFoodPacks: [FoodPack!]!
  }

  type Mutation {
    addIngredient(
      name: String!
      price: Float!
      kcal: Int
    ): Ingredient
    addFood(
      name: String!
      ingredients: [String!]!
      recipe: [String!]!
    ): Food
  }
`

module.exports = typeDefs