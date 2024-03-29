import React from 'react'
import { Form, Button, Dropdown, DropdownButton, Table } from 'react-bootstrap'

const FoodPackForm = ({
  submit,
  name,
  foodsForDropdown,
  foods,
  handleSelect,
  removeFood,
  foodPack,
}) => (
  <div>
    <Form onSubmit={submit}>
      <Form.Group>
        <Button type="submit">
          {foodPack ? 'Päivitä' : 'Lisää ruokapaketti'}
        </Button>
        <br />
        <br />
        <Form.Label>Ruokapaketin nimi</Form.Label>
        <Form.Control {...name} />
      </Form.Group>
    </Form>
    <h6>RUOAT</h6>
    <DropdownButton
      id="dropdown-basic-button"
      title="Lisää ruoka"
      flip="offset"
      preventoverflow="padding"
    >
      {foodsForDropdown.map(f => (
        <Dropdown.Item key={f.id} eventKey={f.id} onSelect={handleSelect}>
          {f.name}
        </Dropdown.Item>
      ))}
    </DropdownButton>
    <Table>
      <thead>
        <tr>
          <th>nimi</th>
          <th>hintahaarukka</th>
          <th>kcal</th>
          <th>ainesosat</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {foods.map(f => (
          <tr key={f.id}>
            <td>{f.name}</td>
            <td>
              {f.priceRange.min.toFixed(2)} € - {f.priceRange.max.toFixed(2)} €
            </td>
            <td>{f.kcal}</td>
            <td>
              <DropdownButton
                id="dropdown-basic-button"
                title="Näytä"
                flip="offset"
                preventoverflow="padding"
              >
                {f.ingredients
                  .map(i => i.item)
                  .map(i => (
                    <Dropdown.Item key={i.id}>{i.name}</Dropdown.Item>
                  ))}
              </DropdownButton>
            </td>
            <td>
              <Button variant="light" id={f.id} onClick={removeFood}>
                poista
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
)

export default FoodPackForm
