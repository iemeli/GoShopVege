const Ingredient = require('./models/Ingredient')
const Food = require('./models/Food')
const FoodPack = require('./models/FoodPack')

const getField = (root, field, obj) => {
  if (obj === 'Food') {
    return root.ingredients
    .reduce((sum, nextIng) => {
      if (nextIng.item[field]) {
        return sum + nextIng.item[field]
      }
      return sum
    }, 0)
  }
  return root.foods
    .reduce((sum, nextFood) => 
      sum + getField(nextFood, field, 'Food'), 0)
}

const allIngredients = async (root, args) => {
  let ingredients
  if (args.name) {
    try {
      ingredients = await Ingredient.find({ name: args.name })
    } catch (e) {
      console.log('Error finding ingredient with params: ', e.message)
    }
    return ingredients
  }
  try {
    ingredients = await Ingredient.find()
  } catch (e) {
    console.log('Error finding ingredients', e.message)
  }
  return ingredients
}

const addIngredient = (root, args) => {
  return new Ingredient({
    name: args.name,
    price: args.price,
    ...args.kcal && { kcal: args.kcal }
  }).save()
}

const allFoods = async (root, args) => {
  let foods
  if (args.name) {
    try {
      foods = await Food
        .find({ name: args.name })
        .populate('ingredients.item')
    } catch (e) {
      console.log('Error finding food with params: ', e.message)
    }
    return foods
  }
  try {
    foods = await Food
      .find()
      .populate('ingredients.item')
  } catch (e) {
    console.log('Error finding foods', e.message)
  }
  return foods
}

const addFood = async (root, args) => {
  const foodIngredients = args.ingredients
    .map(i => i.split(';'))
    .map(i => ({
      usedAtOnce: i[1] === 0 ? false: true,
      item: i[0]
    }))

  await new Food({
    name: args.name,
    ingredients: foodIngredients,
    recipe: args.recipe
  }).save()

  const food = await Food
    .findOne({ name: args.name })
    .populate('ingredients.item')

  return food
}

const allFoodPacks = async (root, args) => {
  try { 
    const foodPacks = await FoodPack.find({}).populate({
      path: 'foods',
      populate: {
        path: 'ingredients.item'
      }
    })
    return foodPacks
  }
  catch (e) {'Error finding all FoodPacks', e.message}
}

const resolvers = {
  Query: {
    ingredientsCount: () => Ingredient.countDocuments(),
    allIngredients: allIngredients,
    foodsCount: () => Food.countDocuments(),
    allFoods: allFoods,
    foodPacksCount: () => FoodPack.countDocuments(),
    allFoodPacks: allFoodPacks
  },
  Mutation: {
    addIngredient,
    addFood
  },
  Food: {
    price: (root) => getField(root, 'price', 'Food'),
    kcal: (root) => getField(root, 'kcal', 'Food'),
    ingredientsCount: (root) => root.ingredients.length
  },
  FoodPack: {
    price: (root) => getField(root, 'price', 'FoodPack'),
    kcal: (root) => getField(root, 'kcal', 'FoodPack'),
    foodsCount: (root) => root.foods.length
  }
}

module.exports = resolvers