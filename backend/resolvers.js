const Ingredient = require('./models/Ingredient')
const Food = require('./models/Food')

const resolvers = {
  Query: {
    ingredientsCount: () => Ingredient.countDocuments(),
    allIngredients: () => Ingredient.find({}),
    foodsCount: () => Food.countDocuments(),
    allFoods: () => Food.find({}).populate('ingredients')
  }
}

module.exports = resolvers