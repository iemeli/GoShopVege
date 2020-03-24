import React from 'react'
import { Link } from 'react-router-dom'

const ListFoodPacks = ({ foodPacks }) => (
  <div>
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
            Ruoat
            </th>
        </tr>
        {foodPacks.map(fp =>
          <tr key={fp.id}>
            <td>
              <Link to={`/ruokapaketit/${fp.name}`}>
                {fp.name}
              </Link>
            </td>
            <td>{fp.price} €</td>
            <td>{fp.kcal}</td>
            <td>{fp.foodsCount}</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
)

export default ListFoodPacks