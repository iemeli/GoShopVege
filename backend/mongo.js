const mongoose = require('mongoose')
const Ingredient = require('./models/Ingredient')

const ingredients = [
  {
    name: 'tofu'
  },
  {
    name: 'nuudeli'
  },
  {
    name: 'ketsuppi'
  }
]

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

Ingredient.deleteMany({})
  .then(() => {
    console.log('Ingredients removed succesfully')
  })
  .then(() => {
    Ingredient.insertMany(ingredients) 
      .then(() => {
        console.log('Ingredients inserted succesfully')
        mongoose.connection.close()
      })
      .catch(e => {
        console.log('Error insterting ingredients', e.message)
      })
  })
  .catch(e => {
    console.log('Error removing ingredients')
  })