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

  groceryStore.ingredients.forEach(async i => {
    i.foundInStores.push(groceryStore.id)
    await i.save()
  })

  return groceryStore
}

const deleteGroceryStore = async (root, args) => {
  const groceryStore = await GroceryStore.findOneAndDelete({
    _id: args.id,
  }).populate('ingredients')

  groceryStore.ingredients.forEach(async i => {
    i.foundInStores.filter(store => store.toString() !== groceryStore.id)
    await i.save()
  })

  return groceryStore
}

const updateGroceryStore = async (root, args) => {
  let groceryStore = await GroceryStore.findOne({ _id: args.id }).populate(
    'ingredients'
  )
  groceryStore.name = args.name || groceryStore.name
  const ingredients = groceryStore.ingredients
  groceryStore.ingredients = args.ingredients || groceryStore.ingredients

  await groceryStore.save()

  if (args.ingredients) {
    ingredients.forEach(async i => {
      i.foundInStores = i.foundInStores.filter(
        store => store.id.toString() !== groceryStore.id
      )
      await i.save()
    })
    groceryStore = await GroceryStore.findOne({ _id: args.id }).populate(
      'ingredients'
    )
  }

  return groceryStore
}

module.exports = {
  allGroceryStores,
  addGroceryStore,
  deleteGroceryStore,
  updateGroceryStore,
}
