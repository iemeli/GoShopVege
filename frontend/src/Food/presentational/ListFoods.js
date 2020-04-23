import React from 'react'
import FoodRow from './FoodRow'

const ListFoods = ({ foods, hideButtons, setAlert }) => (
  <div>
    <table>
      <tbody>
        <tr>
          <th>Nimi</th>
          <th>Hinta</th>
          <th>Kilokalorit</th>
        </tr>
        {foods.map(f => (
          <FoodRow
            food={f}
            key={f.id}
            hideButtons={hideButtons}
            setAlert={setAlert}
          />
        ))}
      </tbody>
    </table>
  </div>
)

export default ListFoods
