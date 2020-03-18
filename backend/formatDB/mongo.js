const mongoose = require('mongoose')
const Ingredient = require('../models/Ingredient')
const Food = require('../models/Food')
const { ingredients, foods } = require('./dummyData')
require('dotenv').config()

console.log(process.env.MONGODB_URI)

mongoose.set('useFindAndModify', false)

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(e => {
    console.log('error connection to MongoDB', e.message)
  })

const format = async () => {
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
    await Ingredient.insertMany(ingredients)
    console.log('Ingredients inserted')
  } catch (e) {
    console.log('Error deleting ingredients', e.message)
  }
  try {
    const ingredientsFromDB = await Ingredient.find({})
    const totalPrice = ingredientsFromDB
      .reduce((sum, obj) => sum + obj.price, 0)
    const totalKCalories = ingredientsFromDB
      .reduce((sum, obj) => {
        if (obj.kiloCalories) {
          return sum + obj.kiloCalories
        }
      }, 0)
    const objIds = ingredientsFromDB
      .map(i => i._id)
    const food = new Food({
      name: 'Tofunuudelia ketsupilla',
      price: totalPrice,
      kiloCalories: totalKCalories,
      ingredients: objIds
    })
    await food.save()
    console.log('Foods inserted')
  } catch (e) {
    console.log('Error inserting foods', e.message)
  }
  mongoose.connection.close()
}

format()