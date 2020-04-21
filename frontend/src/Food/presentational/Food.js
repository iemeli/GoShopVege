import React from 'react'
import ListIngredients from '../../Ingredient/presentational/ListIngredients'
import DeleteFoodButton from '../utils/DeleteFoodButton'
import UpdateFoodButton from '../utils/UpdateFoodButton'

const Food = ({ food, setAlert }) => (
  <div>
    <h3>
      {food.name}
      <UpdateFoodButton food={food} />
      <DeleteFoodButton food={food} />
    </h3>
    <table>
      <tbody>
        <tr>
          <th>Hinta:</th>
          <td>{food.price} €</td>
        </tr>
        <tr>
          <th>Kilokalorit:</th>
          <td>{food.kcal}</td>
        </tr>
      </tbody>
    </table>
    <br />
    <ListIngredients
      ingredients={food.ingredients.map(i => i.item)}
      hideButtons={true}
      setAlert={setAlert}
    />
    <br />
    <strong>resepti</strong>
    {food.recipe.map(step => (
      <ul key={step}>
        <li>{step}</li>
      </ul>
    ))}
  </div>
)

export default Food
