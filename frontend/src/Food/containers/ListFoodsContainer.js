import React from 'react'
import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import { ALL_FOODS } from '../queries'
import ListFoods from '../presentational/ListFoods'

const ListFoodsContainer = () => {
  const foodsResult = useQuery(ALL_FOODS)

  if (foodsResult.loading) {
    console.log('hi!')
    return <div>...loading</div>
  }
  console.log('nyt täs')
  console.log('foodsResult.data.allFoods', foodsResult)

  const foods = foodsResult.data.allFoods
  return (
    <div>
      <h3>
        Ruoat
        <small style={{ paddingLeft: 10 }}>
          <Link to="/ruoat/uusi">luo uusi ruoka</Link>
        </small>
      </h3>
      <ListFoods foods={foods} />
    </div>
  )
}

export default ListFoodsContainer
