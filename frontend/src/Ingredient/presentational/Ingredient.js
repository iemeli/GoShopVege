import React from 'react'
import DeleteIngredientButton from '../utils/DeleteIngredientButton'

const Ingredient = ({ ingredient, setAlert }) => (
  <div>
    <h3>
      {ingredient.name}
      <DeleteIngredientButton ingredient={ingredient} setAlert={setAlert} />
    </h3>
    <table>
      <tbody>
        <tr>
          <th>Hinta:</th>
          <td>{ingredient.price} €</td>
        </tr>
        <tr>
          <th>Kilokalorit:</th>
          <td>{ingredient.kcal}</td>
        </tr>
      </tbody>
    </table>
  </div>
)

export default Ingredient
