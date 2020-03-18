const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4
  }
})

module.exports = mongoose.model('Ingredient', schema)