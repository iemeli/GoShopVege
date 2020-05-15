import React from 'react'
import IngredientRow from './IngredientRow'

const ListIngredients = ({ ingredients, hideButtons }) => (
  <div>
    <table>
      <tbody>
        <tr>
          <th>Nimi</th>
          <th>Hinta</th>
          <th>Kilokalorit</th>
        </tr>
        {ingredients.map(i => (
          <IngredientRow ingredient={i} key={i.id} hideButtons={hideButtons} />
        ))}
      </tbody>
    </table>
  </div>
)

export default ListIngredients
