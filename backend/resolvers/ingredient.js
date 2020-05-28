const { PubSub } = require('apollo-server')
const Ingredient = require('../models/Ingredient')

const pubsub = new PubSub()

const allIngredients = async (root, args) => {
  try {
    const ingredients = await Ingredient.find({
      ...(args.name && { name: args.name }),
    }).populate('usedInFoods')
    return ingredients
  } catch (e) {
    console.log(
      `Error finding ingredients ${args.name ? 'with params' : ''}`,
      e.message
    )
  }
}

const addIngredient = async (root, args) => {
  const ingredientForDB = {}
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
      ].indexOf(key) > -1
    ) {
      ingredientForDB[key] = {
        total: Number((args[key] * (args.weight / 100)).toFixed(1)),
        in100g: args[key],
        ...(args.pieces && {
          inOnePiece: Number(
            ((args[key] * (args.weight / 100)) / args.pieces).toFixed(1)
          ),
        }),
      }
    } else {
      ingredientForDB[key] = args[key]
    }
  })

  ingredientForDB.priceRange = {
    min: Math.min(...args.prices),
    max: Math.max(...args.prices),
  }

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
    const ingredient = await Ingredient.findOne({ _id: args.id }).populate(
      'usedInFoods'
    )
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
        ].indexOf(key) > -1
      ) {
        ingredient[key] = {
          total: Number((args[key] * (args.weight / 100)).toFixed(1)),
          in100g: args[key],
          ...(args.pieces && {
            inOnePiece: Number(
              ((args[key] * (args.weight / 100)) / args.pieces).toFixed(1)
            ),
          }),
        }
      } else if (key !== 'prices') {
        ingredient[key] = args[key]
      }
    })

    ingredient.prices = args.prices

    const returnThis = (await ingredient.save()).toObject()
    console.log('huuu', returnThis)

    return returnThis
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
