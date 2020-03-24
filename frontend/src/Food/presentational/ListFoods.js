import React from 'react'
import { Link } from 'react-router-dom'

const ListFoods = ({ foods }) => (
  <div>
    <h3>Ruoat</h3>
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
        {foods.map(f =>
          <tr key={f.id}>
            <td><Link to={`/ruoat/${f.name}`}>{f.name}</Link></td>
            <td>{f.price} €</td>
            <td>{f.kcal}</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
)


export default ListFoods