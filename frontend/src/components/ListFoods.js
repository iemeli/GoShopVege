import React from 'react'
import { useQuery } from '@apollo/client'
import {
  ALL_FOODS
} from '../queries'

const ListFoods = () => {
  const foodsResult = useQuery(ALL_FOODS)

  if (foodsResult.loading) {
    return (
      <div>...loading</div>
    )
  }

  const foods = foodsResult.data.allFoods

  return (
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
            Ainesosat
          </th>
        </tr>
        {foods.map(f =>
          <tr key={f.id}>
            <td>{f.name}</td>
            <td>{f.price}€</td>
            <td>{f.kiloCalories}</td>
            <td><ul>{f.ingredients.map(i => 
              <li key={i.id}>
                {i.name}
              </li>
            )}</ul></td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default ListFoods