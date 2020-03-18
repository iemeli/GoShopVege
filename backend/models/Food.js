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
  kiloCalories: Number,
  ingredients: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ingredient'
    }
  ]
})

module.exports = mongoose.model('Food', schema)