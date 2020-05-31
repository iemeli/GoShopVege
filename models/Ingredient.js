/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    minlength: 4,
  },
  prices: [Number],
  priceRange: {
    min: Number,
    max: Number,
  },
  brand: String,
  weight: Number,
  pieces: Number,
  kcal: {
    total: Number,
    inOnePiece: Number,
    in100g: Number,
  },
  fat: {
    total: Number,
    inOnePiece: Number,
    in100g: Number,
  },
  saturatedFat: {
    total: Number,
    inOnePiece: Number,
    in100g: Number,
  },
  carbs: {
    total: Number,
    inOnePiece: Number,
    in100g: Number,
  },
  sugars: {
    total: Number,
    inOnePiece: Number,
    in100g: Number,
  },
  protein: {
    total: Number,
    inOnePiece: Number,
    in100g: Number,
  },
  salt: {
    total: Number,
    inOnePiece: Number,
    in100g: Number,
  },
  usedInFoods: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Food',
    },
  ],
  foundInStores: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'GroceryStore',
    },
  ],
})

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    returnedObject.priceRange = {
      min: Math.min(...returnedObject.prices),
      max: Math.max(...returnedObject.prices),
    }
    delete returnedObject._id
    delete returnedObject.__v
  },
})

schema.set('toObject', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    returnedObject.priceRange = {
      min: Math.min(...returnedObject.prices),
      max: Math.max(...returnedObject.prices),
    }
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Ingredient', schema)
