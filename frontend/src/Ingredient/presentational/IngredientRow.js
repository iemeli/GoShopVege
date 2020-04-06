import React from 'react'
import DeleteIngredientButton from '../DeleteIngredientButton'
import { Link } from 'react-router-dom'

const IngredientRow = ({ ingredient }) => (
  <tr>
    <td>
      <Link to={`/ainesosat/${ingredient.name}`}>{ingredient.name}</Link>
    </td>
    <td>{ingredient.price} €</td>
    <td>{ingredient.kcal}</td>
    <td>
      <DeleteIngredientButton ingredient={ingredient} />
    </td>
  </tr>
)


export default IngredientRow