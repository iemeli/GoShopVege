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
  kiloCalories: Number
})

module.exports = mongoose.model('Ingredient', schema)