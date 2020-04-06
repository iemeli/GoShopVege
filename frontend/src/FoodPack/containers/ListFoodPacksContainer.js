import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_FOODPACKS } from '../queries'
import ListFoodPacks from '../presentational/ListFoodPacks'
import { Link } from 'react-router-dom'
import {
  useApolloClient
} from '@apollo/client'

const ListFoodPacksContainer = () => {
  const foodPacksResult = useQuery(ALL_FOODPACKS)
  const client = useApolloClient()
  
  
  if (foodPacksResult.loading) {
    return (
      <div>...loading</div>
    )
  }

  const dataInStore = client.readQuery({ query: ALL_FOODPACKS })
  const foodPacks = dataInStore.allFoodPacks

  return (
    <div>
      <h3>
        Ruokapaketit
        <small style={{paddingLeft: 10}}>
          <Link to="/ruokapaketit/uusi">luo uusi ruokapaketti</Link>
        </small>
      </h3>
      <ListFoodPacks foodPacks={foodPacks} />
    </div>
  )
}

export default ListFoodPacksContainer