import React from 'react'
import ShopListCard from './ShopListCard'

const ListFoodPacks = props => (
  <div>
    {props.foodPacks.map(fp => (
      <ShopListCard foodPack={fp} id={fp.id} buttons />
    ))}
  </div>
)

export default ListFoodPacks
