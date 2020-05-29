import React from 'react'
import { Link } from 'react-router-dom'

const ListIngredients = ({ ingredients }) => (
  <div>
    <table>
      <tbody>
        <tr>
          <th>Nimi</th>
          <th>Hintahaarukka</th>
          <th>kcal yhteensä</th>
        </tr>
        {ingredients.map(i => (
          <tr key={i.id}>
            <td>
              <Link to={`/ainesosat/${i.name}`}>{i.name}</Link>
            </td>
            <td>
              {i.priceRange.min.toFixed(2)}€-{i.priceRange.max.toFixed(2)}€
            </td>
            <td>{i.kcal.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default ListIngredients
