import React from 'react'
import { useQuery, useApolloClient } from '@apollo/client'
import { Link } from 'react-router-dom'
import { ALL_FOODPACKS } from '../queries'
import ListFoodPacks from '../presentational/ListFoodPacks'

const ListFoodPacksContainer = ({ setAlert }) => {
  const foodPacksResult = useQuery(ALL_FOODPACKS)
  const client = useApolloClient()

  if (foodPacksResult.loading) {
    return <div>...loading</div>
  }

  const dataInStore = client.readQuery({ query: ALL_FOODPACKS })
  const foodPacks = dataInStore.allFoodPacks

  return (
    <div>
      <h3>
        Ruokapaketit
        <small style={{ paddingLeft: 10 }}>
          <Link to="/ruokapaketit/uusi">luo uusi ruokapaketti</Link>
        </small>
      </h3>
      <ListFoodPacks foodPacks={foodPacks} setAlert={setAlert} />
    </div>
  )
}

export default ListFoodPacksContainer
