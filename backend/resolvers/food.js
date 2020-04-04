const Ingredient = require('../models/Ingredient')
const Food = require('../models/Food')
const FoodPack = require('../models/FoodPack')
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const getFoodIngredients = (ingr) => {
  return foodIngredients = ingr
    .map(i => i.split(';'))
    .map(i => ({
      usedAtOnce: Number(i[1]) === 0 ? false : true,
      item: i[0]
    }))
}

const allFoods = (root, args) => {
  return Food
    .find({ ...args.name && { name: args.name } })
    .populate('ingredients.item')
    .populate('usedInFoodPacks')
    .catch(e => {
      console.log(
        `Error finding foods ${args.name ? 'with params' : ''}`,
        e.message
      )
    })
}

const addFood = async (root, args) => {
  await new Food({
    name: args.name,
    ingredients: getFoodIngredients(args.ingredients),
    recipe: args.recipe
  }).save()

  const food = await Food
    .findOne({ name: args.name })
    .populate('ingredients.item')

  food.ingredients
    .map(i => i.item.id)
    .forEach(async id => {
      const ingredient = await Ingredient.findOne({ _id: id })
      if (!ingredient.usedInFoods.includes(food._id)) {
        ingredient.usedInFoods.push(food._id)
      }
      await ingredient.save()
    })

  pubsub.publish('FOOD_ADDED', { foodAdded: food })

  return food
}

const deleteFood = async (root, args) => {
  try {
    const food = await Food.findOneAndDelete({ _id: args.id })

    food.usedInFoodPacks
      .forEach(async foodPackID => {
        const foodPack = await FoodPack.findOne({ _id: foodPackID })
        foodPack.foods = foodPack.foods
          .filter(f =>
            f._id.toString() !== food._id.toString()
          )
        await foodPack.save()
      })

    food.ingredients
      .map(i => i.item._id)
      .forEach(async i => {
        const ingredient = await Ingredient.findOne({ _id: i })
        ingredient.usedInFoods = ingredient.usedInFoods
          .filter(f =>
            f._id.toString() !== food._id.toString()
          )
        await ingredient.save()
      })
  } catch (e) {
    console.log('Error deleting Food', e.message)
  }
  return 'Food deleted succesfully'
}

const updateFood = async (root, args) => {
  const food = await Food.findOne({ _id: args.id })
  food.name = args.name ? args.name : food.name
  food.recipe = args.recipe ? args.recipe : food.recipe

  let newIngredients
  let previousIngredients = food.ingredients.map(i => i.item.toString())

  if (args.ingredients) {
    newIngredients = getFoodIngredients(args.ingredients)
    food.ingredients = newIngredients
  }

  try {
    await food.save()
  } catch (e) {
    console.log('Error saving food in updateFood: ', e.message)
  }

  if (args.ingredients) {
    const newIngredientsItems = newIngredients.map(i => i.item)

    for (i = 0; i < previousIngredients.length; i++) {
      if (newIngredientsItems.includes(previousIngredients[i])) {
        continue
      }
      try {
        const ingr = await Ingredient.
          findOne({ _id: previousIngredients[i] })
        ingr.usedInFoods = ingr.usedInFoods
          .filter(f => f.toString() !== food._id.toString())
        await ingr.save()
      }
      catch (e) {
        console.log('Error finding Ingredient in updateFood: ', e.message)
      }
    }

    for (i = 0; i < newIngredientsItems.length; i++) {
      if (previousIngredients.includes(newIngredientsItems[i])) {
        continue
      }
      try {
        const ingr = await Ingredient.findOne({ _id: newIngredientsItems[i] })
        ingr.usedInFoods.push(food._id)
        await ingr.save()
      } catch (e) {
        console.log('Error finding Ingredient', e.message)
      }
    }
  }

  return Food.findOne({ _id: food._id }).populate('ingredients.item')
}

const foodAdded = {
  subscribe: () => pubsub.asyncIterator(['FOOD_ADDED'])
}

module.exports = {
  allFoods,
  addFood,
  deleteFood,
  updateFood,
  foodAdded
}