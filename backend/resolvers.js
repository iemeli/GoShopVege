const Ingredient = require('./models/Ingredient')

const resolvers = {
  Query: {
    ingredientsCount: () => Ingredient.collection.countDocuments()
  }
}

module.exports = resolvers