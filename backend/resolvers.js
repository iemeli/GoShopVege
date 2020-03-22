const Ingredient = require('./models/Ingredient')
const Food = require('./models/Food')

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

    const kcal = foods[0].ingredients
      .reduce((sum, nextIng) => {
        if (nextIng.item.kcal) {
          return sum + nextIng.item.kcal
        }
        return sum
      }, 0)

    const price = foods[0].ingredients
      .reduce((sum, nextIng) => sum + nextIng.item.price, 0)

    foods[0].kcal = kcal
    foods[0].price = price

    return foods
  }
  try {
    foods = await Food
      .find()
      .populate('ingredients.item')
    return foods
  } catch (e) {
    console.log('Error finding foods', e.message)
  }
}

const addIngredient = (root, args) => {
  return new Ingredient({
    name: args.name,
    price: args.price,
    ...args.kcal && { kcal: args.kcal }
  }).save()
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

  const kcal = food.ingredients
    .reduce((sum, nextIng) => {
      if (nextIng.item.kcal) {
        return sum + nextIng.item.kcal
      }
      return sum
    }, 0)

  const price = food.ingredients
    .reduce((sum, nextIng) => sum + nextIng.item.price, 0)

  food.kcal = kcal
  food.price = price

  return food
}

const resolvers = {
  Query: {
    ingredientsCount: () => Ingredient.countDocuments(),
    allIngredients: () => Ingredient.find({}),
    foodsCount: () => Food.countDocuments(),
    allFoods: allFoods
  },
  Mutation: {
    addIngredient,
    addFood
  }
}

module.exports = resolvers