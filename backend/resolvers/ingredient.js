const Ingredient = require('../models/Ingredient')
const Food = require('../models/Food')
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const allIngredients = (root, args) => {
  return Ingredient.find({ ...(args.name && { name: args.name }) })
    .populate('usedInFoods')
    .catch(e => {
      console.log(
        `Error finding ingredients ${args.name ? 'with params' : ''}`,
        e.message
      )
    })
}

const addIngredient = async (root, args) => {
  const ingredient = await new Ingredient({
    name: args.name,
    price: args.price,
    ...(args.kcal && { kcal: args.kcal }),
  })
    .save()
    .catch(e =>
      console.log(
        'Error adding ingredient in resolver addIngredient: ',
        e.message
      )
    )

  pubsub.publish('INGREDIENT_ADDED', { ingredientAdded: ingredient })

  return ingredient
}

const deleteIngredient = async (root, args) => {
  try {
    const ingredient = await Ingredient.findOneAndDelete({
      _id: args.id,
    }).populate('usedInFoods')

    console.log('täs ingredient', ingredient)
    const original = ingredient.toObject()
    console.log('täs original', original)
    ingredient.usedInFoods.forEach(async food => {
      food.ingredients = food.ingredients.filter(
        i => i.item.toString() !== ingredient.id
      )
      await food.save()
    })

    return original
  } catch (e) {
    return console.log('Error deleting Ingredient', e.message)
  }
}

const updateIngredient = async (root, args) => {
  const ingredient = await Ingredient.findOne({ _id: args.id })
  ingredient.name = args.name ? args.name : ingredient.name
  ingredient.price = args.price ? args.price : ingredient.price
  ingredient.kcal = args.kcal
  return await ingredient.save().catch(e => {
    console.log('Error updating ingredient', e.message)
  })
}

const ingredientAdded = {
  subscribe: () => pubsub.asyncIterator(['INGREDIENT_ADDED']),
}

module.exports = {
  allIngredients,
  addIngredient,
  deleteIngredient,
  updateIngredient,
  ingredientAdded,
}
