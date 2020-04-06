import React from 'react'
import FoodRow from './FoodRow'

const ListFoods = ({ foods }) => (
  <div>
    <table>
      <tbody>
        <tr>
          <th>
            Nimi
        </th>
          <th>
            Hinta
        </th>
          <th>
            Kilokalorit
        </th>
        </tr>
        {foods.map(f =>
          <FoodRow food={f} key={f.id} />
        )}
      </tbody>
    </table>
  </div>
)


export default ListFoods