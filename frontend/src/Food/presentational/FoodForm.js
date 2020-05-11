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
  toggleUsedAtOnce,
  recipe,
  foodIngredients,
  ingredients,
  handleSelect,
  removeIngredient,
  addStep,
  removeStep,
  submit,
  step,
  food,
  name,
}) => (
  <div>
    <Form onSubmit={submit}>
      <Form.Group>
        <Button variant="primary" type="submit">
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
          <th>
            <h6>AINESOSAT</h6>
          </th>
          <th>nimi</th>
          <th>hinta (€)</th>
          <th>kcal</th>
          <th>menee kerralla</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {foodIngredients.map(fi => (
          <tr key={fi.id}>
            <td></td>
            <td>{fi.item.name}</td>
            <td>{fi.item.price.toFixed(2)}</td>
            <td>{fi.item.kcal}</td>
            <td>
              {fi.usedAtOnce ? (
                <Button variant="success" id={fi.id} onClick={toggleUsedAtOnce}>
                  kyllä
                </Button>
              ) : (
                <Button variant="danger" id={fi.id} onClick={toggleUsedAtOnce}>
                  ei
                </Button>
              )}
            </td>
            <td>
              <Button variant="light" id={fi.id} onClick={removeIngredient}>
                poista
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
)

export default FoodForm
