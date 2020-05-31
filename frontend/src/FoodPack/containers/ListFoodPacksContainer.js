import React from 'react'
import { useQuery } from '@apollo/client'
import { Link, useHistory } from 'react-router-dom'
import { ALL_FOODPACKS } from '../queries'
import ListFoodPacks from '../presentational/ListFoodPacks'

const ListFoodPacksContainer = () => {
  const foodPacksResult = useQuery(ALL_FOODPACKS)
  const history = useHistory()

  if (foodPacksResult.loading) {
    return <div>...loading</div>
  }
  const foodPacks = foodPacksResult.data.allFoodPacks

  return (
    <div>
      <h3>
        Ruokapaketit
        <small style={{ paddingLeft: 10 }}>
          <Link to="/ruokapaketit/uusi">luo uusi ruokapaketti</Link>
        </small>
      </h3>
      <ListFoodPacks foodPacks={foodPacks} history={history} />
    </div>
  )
}

export default ListFoodPacksContainer
