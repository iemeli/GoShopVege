import React from 'react'
import DeleteIngredientButton from '../utils/DeleteIngredientButton'
import ShopListButton from '../../ShopList/ShopListButton'

const Ingredient = ({ ingredient }) => (
  <div>
    <h3>
      {ingredient.name}
      <DeleteIngredientButton ingredient={ingredient} />
      <ShopListButton mode="ADD" id={ingredient.id} object="ingredients" />
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
