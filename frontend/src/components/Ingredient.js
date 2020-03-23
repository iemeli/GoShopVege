import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { ALL_INGREDIENTS } from '../queries'

const Ingredient = ({ }) => {
  //tänne tulee yksittäisen ingredients setit
  //tää ei siis liity siihen kun Food.js rendaa omat ingredients
  const ingredientName = useRouteMatch('/ainesosat/:name').params.name
  const ingredientsResult = useQuery(ALL_INGREDIENTS, {
    variables: { name: ingredientName }
  })

  if (ingredientsResult.loading) {
    return (
      <div>...loading</div>
    )
  }

  const ingredient = ingredientsResult.data.allIngredients[0]

  return (
    <div>
      <h3>{ingredient.name}</h3>
      <table>
        <tbody>
          <tr>
            <th>
              Hinta:
            </th>
            <td>
              {ingredient.price}
            </td>
          </tr>
          <tr>
            <th>
              Kilokalorit:
            </th>
            <td>
              {ingredient.kcal}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Ingredient