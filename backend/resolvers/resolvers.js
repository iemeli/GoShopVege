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

const getField = (root, field, obj) => {
  if (obj === 'Food') {
    return root.ingredients.reduce((sum, nextIng) => {
      if (nextIng.item[field]) {
        return sum + nextIng.item[field]
      }
      return sum
    }, 0)
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
  },
  Subscription: {
    ingredientAdded,
    foodAdded,
    foodPackAdded,
  },
  // Food: {
  //   price: root => getField(root, 'price', 'Food'),
  //   kcal: root => getField(root, 'kcal', 'Food'),
  //   ingredientsCount: root => root.ingredients.length,
  // },
  FoodPack: {
    price: root => getField(root, 'price', 'FoodPack'),
    kcal: root => getField(root, 'kcal', 'FoodPack'),
    foodsCount: root => root.foods.length,
  },
}

module.exports = resolvers
