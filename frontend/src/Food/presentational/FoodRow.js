import React from 'react'
import DeleteFoodButton from '../utils/DeleteFoodButton'
import UpdateFoodButton from '../utils/UpdateFoodButton'
import { Link } from 'react-router-dom'

const FoodRow = ({ food }) => {
  return (
    <tr>
      <td>
        <Link to={`/ruoat/${food.name}`}>{food.name}</Link>
      </td>
      <td>{food.price} €</td>
      <td>{food.kcal}</td>
      <td>
        <UpdateFoodButton food={food} />
      </td>
      <td>
        <DeleteFoodButton food={food} />
      </td>
    </tr>
  )
}

export default FoodRow