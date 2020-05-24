const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    unique: true,
  },
  recipe: {
    type: [String],
    required: true,
  },
  ingredients: [
    {
      pieces: Number,
      grams: Number,
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient',
      },
    },
  ],
  usedInFoodPacks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FoodPack',
    },
  ],
})

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

schema.set('toObject', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    returnedObject.ingredients.forEach((i) => {
      i.id = i._id.toString()
      delete i._id
    })
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Food', schema)
