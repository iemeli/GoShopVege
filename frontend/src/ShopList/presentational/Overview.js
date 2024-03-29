import React from 'react'
import IngredientCard from '../../Ingredient/presentational/ShopListCard'
import FoodCard from '../../Food/presentational/ShopListCard'
import FoodPackCard from '../../FoodPack/presentational/ShopListCard'

const Overview = ({ ingredients, foods, foodPacks }) => {
  return (
    <div>
      <h3>Valitut Ruokapaketit</h3>
      {foodPacks.length === 0 && <div>Ei valittuja ruokapaketteja</div>}
      {foodPacks.map(fp => (
        <FoodPackCard foodPack={fp} key={fp.id} buttons />
      ))}
      <h3>Valitut Ruoat</h3>
      {foods.length === 0 && <div>Ei valittuja ruokia</div>}
      {foods.map(f => (
        <FoodCard food={f} key={f.id} buttons />
      ))}
      <h3>Valitut Ainesosat</h3>
      {ingredients.length === 0 && <div>Ei valittuja ainesosia</div>}
      {ingredients.map(i => (
        <IngredientCard ingredient={i} key={i.id} buttons />
      ))}
    </div>
  )
}

export default Overview
