const Food = require('../models/Food')
const FoodPack = require('../models/FoodPack')

const allFoodPacks = (root, args) => {
  return FoodPack
    .find({ ...args.name && { name: args.name } })
    .populate({
      path: 'foods',
      populate: {
        path: 'ingredients.item'
      }
    })
    .catch(e => {
      console.log(
        `Error finding FoodPacks ${args.name ? 'with params' : ''}`,
        e.message
      )
    })
}

const addFoodPack = async (root, args) => {
  await new FoodPack({
    name: args.name,
    foods: args.foods,
  }).save()

  const foodPack = await FoodPack
    .findOne({ name: args.name })
    .populate({
      path: 'foods',
      populate: {
        path: 'ingredients.item'
      }
    })

  foodPack.foods
    .map(f => f.id)
    .forEach(async id => {
      try {
        const food = await Food.findOne({ _id: id })
        if (!food.usedInFoodPacks.includes(foodPack.id)) {
          food.usedInFoodPacks.push(foodPack.id)
        }
        food.save()
      } catch (e) {
        console.log('Error finding food in addFoodPack', e.message)
      }
    })

  return foodPack
}

const deleteFoodPack = async (root, args) => {
  try {
    const foodPack = await FoodPack.findOneAndDelete({ _id: args.id })
    foodPack.foods
      .map(async foodID => {
        const food = await Food.findOne({ _id: foodID })
        food.usedInFoodPacks = food.usedInFoodPacks
          .filter(
            fp => fp._id.toString() !== foodPack._id.toString()
          )
        await food.save()
      })
  } catch (e) {
    console.log('Error deleting FoodPack')
  }
  return 'FoodPack deleted succesfully'
}

const updateFoodPack = async (root, args) => {
  const foodPack = await FoodPack.findOne({ _id: args.id })
  const previousFoods = foodPack.foods.map(food => food.toString())
  let newFoods

  foodPack.name = args.name ? args.name : foodPack.name

  if (args.foods) {
    newFoods = args.foods
    foodPack.foods = newFoods
  }

  try {
    await foodPack.save()
  } catch (e) {
    console.log('Error updating foodPack: ', e.message)
  }

  if (args.foods) {
    for (i = 0; i < previousFoods.length; i++) {
      if (newFoods.includes(previousFoods[i])) {
        continue
      }
      try {
        const food = await Food.findOne({ _id: previousFoods[i] })
        food.usedInFoodPacks = food.usedInFoodPacks
          .filter(fp => fp._id.toString() !== foodPack._id.toString())
        await food.save()
      } catch (e) {
        console.log('Error finding Food in updateFoodPack: ', e.message)
      }
    }

    for (i = 0; i < newFoods.length; i++) {
      try {
        const food = await Food.findOne({ _id: newFoods[i] })
        if (!food.usedInFoodPacks.includes(foodPack._id)) {
          food.usedInFoodPacks.push(foodPack._id)
          await food.save()
        }
      } catch (e) {
        console.log('Error updating food\'s usedInFoodPacks in updateFoodPack', e.message)
      }
    }
  }

  return FoodPack
    .findOne({ _id: foodPack._id })
    .populate({
      path: 'foods',
      populate: {
        path: 'ingredients.item'
      }
    })
}

module.exports = {
  allFoodPacks,
  addFoodPack,
  deleteFoodPack,
  updateFoodPack
}