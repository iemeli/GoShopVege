const ingredients = [
  {
    name: 'tofu',
    price: 3,
    kcal: 459
  },
  {
    name: 'nuudeli',
    price: 0.7,
    kcal: 31
  },
  {
    name: 'ketsuppi',
    price: 2,
  },
  {
    name: 'avokado',
    price: 1,
    kcal: 198
  },
  {
    name: 'pasta',
    price: 1.5,
    kcal: 700 
  }
]

const foods = [
  {
    name: 'Tofunuudelia ketsupilla',
    price: 5.7,
    kcal: 490,
    recipe: [
      'paista tofu pannulla',
      'keitä nuudeli',
      'yhdistä ja nauti ketsupin kanssa',
    ]
  },
  {
    name: 'Avokadopasta',
    price: 2.5,
    kcal: 300,
    recipe: [
      'pilko avokado',
      'keitä pasta',
      'yhdistä ja nauti ketsupin kanssa',
    ]
  }
]

module.exports = { ingredients, foods }