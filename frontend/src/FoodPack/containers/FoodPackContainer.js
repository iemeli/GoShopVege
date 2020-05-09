import React from 'react'
import { useRouteMatch, Redirect, useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { ALL_FOODPACKS } from '../queries'
import FoodPack from '../presentational/FoodPack'

const FoodPackContainer = () => {
  const history = useHistory()
  const foodPackName = useRouteMatch('/ruokapaketit/:name').params.name

  const foodPacksResult = useQuery(ALL_FOODPACKS)

  if (foodPacksResult.loading) {
    return <div>...loading</div>
  }

  const foodPack = foodPacksResult.data.allFoodPacks.find(
    fp => fp.name === foodPackName
  )

  if (!foodPack) {
    return <Redirect to="/ruokapaketit" />
  }

  return (
    <div>
      <FoodPack foodPack={foodPack} history={history} />
    </div>
  )
}

export default FoodPackContainer
