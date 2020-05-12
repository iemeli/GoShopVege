import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import ShopListButton from '../../ShopList/ShopListButton'

const StyledItem = styled(ListGroup.Item)`
  background: #ff99cc;
`

const ShopListCard = ({ ingredient, buttons }) => {
  const history = useHistory()
  return (
    <div>
      <ListGroup horizontal style={{ margin: '0.1rem' }}>
        <StyledItem>{ingredient.name}</StyledItem>
        {/* eslint-disable-next-line no-irregular-whitespace */}
        <StyledItem>{ingredient.price.toFixed(2)} €</StyledItem>
        <StyledItem>{ingredient.kcal} kcal</StyledItem>
        {ingredient.multiplier > 1 && (
          <StyledItem>
            <h2>
              <strong>x{ingredient.multiplier}</strong>
            </h2>
          </StyledItem>
        )}
        {buttons && (
          <StyledItem>
            <Button
              variant="primary"
              onClick={() => history.push(`/ainesosat/${ingredient.name}`)}
            >
              Näytä
            </Button>
          </StyledItem>
        )}
        {buttons && (
          <StyledItem>
            <ShopListButton
              mode="REMOVE"
              id={ingredient.id}
              key={`${ingredient.id}_button`}
              object="ingredients"
            />
          </StyledItem>
        )}
      </ListGroup>
    </div>
  )
}

export default ShopListCard
