import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import IngredientCard from '../../Ingredient/presentational/ShopListCard'
import ShopListButton from '../../ShopList/ShopListButton'

const StyledHeader = styled(Card.Header)`
  display: inline-block;
`

const StyledShopListButton = styled(ShopListButton)`
  display: inline-block;
`

const StyledButton = styled(Button)`
  display: inline-block;
`

const ShopListCard = ({ food, buttons }) => {
  const history = useHistory()
  return (
    <div>
      <Card style={{ background: '#99ff99' }} border="success">
        <StyledHeader>
          Ruoka
          {buttons && (
            <div style={{ display: 'inline-block' }}>
              <StyledButton
                variant="primary"
                onClick={() => history.push(`/ruoat/${food.name}`)}
              >
                Näytä
              </StyledButton>
              <StyledShopListButton
                mode="REMOVE"
                object={food}
                set="foods"
                key={`${food.id}_button`}
              />
            </div>
          )}
        </StyledHeader>
        <Card.Body>
          <Card.Title>
            {food.name}{' '}
            {food.multiplier > 1 && (
              <h2>
                <strong>x{food.multiplier}</strong>
              </h2>
            )}
          </Card.Title>
          {food.ingredients.map(i => (
            <IngredientCard ingredient={i.item} key={i.id} />
          ))}
        </Card.Body>
      </Card>
    </div>
  )
}

export default ShopListCard
