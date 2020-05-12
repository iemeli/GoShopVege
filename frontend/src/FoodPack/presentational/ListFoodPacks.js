import React from 'react'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import ShopListButton from '../../ShopList/ShopListButton'

const ListFoodPacks = props => (
  <div>
    <Container>
      <Row>
        {props.foodPacks.map(fp => (
          <Card
            style={{ width: '18rem', background: '#88feff', margin: '1rem' }}
            key={fp.id}
            border="secondary"
          >
            <Card.Header>Ruokapaketti</Card.Header>
            <Card.Body>
              <Card.Title>{fp.name}</Card.Title>
              <Card.Body>
                {fp.foods.map(f => (
                  <div key={f.id}>{f.name}</div>
                ))}
              </Card.Body>
              <Button
                variant="primary"
                onClick={() => props.history.push(`/ruokapaketit/${fp.name}`)}
              >
                Näytä
              </Button>
              <ShopListButton mode="ADD" id={fp.id} object="foodPacks" />
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
  </div>
)

export default ListFoodPacks
