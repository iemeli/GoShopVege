const Ingredient = require('./models/Ingredient')
const Food = require('./models/Food')

const allFoods = async (root, args) => {
  let foods
  if (args.name) {
    try {
      foods = await Food
        .find({name: args.name})
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

const resolvers = {
  Query: {
    ingredientsCount: () => Ingredient.countDocuments(),
    allIngredients: () => Ingredient.find({}),
    foodsCount: () => Food.countDocuments(),
    allFoods: allFoods
  }
}

module.exports = resolvers