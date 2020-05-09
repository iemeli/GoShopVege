import React from 'react'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Button from 'react-bootstrap/Button'

const ListFoods = ({ foods, history }) => (
  <div>
    <CardDeck>
      {foods.map(f => (
        <Card
          style={{ width: '18rem', background: '#99ff99' }}
          key={f.id}
          border="success"
        >
          <Card.Header>Ruoka</Card.Header>
          <Card.Body>
            <Card.Title>{f.name}</Card.Title>
            <Card.Body>
              {f.ingredients.map(i => (
                <div key={i.item.id}>{i.item.name}</div>
              ))}
            </Card.Body>
            <Button
              variant="primary"
              onClick={() => history.push(`/ruoat/${f.name}`)}
            >
              Näytä
            </Button>
          </Card.Body>
        </Card>
      ))}
    </CardDeck>
  </div>
)

export default ListFoods
