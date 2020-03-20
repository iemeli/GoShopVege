import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { ALL_FOODS } from '../queries'
import { useQuery } from '@apollo/client'

const Food = () => {
  const foodName = useRouteMatch('/ruoat/:name').params.name
  console.log('täs foodName', foodName)
  const foodsResult = useQuery(ALL_FOODS)

  if (foodsResult.loading) {
    return (
      <div>...loading</div>
    )
  }

  const food = foodsResult.data.allFoods[0]

  return (
    <div>
      <h3>{food.name}</h3>
      <table>
        <tbody>
          <tr>
            <th>
              Hinta:
          </th>
            <td>
              {food.price}
            </td>
            <th>
              Kilokalorit:
          </th>
            <td>
              {food.kiloCalories}
            </td>
          </tr>
        </tbody>
      </table>
      {/* tähän sit vielä ingredients listaus -> mieti pitäiskö tehdä oma komponentti? */}
      {food.recipe.map(step =>
        <ul key={step}>
          <li>{step}</li>
        </ul>
      )}
    </div>
  )
}

export default Food