import React, { useState } from 'react'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import { useQuery } from '@apollo/client'
import { Link, useHistory } from 'react-router-dom'
import { ALL_FOODPACKS } from '../queries'
import { ALL_GROCERYSTORES } from '../../GroceryStore/queries'
import ListFoodPacks from '../presentational/ListFoodPacks'

const ListFoodPacksContainer = () => {
  const foodPacksResult = useQuery(ALL_FOODPACKS)
  const groceryStoresResult = useQuery(ALL_GROCERYSTORES)
  const [store, setStore] = useState('Lidl')
  const history = useHistory()

  if (foodPacksResult.loading || groceryStoresResult.loading) {
    return <div>...loading</div>
  }
  const foodPacks = foodPacksResult.data.allFoodPacks

  const groceryStores = groceryStoresResult.data.allGroceryStores

  return (
    <div>
      <div className="grocery_store_buttons">
        <h3>Näytä ruokapaketit kaupasta</h3>
        <br />

        <ButtonGroup>
          {groceryStores.map(gs => (
            <Button key={gs.id} onClick={() => setStore(gs.name)}>
              {gs.name}
            </Button>
          ))}
        </ButtonGroup>
      </div>
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
