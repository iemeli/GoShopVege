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
    
    const tofuNuudeli = foods[0]
    tofuNuudeli.ingredients = ingredientsFromDB
      .filter(i => i.name === 'tofu' || i.name === 'nuudeli' || i.name === 'ketsuppi')
      .map(i => {
        console.log('täs i.id', i.id)
        return ( 
        {
          usedAtOnce: true,
          item: i.id
        }
      )})
    const avokadoPasta = foods[1]
    avokadoPasta.ingredients = ingredientsFromDB
      .filter(i => i.name !== 'tofu' && i.name !== 'nuudeli')
      .map(i => ( 
        {
          usedAtOnce: true,
          item: i.id
        }
      ))
    const food1 = new Food(tofuNuudeli)
    const food2 = new Food(avokadoPasta)
    await food1.save()
    await food2.save()
    console.log('Foods inserted')
  } catch (e) {
    console.log('Error inserting foods', e.message)
  }
  mongoose.connection.close()
}

format()