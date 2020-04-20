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
      usedAtOnce: {
        type: Boolean,
        default: true,
      },
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
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Food', schema)
