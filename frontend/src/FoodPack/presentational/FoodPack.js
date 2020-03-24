import React from 'react'
import ListFoods from '../../Food/presentational/ListFoods'

const FoodPack = ({ foodPack }) => {
  
  return (
    <div>
      <h2>{foodPack.name}</h2>
      <p><strong>Kilokalorit: </strong>{foodPack.kcal}</p>
      <p><strong>Hinta: </strong>{foodPack.price} €</p>

      <ListFoods foods={foodPack.foods} />
    </div>
  )
}

export default FoodPack