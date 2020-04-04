import React from 'react'
import { Link } from 'react-router-dom'

const ListIngredients = ({ ingredients, deleteIngredient }) => (
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
          <tr key={i.id}>
            <td><Link to={`/ainesosat/${i.name}`}>{i.name}</Link></td>
            <td>{i.price} €</td>
            <td>{i.kcal}</td>
            <td>
              <button onClick={deleteIngredient} id={i.id}>
                poista
              </button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
)


export default ListIngredients