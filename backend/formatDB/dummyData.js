const ingredients = [
  {
    name: 'VegeSun 500g tumma soijarouhe',
    prices: [3.05],
    priceRange: { min: 3.05, max: 3.05 },
    brand: 'VegeSun',
    weight: 500,
    kcal: 350,
    fat: 0.8,
    saturatedFat: 0.1,
    carbs: 33,
    sugars: 7.8,
    protein: 53,
    salt: 0,
    foundInStores: ['S-kauppa'],
  },
  {
    name: 'Salt Crackers suolakeksi 300 g / 3 x 100 g',
    prices: [1.25],
    priceRange: { min: 1.25, max: 1.25 },
    brand: 'Rainbow',
    weight: 300,
    kcal: 474,
    fat: 20,
    saturatedFat: 9.6,
    carbs: 65,
    sugars: 8,
    protein: 7,
    salt: 3.3,
    foundInStores: ['S-kauppa'],
  },
  {
    name: 'Oatly påMACKAN Tomaatti/Basilika 150g',
    prices: [2.15],
    priceRange: { min: 2.15, max: 2.15 },
    brand: 'Oatly',
    weight: 150,
    kcal: 224,
    fat: 19,
    saturatedFat: 7.1,
    carbs: 9.6,
    sugars: 3.7,
    protein: 0.9,
    salt: 1.23,
    foundInStores: ['S-kauppa'],
  },
  {
    name: 'Mama kanamakuinen nuudeli 90g',
    prices: [0.69],
    priceRange: { min: 0.69, max: 0.69 },
    brand: 'Mama',
    weight: 90,
    kcal: 72,
    fat: 3.1,
    saturatedFat: 1.7,
    carbs: 9.2,
    sugars: 0.6,
    protein: 1.7,
    salt: 1,
    foundInStores: ['S-kauppa'],
  },
  {
    name: 'Fazer Puikula 550g 9kpl Kaura kauraleipä',
    prices: [1.89],
    priceRange: { min: 1.89, max: 1.89 },
    brand: 'Fazer',
    pieces: 9,
    weight: 550,
    kcal: 279,
    fat: 5.9,
    saturatedFat: 0.9,
    carbs: 41,
    sugars: 2.1,
    protein: 11,
    salt: 1.1,
    foundInStores: ['S-kauppa'],
  },
  {
    name: 'Keiju Laktoositon kasvirasvalevite 600 g',
    prices: [1.99],
    priceRange: { min: 1.99, max: 1.99 },
    brand: 'Keiju',
    weight: 600,
    kcal: 630,
    fat: 70,
    saturatedFat: 20,
    carbs: 0,
    sugars: 0,
    protein: 0,
    salt: 0.7,
    foundInStores: ['S-kauppa'],
  },
  {
    name: 'Heinz Tomaattiketsuppi 570g',
    prices: [2.15],
    priceRange: { min: 2.15, max: 2.15 },
    brand: 'Heinz',
    weight: 570,
    kcal: 102,
    fat: 0.1,
    saturatedFat: 0.1,
    carbs: 23.2,
    sugars: 22.8,
    protein: 1.2,
    salt: 1.8,
    foundInStores: ['S-kauppa'],
  },
  {
    name: 'Testi',
    prices: [2.15, 2.5],
    priceRange: { min: 2.15, max: 2.5 },
    brand: 'Heinz',
    weight: 570,
    kcal: 102,
    fat: 0.1,
    saturatedFat: 0.1,
    carbs: 23.2,
    sugars: 22.8,
    protein: 1.2,
    salt: 1.8,
    foundInStores: ['Lidl'],
  },
  {
    name: 'Testi2',
    prices: [0.15, 0.2],
    pieces: 6,
    priceRange: { min: 0.15, max: 0.2 },
    brand: 'Heinz',
    weight: 570,
    kcal: 102,
    fat: 0.1,
    saturatedFat: 0.1,
    carbs: 23.2,
    sugars: 22.8,
    protein: 1.2,
    salt: 1.8,
    foundInStores: ['K-kauppa'],
  },
]

const foods = [
  {
    name: 'Soijarouhenuudeli ketsupilla',
    recipe: [
      'Keitä soijarouhe',
      'keitä nuudeli (vähän myöhemmin)',
      'nauti ketsupin kanssa',
    ],
    usedInFoodPacks: [],
    ingredients: [
      {
        grams: 50,
        item: 'VegeSun 500g tumma soijarouhe',
      },
      {
        grams: 90,
        item: 'Mama kanamakuinen nuudeli 90g',
      },
      {
        grams: 10,
        item: 'Heinz Tomaattiketsuppi 570g',
      },
    ],
  },
  {
    name: 'Aamiaisleipä',
    recipe: [
      'Paahda leipä paahtimessa',
      'Levitä levitettä leveästi',
      'Nauti ketsupin kanssa',
    ],
    usedInFoodPacks: [],
    ingredients: [
      {
        pieces: 1,
        item: 'Fazer Puikula 550g 9kpl Kaura kauraleipä',
      },
      {
        grams: 10,
        item: 'Keiju Laktoositon kasvirasvalevite 600 g',
      },
    ],
  },
]

module.exports = { ingredients, foods }
