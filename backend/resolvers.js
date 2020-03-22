const Ingredient = require('./models/Ingredient')
const Food = require('./models/Food')

const resolvers = {
  Query: {
    ingredientsCount: () => Ingredient.countDocuments(),
    allIngredients: () => Ingredient.find({}),
    foodsCount: () => Food.countDocuments(),
    allFoods: async (root, args) => {
      let foods
      if (args.name) {
        try {
          foods = await Food
            .find({name: args.name})
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
        return foods
      } catch (e) {
        console.log('Error finding foods', e.message)
      }
    }
  }
}

module.exports = resolvers