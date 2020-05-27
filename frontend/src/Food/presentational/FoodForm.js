/* eslint-disable no-nested-ternary */
import React from 'react'
import {
  Form,
  Button,
  Dropdown,
  DropdownButton,
  Table,
  ListGroup,
} from 'react-bootstrap'

const FoodForm = ({
  toggleUnit,
  changeFoodIngredientValue,
  recipe,
  foodIngredients,
  ingredients,
  handleSelect,
  removeFoodIngredient,
  addStep,
  removeStep,
  submit,
  step,
  food,
  name,
}) => {
  return (
    <div>
      <Form onSubmit={submit}>
        <Form.Group>
          <Button variant="success" type="submit">
            {food ? 'päivitä' : 'lisää ruoka'}
          </Button>
          <br />
          <br />
          <Form.Label>Ruoan nimi</Form.Label>
          <Form.Control {...name} />
          <Form.Label>Resepti</Form.Label>
          <Form.Control {...step} />
          <Button onClick={addStep}>lisää reseptiin</Button>
        </Form.Group>
      </Form>
      <ListGroup>
        {recipe.map(row => (
          <ListGroup.Item key={row.id}>
            <li>
              {row.value}
              <Button variant="light" id={row.id} onClick={removeStep}>
                poista
              </Button>
            </li>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <br />
      <h6>AINESOSAT</h6>
      <DropdownButton id="dropdown-basic-button" title="Lisää ainesosa">
        {ingredients.map(i => (
          <Dropdown.Item key={i.id} eventKey={i.id} onSelect={handleSelect}>
            {i.name}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      <Table>
        <thead>
          <tr>
            <th>nimi</th>
            <th>hintahaarukka (€)</th>
            <th>määrä</th>
            <th>yksikkö</th>
          </tr>
        </thead>
        <tbody>
          {foodIngredients.map(fi => (
            <tr key={fi.id}>
              <td>{fi.item.name}</td>
              <td>
                {fi.item.priceRange.min}€ - {fi.item.priceRange.max}€
              </td>
              <td>
                <input
                  type="number"
                  min="1"
                  id={fi.id}
                  value={fi.value}
                  onChange={event => changeFoodIngredientValue(event)}
                  style={{ width: '80px' }}
                />
              </td>
              <td>
                {fi.onlyGrams === true ? (
                  <Button disabled variant="dark">
                    grammaa
                  </Button>
                ) : fi.unit === 'pieces' ? (
                  <Button variant="info" id={fi.id} onClick={toggleUnit}>
                    kappaletta
                  </Button>
                ) : (
                  <Button variant="secondary" id={fi.id} onClick={toggleUnit}>
                    grammaa
                  </Button>
                )}
              </td>
              <td>
                <Button
                  variant="light"
                  id={fi.id}
                  onClick={removeFoodIngredient}
                >
                  poista
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default FoodForm
