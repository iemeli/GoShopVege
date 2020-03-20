import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_INGREDIENTS } from '../queries'

const ListIngredients = () => {
  const ingredientsResult = useQuery(ALL_INGREDIENTS)

  if (ingredientsResult.loading) {
    return (
      <div>...loading</div>
    )
  }

  const ingredients = ingredientsResult.data.allIngredients

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
        {ingredients.map(i =>
          <tr key={i.id}>
            <td>{i.name}</td>
            <td>{i.price}€</td>
            <td>{i.kiloCalories}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default ListIngredients