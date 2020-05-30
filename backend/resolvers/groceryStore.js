const GroceryStore = require('../models/GroceryStore')

const allGroceryStores = () =>
  GroceryStore.find({})
    .populate('ingredients')
    .catch(e => {
      console.log(
        'Error finding GroceryStores in allGroceryStores resolver: ',
        e.message
      )
    })

const addGroceryStore = async (root, args) => {
  await new GroceryStore({
    name: args.name,
    ingredients: args.ingredients,
  })

  const groceryStore = await GroceryStore.findOne({ name: args.name }).populate(
    'ingredients'
  )

  return groceryStore
}

const deleteGroceryStore = async (root, args) => {}
const updateGroceryStore = () => 1

module.exports = {
  allGroceryStores,
  addGroceryStore,
  deleteGroceryStore,
  updateGroceryStore,
}
