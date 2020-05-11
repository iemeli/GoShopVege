import React from 'react'
import { connect } from 'react-redux'
import { useQuery } from '@apollo/client'
import { ALL_INGREDIENTS } from '../Ingredient/queries'
import { ALL_FOODS } from '../Food/queries'
import { ALL_FOODPACKS } from '../FoodPack/queries'
import { removeItem, emptyShopList } from '../redux/shopListReducer'
import IngredientCard from '../Ingredient/presentational/ShopListCard'
import FoodCard from '../Food/presentational/ShopListCard'
import FoodPackCard from '../FoodPack/presentational/ShopListCard'

const ShopList = props => {
  const ingredientsResult = useQuery(ALL_INGREDIENTS)
  const foodsResult = useQuery(ALL_FOODS)
  const foodPacksResult = useQuery(ALL_FOODPACKS)

  if (
    ingredientsResult.loading ||
    foodsResult.loading ||
    foodPacksResult.loading
  ) {
    return <div>...loading</div>
  }

  const foodPacks = foodPacksResult.data.allFoodPacks.filter(fp =>
    props.items.includes(fp.id)
  )
  const foods = foodsResult.data.allFoods.filter(f =>
    props.items.includes(f.id)
  )
  const ingredients = ingredientsResult.data.allIngredients.filter(i =>
    props.items.includes(i.id)
  )

  return (
    <div>
      <h2>Ostoslista</h2>
      <h3>Valitut Ruokapaketit</h3>
      {foodPacks.map(fp => (
        <FoodPackCard foodPack={fp} key={fp.id} buttons />
      ))}
      <h3>Valitut Ruoat</h3>
      {foods.map(f => (
        <FoodCard food={f} key={f.id} buttons />
      ))}
      <h3>Valitut Ainesosat</h3>

      {ingredients.map(i => (
        <IngredientCard ingredient={i} key={i.id} buttons />
      ))}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    items: state.shopList,
  }
}

export default connect(mapStateToProps, { removeItem, emptyShopList })(ShopList)
