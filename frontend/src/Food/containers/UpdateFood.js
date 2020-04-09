import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_FOODS } from '../queries'
import { useRouteMatch } from 'react-router-dom'
import NewFood from '../forms/NewFood'

const UpdateFood = () => {
  const foodName = useRouteMatch('/ruoat/paivita/:name').params.name
  const foodsResult = useQuery(ALL_FOODS, {
    variables: { name: foodName }
  })
  
  if (foodsResult.loading) {
    return <div>...loading</div>
  }

  const food = foodsResult.data.allFoods[0]

  return (
    <div>
      <NewFood food={food} />
    </div>
  )
}

export default UpdateFood