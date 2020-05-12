import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'

const ShopList = ({ shopList }) => (
  <ListGroup variant="flush">
    {shopList.map(i => (
      <ListGroup.Item key={i.id}>
        {i.name} / x{i.multiplier}
      </ListGroup.Item>
    ))}
  </ListGroup>
)

export default ShopList
