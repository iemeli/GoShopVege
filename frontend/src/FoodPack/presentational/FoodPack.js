import React from 'react'
import ListFoods from '../../Food/presentational/ListFoods'
import DeleteFoodPackButton from '../utils/DeleteFoodPackButton'
import UpdateFoodPackButton from '../utils/UpdateFoodPackButton'

const FoodPack = ({ foodPack }) => (
  <div>
    <h2>
      {foodPack.name}
      <UpdateFoodPackButton foodPack={foodPack} />
      <DeleteFoodPackButton foodPack={foodPack} />
    </h2>
    <p>
      <strong>Kilokalorit: </strong>
      {foodPack.kcal}
    </p>
    <p>
      <strong>Hinta: </strong>
      {foodPack.price} €
    </p>
    <ListFoods foods={foodPack.foods} hideButtons={true} />
  </div>
)

export default FoodPack
