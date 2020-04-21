import React from 'react'
import { useRouteMatch, Redirect } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { ALL_FOODS } from '../queries'
import Food from '../presentational/Food'

const FoodContainer = () => {
  const foodName = useRouteMatch('/ruoat/:name').params.name
  const foodsResult = useQuery(ALL_FOODS, {
    variables: { name: foodName },
  })

  if (foodsResult.loading) {
    return <div>...loading</div>
  }

  const food = foodsResult.data.allFoods[0]

  if (!food) {
    return <Redirect to="/ruoat" />
  }

  return (
    <div>
      <Food food={food} />
    </div>
  )
}

export default FoodContainer
