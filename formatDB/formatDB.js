const mongoose = require('mongoose')
const Ingredient = require('../models/Ingredient')
const Food = require('../models/Food')
const FoodPack = require('../models/FoodPack')
const GroceryStore = require('../models/GroceryStore')
const { ingredients, foods, foodPacks, groceryStores } = require('./dummyData')

require('dotenv').config()

mongoose.set('useFindAndModify', false)

const { MONGODB_URI } = process.env

console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(e => {
    console.log('error connection to MongoDB', e.message)
  })

const getIngredientForDB = args => {
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
    min: Math.min(...ingredientForDB.prices),
    max: Math.max(...ingredientForDB.prices),
  }

  ingredientForDB.foundInStores = []

  return ingredientForDB
}

const deleteAll = async () => {
  try {
    await Ingredient.deleteMany({})
    console.log('Ingredients deleted')
  } catch (e) {
    console.log('Error deleting ingredients', e.message)
  }
  try {
    await Food.deleteMany({})
    console.log('Foods deleted')
  } catch (e) {
    console.log('Error deleting foods', e.message)
  }
  try {
    await FoodPack.deleteMany({})
    console.log('FoodPacks deleted')
  } catch (e) {
    console.log('Error deleting FoodPacks')
  }
  try {
    await GroceryStore.deleteMany({})
    console.log('GroceryStores deleted')
  } catch (e) {
    console.log('Error deleting GroceryStores')
  }
}

const format = async () => {
  try {
    await deleteAll()

    try {
      const ingredientsForDB = ingredients.map(i => getIngredientForDB(i))
      console.log('Ingredientsfordb', ingredientsForDB)
      await Ingredient.insertMany(ingredientsForDB)
      console.log('Ingredients inserted')
    } catch (e) {
      console.log('Error inserting ingredients', e.message)
    }
    try {
      const ingredientsFromDB = await Ingredient.find({})
      const soijaNuudeli = foods[0]
      soijaNuudeli.ingredients.forEach(i => {
        const ingredientId = ingredientsFromDB.find(
          ingr => ingr.name === i.item
        ).id
        i.item = ingredientId
      })

      const aamiaisLeipa = foods[1]
      aamiaisLeipa.ingredients.forEach(i => {
        const ingredientId = ingredientsFromDB.find(
          ingr => ingr.name === i.item
        ).id
        i.item = ingredientId
      })

      const food1 = new Food(soijaNuudeli)
      const food2 = new Food(aamiaisLeipa)
      await food1.save()
      await food2.save()

      const soijaNuudeliFromDB = await Food.findOne({ name: soijaNuudeli.name })

      soijaNuudeliFromDB.ingredients
        .map(i => i.item.toString())
        .forEach(async ingrID => {
          try {
            const ingredient = await Ingredient.findOne({ _id: ingrID })
            ingredient.usedInFoods.push(soijaNuudeliFromDB.id)
            await ingredient.save()
          } catch (e) {
            console.log('Error putting foodrefs in ingredients', e.message)
          }
        })

      const aamiaisLeipaFromDB = await Food.findOne({ name: aamiaisLeipa.name })

      aamiaisLeipaFromDB.ingredients
        .map(i => i.item.toString())
        .forEach(async ingrID => {
          try {
            const ingredient = await Ingredient.findOne({ _id: ingrID })
            ingredient.usedInFoods.push(aamiaisLeipaFromDB.id)
            await ingredient.save()
          } catch (e) {
            console.log('Error putting foodrefs to ingredients', e.message)
          }
        })

      console.log('Foods inserted')
    } catch (e) {
      console.log('Error inserting foods', e.message)
    }
    try {
      const foodsFromDB = await Food.find({})

      const kurjatSetit = foodPacks[0]
      kurjatSetit.foods = kurjatSetit.foods.map(
        f => foodsFromDB.find(ffdb => ffdb.name === f).id
      )

      await new FoodPack(kurjatSetit).save()

      const foodPackFromDB = await FoodPack.findOne({})

      const foodPackID = foodPackFromDB.id

      await foodsFromDB.forEach(async f => {
        f.usedInFoodPacks.push(foodPackID)
        await f.save()
      })
      console.log('Foodpacks inserted')
    } catch (e) {
      console.log('Error inserting foodPacks', e.message)
    }
    try {
      const ingredientsFromDB = await Ingredient.find({})

      await new GroceryStore({
        name: groceryStores[0].name,
        ingredients: groceryStores[0].ingredients.map(
          i => ingredientsFromDB.find(ifdb => ifdb.name === i).id
        ),
      }).save()

      const gsFromDB = await GroceryStore.findOne({})

      gsFromDB.ingredients
        .map(i => i.toString())
        .forEach(async ingrdID => {
          try {
            console.log('täs ingrdId', ingr)
            const ingr = await Ingredient.findOne({ _id: ingrdID })
            ingr.foundInStores.push(gsFromDB.id)
            await ingr.save()
          } catch (e) {
            console.log('Error putting GS-refs to ingredients')
          }
        })
      console.log('GroceryStores inserted')
    } catch (e) {
      console.log('Error inserting Grocery Stores')
    }
  } catch (e) {
    console.log('Something wrong in format()', e.message)
  } finally {
    mongoose.connection.close()
  }
}

format()
