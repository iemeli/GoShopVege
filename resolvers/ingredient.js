const { PubSub } = require('apollo-server')
const isEqual = require('lodash.isequal')
const Ingredient = require('../models/Ingredient')
const GroceryStore = require('../models/GroceryStore')
const pubsub = new PubSub()

const allIngredients = async (root, args) => {
  try {
    const ingredients = await Ingredient.find({
      ...(args.name && { name: args.name }),
    })
      .populate('usedInFoods')
      .populate('foundInStores')
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

  await new Ingredient(ingredientForDB)
    .save()
    .catch(e =>
      console.log(
        'Error adding ingredient in resolver addIngredient: ',
        e.message
      )
    )

  const ingredient = await Ingredient.findOne({ name: args.name }).populate(
    'foundInStores'
  )

  ingredient.foundInStores.forEach(async store => {
    store.ingredients.push(ingredient.id)
    await store.save()
  })

  pubsub.publish('INGREDIENT_ADDED', {
    ingredientAdded: ingredient,
  })

  return ingredient
}

const deleteIngredient = async (root, args) => {
  try {
    const ingredient = await Ingredient.findOneAndDelete({
      _id: args.id,
    })
      .populate('usedInFoods')
      .populate('foundInStores')

    const original = ingredient.toObject()

    ingredient.usedInFoods.forEach(async food => {
      food.ingredients = food.ingredients.filter(
        i => i.item.toString() !== ingredient.id
      )
      await food.save()
    })

    ingredient.foundInStores.forEach(async store => {
      store.ingredients = store.ingredients.filter(
        i => i.toString() !== ingredient.id
      )
      await store.save()
    })

    return original
  } catch (e) {
    return console.log('Error deleting Ingredient', e.message)
  }
}

const updateIngredient = async (root, args) => {
  try {
    const ingredient = await Ingredient.findOne({ _id: args.id }).populate(
      'foundInStores'
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
      } else if (key !== 'prices' && key !== 'foundInStores') {
        ingredient[key] = args[key]
      }
    })
    if (args.prices) {
      ingredient.prices = args.prices
    }

    if (args.foundInStores !== null) {
      ingredient.foundInStores.forEach(async store => {
        store.ingredients = store.ingredients.filter(
          i => i.toString() !== ingredient.id
        )
        await store.save()
      })

      ingredient.foundInStores = args.foundInStores

      const groceryStores = await GroceryStore.find({})

      groceryStores.forEach(async store => {
        if (args.foundInStores.includes(store.id.toString())) {
          store.ingredients.push(ingredient.id)
          await store.save()
        }
      })
    }

    const updatedIngredient = (await ingredient.save()).toObject()

    return updatedIngredient
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
