import React from 'react'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Button from 'react-bootstrap/Button'

const ListFoodPacks = ({ foodPacks, history }) => (
  <div>
    <CardDeck>
      {foodPacks.map(fp => (
        <Card style={{ width: '18rem' }} key={fp.id}>
          <Card.Body>
            <Card.Title>{fp.name}</Card.Title>
            <Card.Body>
              {fp.foods.map(f => (
                <div key={f.id}>{f.name}</div>
              ))}
            </Card.Body>
            <Button
              variant="primary"
              onClick={() => history.push(`/ruokapaketit/${fp.name}`)}
            >
              Näytä
            </Button>
          </Card.Body>
        </Card>
      ))}
    </CardDeck>
  </div>
)

export default ListFoodPacks
