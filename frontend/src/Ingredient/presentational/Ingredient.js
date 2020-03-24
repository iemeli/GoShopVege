import React from 'react'

const Ingredient = ({ ingredient }) => (
  <div>
    <h3>{ingredient.name}</h3>
    <table>
      <tbody>
        <tr>
          <th>
            Hinta:
            </th>
          <td>
            {ingredient.price} €
            </td>
        </tr>
        <tr>
          <th>
            Kilokalorit:
            </th>
          <td>
            {ingredient.kcal}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
)

export default Ingredient