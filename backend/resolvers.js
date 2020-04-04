const Ingredient = require('./models/Ingredient')
const Food = require('./models/Food')
const FoodPack = require('./models/FoodPack')
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const getField = (root, field, obj) => {
  if (obj === 'Food') {
    return root.ingredients
      .reduce((sum, nextIng) => {
        if (nextIng.item[field]) {
          return sum + nextIng.item[field]
        }
        return sum
      }, 0)
  }
  return root.foods
    .reduce((sum, nextFood) =>
      sum + getField(nextFood, field, 'Food'), 0)
}

const getFoodIngredients = (ingr) => {
  return foodIngredients = ingr
    .map(i => i.split(';'))
    .map(i => ({
      usedAtOnce: Number(i[1]) === 0 ? false : true,
      item: i[0]
    }))
}

const allIngredients = (root, args) => {
  return Ingredient
    .find({ ...args.name && { name: args.name } })
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
    ...args.kcal && { kcal: args.kcal }
  })
    .save()
    .catch(e =>
      console.log(
        'Error adding ingredient in resolver addIngredient: ',
        e.message
      ))

  pubsub.publish('INGREDIENT_ADDED', { ingredientAdded: ingredient })

  return ingredient
}

const deleteIngredient = async (root, args) => {
  try {
    const ingredient = await Ingredient.findOneAndDelete(args.id)
    ingredient.usedInFoods
      .forEach(async foodID => {
        const food = await Food.findOne({ _id: foodID })
        food.ingredients = food.ingredients
          .filter(i =>
            i.item._id.toString() !== ingredient._id.toString()
          )
        await food.save()
      })
  } catch (e) {
    console.log('Error deleting Ingredient', e.message)
  }
  return 'Ingredient deleted succesfully'
}

const updateIngredient = async (root, args) => {
  const ingredient = await Ingredient.findOne({ _id: args.id })
  ingredient.name = args.name ? args.name : ingredient.name
  ingredient.price = args.price ? args.price : ingredient.price
  ingredient.kcal = args.kcal ? args.kcal : ingredient.kcal
  return await ingredient
    .save()
    .catch(e => {
      console.log('Error updating ingredient', e.message)
    })
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
    const food = await Food.findOneAndDelete(args.id)

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

  const foodPack = FoodPack
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
      const food = Food.findOne({ _id: id })
      if (!food.usedInFoodPacks.includes(foodPack.id)) {
        food.usedInFoodPacks.push(foodPack.id)
      }
      food.save()
    })

  return foodPack
}

const deleteFoodPack = async (root, args) => {
  try {
    const foodPack = await FoodPack.findOneAndDelete(args.id)
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
  const newFoods = args.foods
  console.log('previousFoods: ', previousFoods)
  console.log('newFoods: ', newFoods)
  foodPack.foods = newFoods

  try {
    await foodPack.save()
  } catch (e) {
    console.log('Error updating foodPack: ', e.message)
  }

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

  return FoodPack
    .findOne({ _id: foodPack._id })
    .populate({
      path: 'foods',
      populate: {
        path: 'ingredients.item'
      }
    })
}

const resolvers = {
  Query: {
    ingredientsCount: () => Ingredient.countDocuments(),
    allIngredients,
    foodsCount: () => Food.countDocuments(),
    allFoods,
    foodPacksCount: () => FoodPack.countDocuments(),
    allFoodPacks
  },
  Mutation: {
    addIngredient,
    deleteIngredient,
    updateIngredient,
    addFood,
    deleteFood,
    updateFood,
    addFoodPack,
    deleteFoodPack,
    updateFoodPack
  },
  Subscription: {
    ingredientAdded: {
      subscribe: () => pubsub.asyncIterator(['INGREDIENT_ADDED'])
    },
    foodAdded: {
      subscribe: () => pubsub.asyncIterator(['FOOD_ADDED'])
    }
  },
  Food: {
    price: (root) => getField(root, 'price', 'Food'),
    kcal: (root) => getField(root, 'kcal', 'Food'),
    ingredientsCount: (root) => root.ingredients.length
  },
  FoodPack: {
    price: (root) => getField(root, 'price', 'FoodPack'),
    kcal: (root) => getField(root, 'kcal', 'FoodPack'),
    foodsCount: (root) => root.foods.length
  }
}

module.exports = resolvers