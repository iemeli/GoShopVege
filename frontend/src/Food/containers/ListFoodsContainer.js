import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_FOODS } from '../queries'
import ListFoods from '../presentational/ListFoods'
import { Link } from 'react-router-dom'
import {
  useApolloClient
} from '@apollo/client'

const ListFoodsContainer = () => {
  const foodsResult = useQuery(ALL_FOODS)
  const client = useApolloClient()
  
  if (foodsResult.loading) {
    return (
      <div>...loading</div>
    )
  }
 
  const dataInStore = client.readQuery({ query: ALL_FOODS })
  const foods = dataInStore.allFoods

  return (
    <div>
      <h3>
        Ruoat 
        <small style={{paddingLeft: 10}}>
          <Link to="/ruoat/uusi">luo uusi ruoka</Link>
        </small>
      </h3>
      <ListFoods foods={foods} />
    </div>
  )
}

export default ListFoodsContainer