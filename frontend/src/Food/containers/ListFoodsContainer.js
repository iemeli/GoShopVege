import React from 'react'
import { useQuery } from '@apollo/client'
import {
  ALL_FOODS
} from '../../queries'
import ListFoods from '../presentational/ListFoods'

const ListFoodsContainer = () => {
  const foodsResult = useQuery(ALL_FOODS)

  if (foodsResult.loading) {
    return (
      <div>...loading</div>
    )
  }

  const foods = foodsResult.data.allFoods

  return (
    <div>
      <ListFoods foods={foods} />
    </div>
  )
}

export default ListFoodsContainer