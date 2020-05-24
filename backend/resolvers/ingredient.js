const Ingredient = require('../models/Ingredient')
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const allIngredients = async (root, args) => {
  try {
    let ingredients = await Ingredient.find({
      ...(args.name && { name: args.name }),
    })
      .populate('usedInFoods')
      .then(i => i.map(i => i.toObject()))
    return ingredients
  } catch (e) {
    console.log(
      `Error finding ingredients ${args.name ? 'with params' : ''}`,
      e.message
    )
  }
}

const addIngredient = async (root, args) => {
  let ingredientForDB
  Object.keys(args).forEach(key => {
    if (
      [
        'kcal',
        'fat',
        'saturatedFat',
        'carbs',
        'sugars',
        'protein',
        'salt',
      ].indexOf(key) > 1
    ) {
      ingredientForDB[key] = {
        total: args[key] * (args.weigth / 100),
        in100g: args[key],
        ...(args.pieces && {
          inOnePiece: (args[key] * (args.weight / 100)) / args.pieces,
        }),
      }
    } else {
      ingredientForDB[key] = args[key]
    }
  })
  const ingredient = await new Ingredient(ingredientForDB)
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

    const original = ingredient.toObject()

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
  try {
    console.log('täs args', args)
    const ingredient = await Ingredient.findOne({ _id: args.id })
    console.log('täs ingredient fresh from db', ingredient)
    Object.keys(args).forEach(key => {
      if (key !== 'price') {
        ingredient[key] = args[key]
      }
    })
    ingredient.price = args.price
      ? [...ingredient.price, ...args.price]
      : ingredient.price

    return (await ingredient.save()).toObject()
  } catch (e) {
    console.log(
      'Error updating ingredient in updateIngredient resolver: ',
      e.message
    )
  }
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
