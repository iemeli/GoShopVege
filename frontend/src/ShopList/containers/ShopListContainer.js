import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useQuery } from '@apollo/client'
import Card from 'react-bootstrap/Card'
import { ALL_INGREDIENTS } from '../../Ingredient/queries'
import { ALL_FOODS } from '../../Food/queries'
import { ALL_FOODPACKS } from '../../FoodPack/queries'
import ClearShopListButton from '../ClearShopListButton'
import Overview from '../presentational/Overview'
import ShopList from '../presentational/ShopList'

const ShopListContainer = props => {
  const [showOveriew, setShowOverview] = useState(true)
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
  // { objects: [ {ingr, count} ] ,ids: [array] }
  const shopListArray = props.shopListIds.map(slid => {
    const result = ingredientsResult.data.allIngredients.find(
      ingr => ingr.id === slid.id
    )
    return { ...result, multiplier: slid.count }
  })

  // foodPacks.forEach(fp => {
  //   fp.foods.forEach(f => {
  //     f.ingredients.forEach(i => {
  //       if (shopListObject.ids.includes(i.item.id)) {
  //         shopListObject.objects.some(o => {
  //           if (o.id === i.item.id) {
  //             // eslint-disable-next-line no-param-reassign
  //             o = { ...o, multiplier: o.multiplier + fp.multiplier }
  //             return true
  //           }
  //           return false
  //         })
  //       } else {
  //         shopListObject.objects.push({ ...i.item, multiplier: 1 })
  //         shopListObject.ids.push(i.item.id)
  //       }
  //     })
  //   })
  // })

  // foods.forEach(f => {
  //   f.ingredients.forEach(i => {
  //     if (shopListObject.ids.includes(i.item.id)) {
  //       shopListObject.objects.some(o => {
  //         if (o.id === i.item.id) {
  //           // eslint-disable-next-line no-param-reassign
  //           o = { ...o, multiplier: o.multiplier + f.multiplier }
  //           return true
  //         }
  //         return false
  //       })
  //     } else {
  //       shopListObject.objects.push({ ...i.item, multiplier: 1 })
  //       shopListObject.ids.push(i.item.id)
  //     }
  //   })
  // })

  // ingredients.forEach(i => {
  //   if (shopListObject.ids.includes(i.item.id)) {
  //     shopListObject.objects.some(o => {
  //       if (o.id === i.item.id) {
  //         // eslint-disable-next-line no-param-reassign
  //         o = { ...o, multiplier: o.multiplier + i.multiplier }
  //         return true
  //       }
  //       return false
  //     })
  //   } else {
  //     shopListObject.objects.push({ ...i.item, multiplier: 1 })
  //     shopListObject.ids.push(i.item.id)
  //   }
  // })

  return (
    <Card>
      <h2>
        Ostoslista
        <ClearShopListButton />
      </h2>
      <ShopList shopList={shopListArray} />
      {/* <Overview foodPacks={foodPacks} foods={foods} ingredients={ingredients} /> */}
    </Card>
  )
}

const mapStateToProps = state => {
  return {
    foodPacks: state.shopList.foodPacks,
    foods: state.shopList.foods,
    ingredients: state.shopList.ingredients,
    shopListIds: state.shopList.shopListIds,
  }
}

export default connect(mapStateToProps)(ShopListContainer)
