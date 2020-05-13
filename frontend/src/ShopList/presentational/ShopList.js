import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'

const ShopList = ({ shopList }) => {
  if (shopList.length === 0) {
    return <h4>Ostoslista on tyhjä!</h4>
  }
  return (
    <ListGroup variant="flush">
      {shopList.map(i => (
        <ListGroup.Item key={i.id}>
          {i.name} / {i.price.toFixed(2)} € {i.kcal && `/ ${i.kcal} kcal`} /
          <strong> x{i.multiplier}</strong>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default ShopList
