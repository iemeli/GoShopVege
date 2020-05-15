import React from 'react'
import Card from 'react-bootstrap/Card'
import ListIngredients from '../../Ingredient/presentational/ListIngredients'
import DeleteFoodButton from '../utils/DeleteFoodButton'
import UpdateFoodButton from '../utils/UpdateFoodButton'
import ShopListButton from '../../ShopList/ShopListButton'
import '../../css/contentCard.css'

const Food = ({ food }) => (
  <div>
    <Card className="foodCard" style={{ padding: 30 }}>
      <h3>
        {food.name}
        <UpdateFoodButton food={food} />
        <DeleteFoodButton food={food} />
        <ShopListButton mode="ADD" object={food} set="foods" />
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
      />
      <br />
      <strong>resepti</strong>
      {food.recipe.map(step => (
        <ul key={step}>
          <li>{step}</li>
        </ul>
      ))}
    </Card>
  </div>
)

export default Food
