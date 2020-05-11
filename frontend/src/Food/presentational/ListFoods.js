import React from 'react'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import ShopListButton from '../../general/ShopListButton.js'

const ListFoods = ({ foods, history }) => (
  <div>
    <Container>
      <Row>
        {foods.map(f => (
          <Card
            style={{ width: '18rem', background: '#99ff99', margin: '1rem' }}
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
              <ShopListButton mode="ADD" id={f.id} />
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
  </div>
)

export default ListFoods
