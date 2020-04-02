const ingredients = [
  {
    name: 'tofu',
    price: 3,
    kcal: 459,
    usedInFoods: []
  },
  {
    name: 'nuudeli',
    price: 0.7,
    kcal: 31,
    usedInFoods: []
  },
  {
    name: 'ketsuppi',
    price: 2,
    usedInFoods: []
  },
  {
    name: 'avokado',
    price: 1,
    kcal: 198,
    usedInFoods: []
  },
  {
    name: 'pasta',
    price: 1.5,
    kcal: 700,
    usedInFoods: []
  }
]

const foods = [
  {
    name: 'Tofunuudelia ketsupilla',
    recipe: [
      'paista tofu pannulla',
      'keitä nuudeli',
      'yhdistä ja nauti ketsupin kanssa',
    ]
  },
  {
    name: 'Avokadopasta',
    recipe: [
      'pilko avokado',
      'keitä pasta',
      'yhdistä ja nauti ketsupin kanssa',
    ]
  }
]

module.exports = { ingredients, foods }