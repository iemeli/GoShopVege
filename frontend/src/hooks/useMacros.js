import { useState } from 'react'

const unit = {
  PIECES: 'pieces',
  GRAMS: 'grams',
}

const macroName = {
  KCAL: 'kcal',
  FAT: 'fat',
  SATURATED_FAT: 'saturatedFat',
  CARBS: 'carbs',
  SUGARS: 'sugars',
  PROTEIN: 'protein',
  SALT: 'salt',
}

const getMacroByUnit = (
  macro,
  ingredient,
  foodIngredientValue,
  foodIngredientUnit
) => {
  if (foodIngredientUnit === unit.PIECES) {
    return ingredient[macro].inOnePiece * foodIngredientValue
  }
  return (ingredient[macro].in100g / 100) * foodIngredientValue
}

const getMacroForFood = (food, macro) => {
  return food.ingredients.reduce((macroSum, nextFoodIngr) => {
    let foodIngredientUnit
    let amount
    if (nextFoodIngr.pieces !== null) {
      foodIngredientUnit = unit.PIECES
      amount = nextFoodIngr.pieces
    } else {
      foodIngredientUnit = unit.GRAMS
      amount = nextFoodIngr.grams
    }

    return (
      macroSum +
      getMacroByUnit(macro, nextFoodIngr.item, amount, foodIngredientUnit)
    )
  }, 0)
}

const useMacros = props => {
  const food = props || null

  const [kcal, setKcal] = useState(
    food ? getMacroForFood(food, macroName.KCAL) : 0
  )
  const [fat, setFat] = useState(
    food ? getMacroForFood(food, macroName.FAT) : 0
  )
  const [saturatedFat, setSaturatedFat] = useState(
    food ? getMacroForFood(food, macroName.SATURATED_FAT) : 0
  )
  const [carbs, setCarbs] = useState(
    food ? getMacroForFood(food, macroName.CARBS) : 0
  )
  const [sugars, setSugars] = useState(
    food ? getMacroForFood(food, macroName.SUGARS) : 0
  )
  const [protein, setProtein] = useState(
    food ? getMacroForFood(food, macroName.PROTEIN) : 0
  )
  const [salt, setSalt] = useState(
    food ? getMacroForFood(food, macroName.SALT) : 0
  )

  const underZeroIsZero = num => {
    return num < 0 ? 0 : num
  }

  const addTo = {
    kcal: amount => setKcal(kcal + amount),
    fat: amount => setFat(fat + amount),
    saturatedFat: amount => setSaturatedFat(saturatedFat + amount),
    carbs: amount => setCarbs(carbs + amount),
    sugars: amount => setSugars(sugars + amount),
    protein: amount => setProtein(protein + amount),
    salt: amount => setSalt(salt + amount),
  }

  const subtractFrom = {
    kcal: amount => setKcal(underZeroIsZero(kcal - amount)),
    fat: amount => setFat(underZeroIsZero(fat - amount)),
    saturatedFat: amount =>
      setSaturatedFat(underZeroIsZero(saturatedFat - amount)),
    carbs: amount => setCarbs(underZeroIsZero(carbs - amount)),
    sugars: amount => setSugars(underZeroIsZero(sugars - amount)),
    protein: amount => setProtein(underZeroIsZero(protein - amount)),
    salt: amount => setSalt(underZeroIsZero(salt - amount)),
  }

  const macros = {
    kcal: kcal.toFixed(1),
    fat: fat.toFixed(1),
    saturatedFat: saturatedFat.toFixed(1),
    carbs: carbs.toFixed(1),
    sugars: sugars.toFixed(1),
    protein: protein.toFixed(1),
    salt: salt.toFixed(1),
    addAll: (ingredient, amount, foodIngredientUnit) => {
      Object.keys(macroName).forEach(key => {
        const amountToAdd = getMacroByUnit(
          macroName[key],
          ingredient,
          amount,
          foodIngredientUnit
        )
        addTo[macroName[key]](amountToAdd)
      })
    },
    subtractAll: (ingredient, amount, foodIngredientUnit) => {
      Object.keys(macroName).forEach(key => {
        const amountToSubtract = getMacroByUnit(
          macroName[key],
          ingredient,
          amount,
          foodIngredientUnit
        )
        subtractFrom[macroName[key]](amountToSubtract)
      })
    },
  }

  return [macros]
}

export default useMacros
