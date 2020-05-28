const mongoose = require('mongoose')
const Ingredient = require('../models/Ingredient')
const Food = require('../models/Food')
const FoodPack = require('../models/FoodPack')
const { ingredients, foods } = require('./dummyData')
require('dotenv').config()

console.log(process.env.MONGODB_URI)

mongoose.set('useFindAndModify', false)

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(e => {
    console.log('error connection to MongoDB', e.message)
  })

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
}

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

  return ingredientForDB
}

const format = async () => {
  await deleteAll()

  try {
    const ingredientsForDB = ingredients.map(i => getIngredientForDB(i))

    await Ingredient.insertMany(ingredientsForDB)
    console.log('Ingredients inserted')
  } catch (e) {
    console.log('Error inserting ingredients', e.message)
  }
  try {
    const ingredientsFromDB = await Ingredient.find({})
    const soijaNuudeli = foods[0]
    soijaNuudeli.ingredients.forEach(i => {
      const ingredientId = ingredientsFromDB.find(ingr => ingr.name === i.item)
        .id
      i.item = ingredientId
    })

    const aamiaisLeipa = foods[1]
    aamiaisLeipa.ingredients.forEach(i => {
      const ingredientId = ingredientsFromDB.find(ingr => ingr.name === i.item)
        .id
      i.item = ingredientId
    })

    const food1 = new Food(soijaNuudeli)
    const food2 = new Food(aamiaisLeipa)
    await food1.save()
    await food2.save()

    //tässä tallennetaan soijaRouheNuudelin refu respective ainesosiin
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

    //täs tallennetaan Avokadopastan refu respective ainesosiin
    const aamiaisLeipaFromDB = await Food.findOne({ name: aamiaisLeipa.name })

    aamiaisLeipaFromDB.ingredients
      .map(i => i.item.toString())
      .forEach(async ingrID => {
        try {
          const ingredient = await Ingredient.findOne({ _id: ingrID })
          ingredient.usedInFoods.push(aamiaisLeipaFromDB.id)
          await ingredient.save()
        } catch (e) {
          console.log('Error putting foodrefs in ingredients', e.message)
        }
      })

    console.log('Foods inserted')
  } catch (e) {
    console.log('Error inserting foods', e.message)
  }
  // try {
  //   const foods = await Food.find({})
  //   await new FoodPack({
  //     name: 'Kurjat setit',
  //     foods: foods.map(f => f.id),
  //   }).save()
  //   const foodPacks = await FoodPack.find({})
  //   const foodPackID = foodPacks[0]._id
  //   await foods.forEach(async f => {
  //     f.usedInFoodPacks.push(foodPackID)
  //     await f.save()
  //   })
  //   console.log('Foodpacks inserted')
  // } catch (e) {
  //   console.log('Error inserting foodPacks', e.message)
  // }
  // mongoose.connection.close()
  // tää on kommenttina koska mahdollisesti
  // sulkee connectionin ennen kuin Foodien usedInFoodPacks
  // ehtii päivittyy
}

format()
