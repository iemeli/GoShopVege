import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_FOODPACKS } from '../../queries'
import { Link } from 'react-router-dom'

const ListFoodPacks = () => {
  const foodPacksResult = useQuery(ALL_FOODPACKS)

  if (foodPacksResult.loading) {
    return (
      <div>...loading</div>
    )
  }
  console.log(foodPacksResult.data)
  const foodPacks = foodPacksResult.data.allFoodPacks

  return (
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
}

export default ListFoodPacks