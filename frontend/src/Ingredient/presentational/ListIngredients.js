import React from 'react'
import { Link } from 'react-router-dom'

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
        </tr>
        {ingredients.map(i =>
          <tr key={i.id}>
            <td><Link to={`/ainesosat/$`}>{i.name}</Link></td>
            <td>{i.price} €</td>
            <td>{i.kcal}</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
)


export default ListIngredients