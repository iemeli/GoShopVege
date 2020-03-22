const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  ingredients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ingredient'
  }],
  foods: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food'
  }],
  foodPacks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FoodPack'
  }]
})

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('GroceryStore', schema)