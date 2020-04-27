import React from 'react'
import { useRouteMatch, Redirect } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { ALL_FOODS } from '../queries'
import Food from '../presentational/Food'

const FoodContainer = ({ setAlert }) => {
  const foodName = useRouteMatch('/ruoat/:name').params.name
  const foodsResult = useQuery(ALL_FOODS)

  if (foodsResult.loading) {
    return <div>...loading</div>
  }

  const food = foodsResult.data.allFoods.find(f => f.name === foodName)

  if (!food) {
    return <Redirect to="/ruoat" />
  }

  return (
    <div>
      <Food food={food} setAlert={setAlert} />
    </div>
  )
}

export default FoodContainer
