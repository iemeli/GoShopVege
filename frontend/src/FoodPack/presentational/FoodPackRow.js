import React from 'react'
import { Link } from 'react-router-dom'
import DeleteFoodPackButton from '../utils/DeleteFoodPackButton'
import UpdateFoodPackButton from '../utils/UpdateFoodPackButton'

const FoodPackRow = ({ foodPack }) => (
  <tr>
    <td>
      <Link to={`/ruokapaketit/${foodPack.name}`}>{foodPack.name}</Link>
    </td>
    <td>{foodPack.price} €</td>
    <td>{foodPack.kcal}</td>
    <td>{foodPack.foodsCount}</td>
    <td>
      <UpdateFoodPackButton foodPack={foodPack} />
    </td>
    <td>
      <DeleteFoodPackButton foodPack={foodPack} />
    </td>
  </tr>
)

export default FoodPackRow
