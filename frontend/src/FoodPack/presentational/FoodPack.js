import React from 'react'
import Card from 'react-bootstrap/Card'
import ListFoods from '../../Food/presentational/ListFoods'
import DeleteFoodPackButton from '../utils/DeleteFoodPackButton'
import UpdateFoodPackButton from '../utils/UpdateFoodPackButton'
import ShopListButton from '../../ShopList/ShopListButton.js'

const FoodPack = ({ foodPack, history }) => (
  <div>
    <Card style={{ padding: 30, background: '#88feff' }}>
      <h2>
        {foodPack.name}
        <UpdateFoodPackButton foodPack={foodPack} />
        <DeleteFoodPackButton foodPack={foodPack} />
        <ShopListButton mode="ADD" id={foodPack.id} />
      </h2>
      <p>
        <strong>Kilokalorit: </strong>
        {foodPack.kcal}
      </p>
      <p>
        <strong>Hinta: </strong>
        {foodPack.price} €
      </p>
      <ListFoods foods={foodPack.foods} history={history} />
    </Card>
  </div>
)

export default FoodPack
