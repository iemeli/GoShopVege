const { gql } = require('apollo-server')

const typeDefs = gql`
  type PriceRange {
    min: Float!
    max: Float!
  }

  type NutritionItem {
    name: String
    value: Float
  }

  type Ingredient {
    name: String!
    priceRange: PriceRange!
    brand: String!
    weight: Float!
    totalKcal: Float!
    kcal: Float!
    fat: Float!
    saturatedFat: Float!
    carbs: Float!
    sugars: Float!
    protein: Float!
    salt: Float!
    voluntary: NutritionItem
    usedInFoods: [Food!]!
    id: String!
  }

  type ValueUnit {
    value: Int!
    unit: String!
  }

  type FoodIngredient {
    item: Ingredient!
    amount: ValueUnit!
    id: String!
  }

  type Food {
    name: String!
    ingredients: [FoodIngredient!]!
    price: Float!
    kcal: Int!
    recipe: [String!]!
    ingredientsCount: Int!
    usedInFoodPacks: [FoodPack!]!
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
      price: [Float!]!
      brand: String!
      weight: Float!
      kcal: Float!
      fat: Float!
      saturatedFat: Float!
      carbs: Float!
      sugars: Float!
      protein: Float!
      salt: Float!
      voluntary: String
    ): Ingredient!

    deleteIngredient(id: String!): Ingredient!

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
      voluntary: String
    ): Ingredient!

    addFood(name: String!, ingredients: [String!]!, recipe: [String!]!): Food!

    deleteFood(id: String!): Food!

    updateFood(
      id: String!
      name: String
      ingredients: [String!]
      recipe: [String!]
    ): Food!

    addFoodPack(name: String!, foods: [String!]!): FoodPack!

    deleteFoodPack(id: String!): FoodPack!

    updateFoodPack(id: String!, name: String, foods: [String!]): FoodPack!
  }

  type Subscription {
    ingredientAdded: Ingredient!
    foodAdded: Food!
    foodPackAdded: FoodPack!
  }
`

module.exports = typeDefs
