const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4
  },
  price: {
    type: Number,
    required: true,
  },
  kiloCalories: {
    type: Number,
    required: true
  },
  ingredients: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ingredient'
    }
  ]
})

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Food', schema)