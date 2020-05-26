import React from 'react'
import IngredientRow from './IngredientRow'

const ListIngredients = ({ ingredients, hideButtons }) => (
  <div>
    <table>
      <tbody>
        <tr>
          <th>Nimi</th>
          <th>Hintahaarukka</th>
          <th>Brändi</th>
          <th>kcal yhteensä</th>
        </tr>
        {ingredients.map(i => (
          // <IngredientRow ingredient={i} key={i.id} hideButtons={hideButtons} />
          <tr key={i.id}>
            <td>{i.name}</td>
            <td>
              {i.priceRange.min.toFixed(2)}€-{i.priceRange.max.toFixed(2)}€
            </td>
            <td>{i.brand}</td>
            <td>{i.kcal.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default ListIngredients
