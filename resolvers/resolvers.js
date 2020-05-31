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
  const unit = {
    PIECES: 'pieces',
    GRAMS: 'grams',
  }

  if (obj === 'Food') {
    if (field === 'priceRange') {
      return root.ingredients.reduce(
        (sum, nextIngr) => ({
          min: sum.min + nextIngr.item.priceRange.min,
          max: sum.max + nextIngr.item.priceRange.max,
        }),
        { min: 0, max: 0 }
      )
    } else {
      return root.ingredients.reduce((sum, nextIngr) => {
        if (nextIngr.pieces) {
          console.log(`
          nextIngr: ${nextIngr}
          nextIngr.item[field].inOnePiece: ${nextIngr.item[field].inOnePiece}
          nextIngr.pieces: ${nextIngr.pieces}
          
          `)
          return sum + nextIngr.item[field].inOnePiece * nextIngr.pieces
        }
        return sum + nextIngr.item[field].in100g * nextIngr.grams
      }, 0)
    }
  }

  if (field === 'priceRange') {
    return root.foods.reduce(
      (sum, nextFood) => ({
        min: sum.min + getField(nextFood, 'priceRange', 'Food').min,
        max: sum.max + getField(nextFood, 'priceRange', 'Food').max,
      }),
      { min: 0, max: 0 }
    )
  }

  return root.foods.reduce(
    (sum, nextFood) => sum + getField(nextFood, field, 'Food'),
    0
  )
}

const getInheritedStores = (children, parent) => {
  const stores = new Set()
  if (parent === 'Food') {
    children
      .map(i => i.item)
      .forEach(i => {
        i.foundInStores.forEach(store => stores.add(store))
      })
  } else {
    const foodStores = children.map(food =>
      getInheritedStores(food.ingredients, 'Food')
    )
    foodStores.forEach(fs => stores.add(...fs))
  }

  return [...stores]
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
    kcal: root => getField(root, 'kcal', 'Food'),
    fat: root => getField(root, 'fat', 'Food'),
    saturatedFat: root => getField(root, 'saturatedFat', 'Food'),
    carbs: root => getField(root, 'carbs', 'Food'),
    sugars: root => getField(root, 'sugars', 'Food'),
    protein: root => getField(root, 'protein', 'Food'),
    salt: root => getField(root, 'salt', 'Food'),
    ingredientsCount: root => root.ingredients.length,
    inheritedStores: root => getInheritedStores(root.ingredients, 'Food'),
  },
  FoodPack: {
    priceRange: root => getField(root, 'priceRange', 'FoodPack'),
    kcal: root => getField(root, 'kcal', 'FoodPack'),
    fat: root => getField(root, 'fat', 'FoodPack'),
    saturatedFat: root => getField(root, 'saturatedFat', 'FoodPack'),
    carbs: root => getField(root, 'carbs', 'FoodPack'),
    sugars: root => getField(root, 'sugars', 'FoodPack'),
    protein: root => getField(root, 'protein', 'FoodPack'),
    salt: root => getField(root, 'salt', 'FoodPack'),
    foodsCount: root => root.foods.length,
    inheritedStores: root => getInheritedStores(root.foods, 'FoodPack'),
  },
}

module.exports = resolvers
