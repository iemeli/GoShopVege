import React from 'react'
import ListFoods from '../../Food/presentational/ListFoods'
import DeleteFoodPackButton from '../DeleteFoodPackButton'

const FoodPack = ({ foodPack }) => (
  <div>
    <h2>
      {foodPack.name}
      <DeleteFoodPackButton foodPack={foodPack} />
    </h2>
    <p><strong>Kilokalorit: </strong>{foodPack.kcal}</p>
    <p><strong>Hinta: </strong>{foodPack.price} €</p>
    <ListFoods foods={foodPack.foods} />
  </div>
)


export default FoodPack