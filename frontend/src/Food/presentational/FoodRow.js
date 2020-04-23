import React from 'react'
import { Link } from 'react-router-dom'
import DeleteFoodButton from '../utils/DeleteFoodButton'
import UpdateFoodButton from '../utils/UpdateFoodButton'

const FoodRow = ({ food, hideButtons, setAlert }) => {
  return (
    <tr>
      <td>
        <Link to={`/ruoat/${food.name}`}>{food.name}</Link>
      </td>
      <td>{food.price} €</td>
      <td>{food.kcal}</td>
      <td>{!hideButtons && <UpdateFoodButton food={food} />}</td>
      <td>
        {!hideButtons && <DeleteFoodButton food={food} setAlert={setAlert} />}
      </td>
    </tr>
  )
}

export default FoodRow
