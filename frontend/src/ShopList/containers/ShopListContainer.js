import React from 'react'
import { connect } from 'react-redux'
import { useQuery } from '@apollo/client'
import { ALL_INGREDIENTS } from '../../Ingredient/queries'
import { ALL_FOODS } from '../../Food/queries'
import { ALL_FOODPACKS } from '../../FoodPack/queries'
import ClearShopListButton from '../ClearShopListButton'
import Overview from '../presentational/Overview'

const ShopListContainer = props => {
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

  // tee täs niin että luo array jossa on foodPack objekteja
  // joissa on messissä "multiplier" property, mikäli
  // niitä löytyy enemmän kuin yksi -> tällöin saadaan
  // rendattua oikean näköinen lista

  const foodPacks = props.foodPacks.map(fp => {
    const result = foodPacksResult.data.allFoodPacks.find(
      foodPack => foodPack.id === fp.id
    )
    return { ...result, multiplier: fp.count }
  })

  const foods = props.foods.map(f => {
    const result = foodsResult.data.allFoods.find(food => food.id === f.id)
    return { ...result, multiplier: f.count }
  })

  const ingredients = props.ingredients.map(i => {
    const result = ingredientsResult.data.allIngredients.find(
      ingr => ingr.id === i.id
    )
    return { ...result, multiplier: i.count }
  })

  return (
    <div>
      <h2>
        Ostoslista
        <ClearShopListButton />
      </h2>
      <Overview foodPacks={foodPacks} foods={foods} ingredients={ingredients} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    foodPacks: state.shopList.foodPacks,
    foods: state.shopList.foods,
    ingredients: state.shopList.ingredients,
  }
}

export default connect(mapStateToProps)(ShopListContainer)
