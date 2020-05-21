const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    minlength: 4,
  },
  price: [Number],
  brand: String,
  weight: Number,
  totalKcal: Number,
  kcal: Number,
  fat: Number,
  saturatedFat: Number,
  carbs: Number,
  sugars: Number,
  protein: Number,
  salt: Number,
  voluntary: {
    Number,
    String,
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
