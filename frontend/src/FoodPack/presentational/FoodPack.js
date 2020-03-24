import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { ALL_FOODPACKS } from '../../queries'
import { useQuery } from '@apollo/client'
import ListFoods from '../../Food/presentational/ListFoods'

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
      
      <ListFoods foods={foodPack.foods} />
    </div>
  )
}

export default FoodPack