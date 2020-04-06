import React from 'react'
import DeleteFoodButton from '../DeleteFoodButton'
import { Link } from 'react-router-dom'

const FoodRow = ({ food }) => (
  <tr>
    <td>
      <Link to={`/ruoat/${food.name}`}>{food.name}</Link>
    </td>
    <td>{food.price} €</td>
    <td>{food.kcal}</td>
    <td>
      <DeleteFoodButton food={food} />
    </td>
  </tr>
)

export default FoodRow