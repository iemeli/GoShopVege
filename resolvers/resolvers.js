const Ingredient = require('../models/Ingredient')
const Food = require('../models/Food')
const FoodPack = require('../models/FoodPack')

const {
  allIngredients,
  addIngredient,
  deleteIngredient,
  updateIngredient,
  ingredientAdded,
} = require('./ingredient')
const {
  allFoods,
  addFood,
  deleteFood,
  updateFood,
  foodAdded,
} = require('./food')
const {
  allFoodPacks,
  addFoodPack,
  deleteFoodPack,
  updateFoodPack,
  foodPackAdded,
} = require('./foodPack')
const {
  allGroceryStores,
  addGroceryStore,
  deleteGroceryStore,
  updateGroceryStore,
} = require('./groceryStore')

const getField = (root, field, obj) => {
  //root = foodObject
  //field = 'priceRange'
  //obj = 'Food'

  if (obj === 'Food' && field === 'priceRange') {
    return root.ingredients.reduce(
      (sum, nextIngr) => ({
        min: sum.min + nextIngr.item.priceRange.min,
        max: sum.max + nextIngr.item.priceRange.max,
      }),
      { min: 0, max: 0 }
    )
  }
  return root.foods.reduce(
    (sum, nextFood) => sum + getField(nextFood, field, 'Food'),
    0
  )
}

const resolvers = {
  Query: {
    ingredientsCount: () => Ingredient.countDocuments(),
    allIngredients,
    foodsCount: () => Food.countDocuments(),
    allFoods,
    foodPacksCount: () => FoodPack.countDocuments(),
    allFoodPacks,
    allGroceryStores,
  },
  Mutation: {
    addIngredient,
    deleteIngredient,
    updateIngredient,
    addFood,
    deleteFood,
    updateFood,
    addFoodPack,
    deleteFoodPack,
    updateFoodPack,
    addGroceryStore,
    deleteGroceryStore,
    updateGroceryStore,
  },
  Subscription: {
    ingredientAdded,
    foodAdded,
    foodPackAdded,
  },
  Food: {
    priceRange: root => getField(root, 'priceRange', 'Food'),
    // kcal: root => getField(root, 'kcal', 'Food'),
    ingredientsCount: root => root.ingredients.length,
  },
  // FoodPack: {
  //   price: root => getField(root, 'price', 'FoodPack'),
  //   kcal: root => getField(root, 'kcal', 'FoodPack'),
  //   foodsCount: root => root.foods.length,
  // },
}

module.exports = resolvers
