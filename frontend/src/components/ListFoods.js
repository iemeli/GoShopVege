import React from 'react'

const ListFoods = ({ foods }) => {
  return (
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
          <th>
            Ainesosat
          </th>
        </tr>
        {foods.map(f =>
          <tr key={f.id}>
            <td>{f.name}</td>
            <td>{f.price}€</td>
            <td>{f.kiloCalories}</td>
            <td><ul>{f.ingredients.map(i => 
              <li key={i.id}>
                {i.name}
              </li>
            )}</ul></td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default ListFoods