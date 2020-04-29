import React from 'react'
import IngredientRow from './IngredientRow'

const ListIngredients = ({ ingredients, hideButtons }) => (
  <div>
    <h3>Ainesosat</h3>
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
