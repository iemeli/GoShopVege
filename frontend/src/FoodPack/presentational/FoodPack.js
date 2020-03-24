import React from 'react'
import { useRouteMatch, Link } from 'react-router-dom'
import { ALL_FOODPACKS } from '../../queries'
import { useQuery } from '@apollo/client'

const FoodPack = () => {
  const foodPackName = useRouteMatch('/ruokapaketit/:name')
  const foodPacksResult = useQuery(ALL_FOODPACKS, {
    variables: { name: foodPackName }
  })

  if (foodPacksResult.loading) {
    return (
      <div>...loading</div>
    )
  }

  const foodPack = foodPacksResult.data.allFoodPacks[0]
  
  return (
    <div>
      <h2>{foodPack.name}</h2>
      <p><strong>Kilokalorit: </strong>{foodPack.kcal}</p>
      <p><strong>Hinta: </strong>{foodPack.price} €</p>
      
      <br/>

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
        {foodPack.foods.map(f =>
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
}

export default FoodPack