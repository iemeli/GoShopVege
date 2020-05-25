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
  price: [Number],
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
})

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    returnedObject.priceRange = {
      min: Math.min(...returnedObject.price),
      max: Math.max(...returnedObject.price),
    }
    delete returnedObject._id
    delete returnedObject.__v
  },
})

schema.set('toObject', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    returnedObject.priceRange = {
      min: Math.min(...returnedObject.price),
      max: Math.max(...returnedObject.price),
    }
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Ingredient', schema)
