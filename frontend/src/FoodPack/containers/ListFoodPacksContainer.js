import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_FOODPACKS } from '../queries'
import ListFoodPacks from '../presentational/ListFoodPacks'

const ListFoodPacksContainer = () => {
  const foodPacksResult = useQuery(ALL_FOODPACKS)

  if (foodPacksResult.loading) {
    return (
      <div>...loading</div>
    )
  }
  
  const foodPacks = foodPacksResult.data.allFoodPacks
  
  return (
    <div>
      <ListFoodPacks foodPacks={foodPacks} />
    </div>
  )
}

export default ListFoodPacksContainer