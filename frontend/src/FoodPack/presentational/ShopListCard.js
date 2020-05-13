import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router-dom'
import FoodCard from '../../Food/presentational/ShopListCard'
import ShopListButton from '../../ShopList/ShopListButton'

const ShopListCard = ({ foodPack, buttons }) => {
  console.log('täs foodPack', foodPack)
  const history = useHistory()
  return (
    <div>
      <Card style={{ background: '#88feff' }} border="secondary">
        <Card.Header>
          Ruokapaketti
          {buttons && (
            <div>
              <Button
                variant="primary"
                onClick={() => history.push(`/ruokapaketit/${foodPack.name}`)}
              >
                Näytä
              </Button>
              <ShopListButton
                mode="REMOVE"
                object={foodPack}
                set="foodPacks"
                key={`${foodPack.id}_button`}
              />
            </div>
          )}
        </Card.Header>
        <Card.Body>
          <Card.Title>
            {foodPack.name}{' '}
            {foodPack.multiplier > 1 && (
              <h2>
                <strong>x{foodPack.multiplier}</strong>
              </h2>
            )}
          </Card.Title>
          {foodPack.foods.map(f => (
            <FoodCard food={f} key={f.id} />
          ))}
        </Card.Body>
      </Card>
    </div>
  )
}

export default ShopListCard
