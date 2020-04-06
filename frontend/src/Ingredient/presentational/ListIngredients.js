import React from 'react'
import IngredientRow from './IngredientRow'

const ListIngredients = ({ ingredients }) => (
  <div>
    <h3>Ainesosat</h3>
    <table>
      <tbody>
        <tr>
          <th>
            Nimi
            </th>
          <th>
            Hinta
          </th>
          <th>
            Kilokalorit
          </th>
          <th>

          </th>
        </tr>
        {ingredients.map(i =>
          <IngredientRow ingredient={i} key={i.id} />  
        )}
      </tbody>
    </table>
  </div>
)


export default ListIngredients