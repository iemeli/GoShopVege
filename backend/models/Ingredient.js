const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    minlength: 4,
  },
  price: {
    type: Number,
    required: true,
  },
  kcal: Number,
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

module.exports = mongoose.model('Ingredient', schema)
