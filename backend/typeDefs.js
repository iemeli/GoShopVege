const { gql } = require('apollo-server')

const typeDefs = gql`
  type PriceRange {
    min: Float!
    max: Float!
  }

  type Macro {
    total: Float!
    inOnePiece: Float!
    in100g: Float!
  }

  type Ingredient {
    name: String!
    priceRange: PriceRange
    pieces: Int
    brand: String
    weight: Float
    kcal: Macro
    fat: Macro
    saturatedFat: Macro
    carbs: Macro
    sugars: Macro
    protein: Macro
    salt: Macro
    usedInFoods: [Food!]!
    id: ID!
  }

  type FoodIngredient {
    item: Ingredient!
    pieces: Int
    grams: Float
    id: ID!
  }

  type Food {
    name: String!
    recipe: [String!]!
    ingredientsCount: Int!
    usedInFoodPacks: [FoodPack!]!
    ingredients: [FoodIngredient!]!
    priceRange: PriceRange!
    totalKcal: Float!

    id: ID!
  }

  type FoodPack {
    name: String!
    priceRange: PriceRange!
    kcal: Int!
    foods: [Food!]!
    foodsCount: Int!
    id: ID!
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
      price: [Float!]
      pieces: Int
      brand: String
      weight: Float
      kcal: Float
      fat: Float
      saturatedFat: Float
      carbs: Float
      sugars: Float
      protein: Float
      salt: Float
    ): Ingredient!

    deleteIngredient(id: ID!): Ingredient!

    updateIngredient(
      id: ID!
      name: String
      price: [Float!]
      brand: String
      weight: Float
      kcal: Float
      fat: Float
      saturatedFat: Float
      carbs: Float
      sugars: Float
      protein: Float
      salt: Float
    ): Ingredient!

    addFood(name: String!, ingredients: [String!]!, recipe: [String!]!): Food!

    deleteFood(id: ID!): Food!

    updateFood(
      id: ID!
      name: String
      ingredients: [String!]
      recipe: [String!]
    ): Food!

    addFoodPack(name: String!, foods: [String!]!): FoodPack!

    deleteFoodPack(id: ID!): FoodPack!

    updateFoodPack(id: ID!, name: String, foods: [String!]): FoodPack!
  }

  type Subscription {
    ingredientAdded: Ingredient!
    foodAdded: Food!
    foodPackAdded: FoodPack!
  }
`

module.exports = typeDefs
