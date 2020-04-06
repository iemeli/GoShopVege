import React from 'react'
import DeleteFoodPackButton from '../DeleteFoodPackButton'
import { Link } from 'react-router-dom'

const FoodPackRow = ({ foodPack }) => (
  <tr>
    <td>
      <Link to={`/ruokapaketit/${foodPack.name}`}>
        {foodPack.name}
      </Link>
    </td>
    <td>{foodPack.price} €</td>
    <td>{foodPack.kcal}</td>
    <td>{foodPack.foodsCount}</td>
    <td>
      <DeleteFoodPackButton foodPack={foodPack} />
    </td>
  </tr>
)

export default FoodPackRow