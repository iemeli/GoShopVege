import React from 'react'
import Button from 'react-bootstrap/Button'
import ShopListButton from '../../ShopList/ShopListButton'
import '../../css/contentCard.css'

const ListFoodPacks = props => (
  <div>
    {props.foodPacks.map(fp => (
      <div
        className="foodPackCard"
        style={{ width: '18rem', margin: '1rem' }}
        key={fp.id}
      >
        {fp.name}
      </div>
    ))}
  </div>
)

export default ListFoodPacks
