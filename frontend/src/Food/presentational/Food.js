import React from 'react'
import { useRouteMatch, Link } from 'react-router-dom'
import { ALL_FOODS } from '../../queries'
import { useQuery } from '@apollo/client'

const Food = () => {
  const foodName = useRouteMatch('/ruoat/:name').params.name
  const foodsResult = useQuery(ALL_FOODS, {
    variables: { name: foodName }
  })

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
              {food.price} €
            </td>
          </tr>
          <tr>
            <th>
              Kilokalorit:
            </th>
            <td>
              {food.kcal}
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <strong>ainesosat</strong>
      {food.ingredients.map(i =>
        <ul key={i.id}>
          <li>
            <Link to={`/ainesosat/${i.item.name}`}>
              {i.item.name}
            </Link>
          </li>
        </ul>
      )}
      <br />
      <strong>resepti</strong>
      {food.recipe.map(step =>
        <ul key={step}>
          <li>{step}</li>
        </ul>
      )}
    </div>
  )
}

export default Food