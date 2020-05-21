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

const format = async () => {
  await deleteAll()

  try {
    await Ingredient.insertMany(ingredients)
    console.log('Ingredients inserted')
  } catch (e) {
    console.log('Error inserting ingredients', e.message)
  }
  // try {
  //   const ingredientsFromDB = await Ingredient.find({})

  //   const soijaNuudeli = foods[0]
  //   tofuNuudeli.ingredients = ingredientsFromDB
  //     .filter(
  //       i => i.name === 'tofu' || i.name === 'nuudeli' || i.name === 'ketsuppi'
  //     )
  //     .map(i => ({
  //       usedAtOnce: true,
  //       item: i.id,
  //     }))
  //   const avokadoPasta = foods[1]
  //   avokadoPasta.ingredients = ingredientsFromDB
  //     .filter(i => i.name !== 'tofu' && i.name !== 'nuudeli')
  //     .map(i => ({
  //       usedAtOnce: true,
  //       item: i.id,
  //     }))
  //   const food1 = new Food(tofuNuudeli)
  //   const food2 = new Food(avokadoPasta)
  //   await food1.save()
  //   await food2.save()

  //   //tässä tallennetaan Tofunuudelin refu respective ainesosiin
  //   tofuNuudeliFromDB = await Food.findOne({ name: tofuNuudeli.name })

  //   tofuNuudeliFromDB.ingredients
  //     .map(i => i.item.toString())
  //     .forEach(async ingrID => {
  //       try {
  //         const ingredient = await Ingredient.findOne({ _id: ingrID })
  //         ingredient.usedInFoods.push(tofuNuudeliFromDB._id)
  //         await ingredient.save()
  //       } catch (e) {
  //         console.log('Error updating ingredients usedInFoods', e.message)
  //       }
  //     })

  //   //täs tallennetaan Avokadopastan refu respective ainesosiin
  //   avokadoPastaFromDB = await Food.findOne({ name: avokadoPasta.name })

  //   avokadoPastaFromDB.ingredients
  //     .map(i => i.item.toString())
  //     .forEach(async ingrID => {
  //       try {
  //         const ingredient = await Ingredient.findOne({ _id: ingrID })
  //         ingredient.usedInFoods.push(avokadoPastaFromDB._id)
  //         await ingredient.save()
  //       } catch (e) {
  //         console.log('Error updating ingredients usedInFoods', e.message)
  //       }
  //     })

  //   console.log('Foods inserted')
  // } catch (e) {
  //   console.log('Error inserting foods', e.message)
  // }
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
  mongoose.connection.close()
  // tää on kommenttina koska mahdollisesti
  // sulkee connectionin ennen kuin Foodien usedInFoodPacks
  // ehtii päivittyy
}

format()
