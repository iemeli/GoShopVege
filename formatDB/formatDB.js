const mongoose = require('mongoose')
const Ingredient = require('../models/Ingredient')
const Food = require('../models/Food')
const FoodPack = require('../models/FoodPack')
const GroceryStore = require('../models/GroceryStore')
const { ingredients, foods, foodPacks, groceryStores } = require('./dummyData')

require('dotenv').config()

mongoose.set('useFindAndModify', false)

const { MONGODB_URI } = process.env

console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(e => {
    console.log('error connection to MongoDB', e.message)
  })

const getIngredientForDB = i => {
  const ingredientForDB = {}
  Object.keys(i).forEach(key => {
    if (
      [
        'kcal',
        'fat',
        'saturatedFat',
        'carbs',
        'sugars',
        'protein',
        'salt',
      ].indexOf(key) > -1
    ) {
      ingredientForDB[key] = {
        total: Number((i[key] * (i.weight / 100)).toFixed(1)),
        in100g: i[key],
        ...(i.pieces && {
          inOnePiece: Number(
            ((i[key] * (i.weight / 100)) / i.pieces).toFixed(1)
          ),
        }),
      }
    } else {
      ingredientForDB[key] = i[key]
    }
  })

  ingredientForDB.priceRange = {
    min: Math.min(...ingredientForDB.prices),
    max: Math.max(...ingredientForDB.prices),
  }

  return ingredientForDB
}

const deleteAll = async () => {
  try {
    await GroceryStore.deleteMany({})
    console.log('GroceryStores deleted')
  } catch (e) {
    console.log('Error deleting GroceryStores')
  }
  try {
    await Ingredient.deleteMany({})
    console.log('Ingredients deleted')
  } catch (e) {
    console.log('Error deleting ingredients', e.message)
  }
  try {
    await Food.deleteMany({})
    console.log('Foods deleted')
  } catch (e) {
    console.log('Error deleting foods', e.message)
  }
  try {
    await FoodPack.deleteMany({})
    console.log('FoodPacks deleted')
  } catch (e) {
    console.log('Error deleting FoodPacks')
  }
}

const format = async () => {
  await deleteAll()

  try {
    await groceryStores.forEach(async gs => {
      await new GroceryStore({
        name: gs.name,
        ingredients: [],
      }).save()
    })

    await GroceryStore.find({})

    console.log('GroceryStores inserted')
  } catch (e) {
    console.log('Error inserting Grocery Stores: ', e.message)
  }

  try {
    const ingredientsForDB = ingredients.map(i => getIngredientForDB(i))

    const groceryStoresFromDB = await GroceryStore.find({})

    ingredientsForDB.forEach(i => {
      const refStore = groceryStoresFromDB.find(
        gs => gs.name === i.foundInStores[0]
      )

      i.foundInStores = [refStore.id]
    })

    await Ingredient.insertMany(ingredientsForDB)

    const ingredientsFromDB = await Ingredient.find({})

    await groceryStoresFromDB.forEach(async gs => {
      const ids = ingredientsFromDB
        .filter(ifdb => ifdb.foundInStores.includes(gs.id))
        .map(i => i.id)
      gs.ingredients.push(...ids)
      await gs.save()
    })

    console.log('Ingredients inserted')
  } catch (e) {
    console.log('Error inserting ingredients', e.message)
  }

  try {
    const ingredientsFromDB = await Ingredient.find({})
    const soijaNuudeli = foods[0]
    soijaNuudeli.ingredients.forEach(i => {
      const ingredientId = ingredientsFromDB.find(ingr => ingr.name === i.item)
        .id
      i.item = ingredientId
    })

    const aamiaisLeipa = foods[1]
    aamiaisLeipa.ingredients.forEach(i => {
      const ingredientId = ingredientsFromDB.find(ingr => ingr.name === i.item)
        .id
      i.item = ingredientId
    })

    const food1 = new Food(soijaNuudeli)
    const food2 = new Food(aamiaisLeipa)
    await food1.save()
    await food2.save()

    const soijaNuudeliFromDB = await Food.findOne({ name: soijaNuudeli.name })

    soijaNuudeliFromDB.ingredients
      .map(i => i.item.toString())
      .forEach(async ingrID => {
        try {
          const ingredient = await Ingredient.findOne({ _id: ingrID })
          ingredient.usedInFoods.push(soijaNuudeliFromDB.id)
          await ingredient.save()
        } catch (e) {
          console.log('Error putting foodrefs in ingredients', e.message)
        }
      })

    const aamiaisLeipaFromDB = await Food.findOne({ name: aamiaisLeipa.name })

    aamiaisLeipaFromDB.ingredients
      .map(i => i.item.toString())
      .forEach(async ingrID => {
        try {
          const ingredient = await Ingredient.findOne({ _id: ingrID })
          ingredient.usedInFoods.push(aamiaisLeipaFromDB.id)
          await ingredient.save()
        } catch (e) {
          console.log('Error putting foodrefs to ingredients', e.message)
        }
      })

    console.log('Foods inserted')
  } catch (e) {
    console.log('Error inserting foods', e.message)
  }

  try {
    const foodsFromDB = await Food.find({})

    const kurjatSetit = foodPacks[0]
    kurjatSetit.foods = kurjatSetit.foods.map(
      f => foodsFromDB.find(ffdb => ffdb.name === f).id
    )

    await new FoodPack(kurjatSetit).save()

    const foodPackFromDB = await FoodPack.findOne({})

    const foodPackID = foodPackFromDB.id

    await foodsFromDB.forEach(async f => {
      f.usedInFoodPacks.push(foodPackID)
      await f.save()
    })
    console.log('Foodpacks inserted')
  } catch (e) {
    console.log('Error inserting foodPacks', e.message)
  }
}

format()
