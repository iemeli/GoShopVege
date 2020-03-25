
import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { ALL_FOODS } from '../queries'
import { useQuery } from '@apollo/client'
import Food from '../presentational/Food'

const FoodContainer = () => {
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
      <Food food={food} />      
    </div>
  )
}

export default FoodContainer