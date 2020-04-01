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
    id: String!
  }

  type Query {
    ingredientsCount: Int!
    allIngredients(name: String): [Ingredient!]!
    foodsCount: Int!
    allFoods(name: String): [Food!]!
    foodPacksCount: Int!
    allFoodPacks(name: String): [FoodPack!]!
  }

  type Mutation {
    addIngredient(
      name: String!
      price: Float!
      kcal: Int
    ): Ingredient

    deleteIngredient(
      id: String!
    ): String!

    addFood(
      name: String!
      ingredients: [String!]!
      recipe: [String!]!
    ): Food
    
    deleteFood(
      id: String!
    ): String!

    addFoodPack(
      name: String!
      foods: [String!]!
    ): FoodPack

    deleteFoodPack(
      id: String!
    ): String!
  }

  type Subscription {
    ingredientAdded: Ingredient!
    foodAdded: Food!
  }
`

module.exports = typeDefs