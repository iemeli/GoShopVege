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

const addIngredient = (root, args) => {
  const ingredient = new Ingredient({
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
        const food = await Food.findOne({_id: foodID})
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
  const foodIngredients = args.ingredients
    .map(i => i.split(';'))
    .map(i => ({
      usedAtOnce: Number(i[1]) === 0 ? false : true,
      item: i[0]
    }))

  await new Food({
    name: args.name,
    ingredients: foodIngredients,
    recipe: args.recipe
  }).save()

  const food = await Food
    .findOne({ name: args.name })
    .populate('ingredients.item')

  pubsub.publish('FOOD_ADDED', { foodAdded: food })

  return food
}

const deleteFood = async (root, args) => {
  try {
    const food = await Food.findOneAndDelete(args.id)
    
    food.usedInFoodPacks
      .forEach(async foodPackID => {
        const foodPack = await FoodPack.findOne({_id: foodPackID})
        foodPack.foods = foodPack.foods
          .filter(f =>
            f._id.toString() !== food._id.toString()  
          )
        await foodPack.save()
      })
    
    food.ingredients
      .map(i => i.item._id)
      .forEach(async i => {
        const ingredient = await Ingredient.findOne({_id: i})
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

  return FoodPack
    .findOne({ name: args.name })
    .populate({
      path: 'foods',
      populate: {
        path: 'ingredients.item'
      }
    })
}

const deleteFoodPack = async (root, args) => {
  try {
    const foodPack = await FoodPack.findOneAndDelete(args.id)
    foodPack.foods
      .map(async foodID => {
        const food = await Food.findOne({_id: foodID})
        console.log('täs food', food)
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
    addFood,
    deleteFood,
    addFoodPack,
    deleteFoodPack
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