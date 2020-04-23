import React from 'react'
import FoodPackRow from './FoodPackRow'

const ListFoodPacks = ({ foodPacks, setAlert }) => (
  <div>
    <table>
      <tbody>
        <tr>
          <th>Nimi</th>
          <th>Hinta</th>
          <th>Kilokalorit</th>
          <th>Ruoat</th>
        </tr>
        {foodPacks.map(fp => (
          <FoodPackRow foodPack={fp} key={fp.id} setAlert={setAlert} />
        ))}
      </tbody>
    </table>
  </div>
)

export default ListFoodPacks
