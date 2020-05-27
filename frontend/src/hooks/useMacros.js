import { useState } from 'react'

const useMacros = () => {
  const [kcal, setKcal] = useState(0)
  const [fat, setFat] = useState(0)
  const [saturatedFat, setSaturatedFat] = useState(0)
  const [carbs, setCarbs] = useState(0)
  const [sugars, setSugars] = useState(0)
  const [protein, setProtein] = useState(0)
  const [salt, setSalt] = useState(0)

  const underZeroIsZero = num => {
    return num < 0 ? 0 : num
  }

  const unit = {
    PIECES: 'pieces',
    GRAMS: 'grams',
  }

  const macroName = {
    KCAL: 'kcal',
    FAT: 'fat',
    SATURATEDFAT: 'saturatedFat',
    CARBS: 'carbs',
    SUGARS: 'sugars',
    PROTEIN: 'protein',
    SALT: 'salt',
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

  const getMacroByUnit = (
    name,
    ingredient,
    foodIngredientValue,
    foodIngredientUnit
  ) => {
    if (foodIngredientUnit === unit.PIECES) {
      return ingredient[name].inOnePiece * foodIngredientValue
    }
    return (ingredient[name].in100g / 100) * foodIngredientValue
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
        //idea saatu https://stackoverflow.com/questions/26328294/call-function-dynamically-in-javascript
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
