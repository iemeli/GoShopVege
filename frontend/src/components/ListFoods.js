import React from 'react'
import { useQuery } from '@apollo/client'
import {
  ALL_FOODS
} from '../queries'
import { Link } from 'react-router-dom'

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
        </tr>
        {foods.map(f =>
          <tr key={f.id}>
            <td><Link to={`/ruoat/${f.name}`}>{f.name}</Link></td>
            <td>{f.price}€</td>
            <td>{f.kiloCalories}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default ListFoods