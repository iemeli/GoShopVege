import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useQuery } from '@apollo/client'
import Card from 'react-bootstrap/Card'
import Nav from 'react-bootstrap/Nav'
import { ALL_INGREDIENTS } from '../../Ingredient/queries'
import { ALL_FOODS } from '../../Food/queries'
import { ALL_FOODPACKS } from '../../FoodPack/queries'
import EmptyShopListButton from '../EmptyShopListButton'
import Overview from '../presentational/Overview'
import ShopList from '../presentational/ShopList'

const ShopListContainer = props => {
  const [showView, setShowView] = useState('overview')
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

  const shopListArray = props.shopListIds.map(slid => {
    const result = ingredientsResult.data.allIngredients.find(
      ingr => ingr.id === slid.id
    )
    return { ...result, multiplier: slid.count }
  })

  shopListArray.sort((a, b) => {
    const nameA = a.name.toLowerCase()
    const nameB = b.name.toLowerCase()
    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }
    return 0
  })

  return (
    <Card>
      <Card.Header>
        <h2>
          Ostoslista
          <EmptyShopListButton />
        </h2>
        <Nav variant="tabs" defaultActiveKey="#yleisnäkymä">
          <Nav.Item>
            <Nav.Link
              href="#yleisnäkymä"
              onSelect={() => setShowView('overview')}
            >
              Yleisnäkymä
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#lista" onSelect={() => setShowView('shoplist')}>
              Lista
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      <Card.Body>
        {showView === 'overview' && (
          <Overview
            foodPacks={foodPacks}
            foods={foods}
            ingredients={ingredients}
          />
        )}
        {showView === 'shoplist' && <ShopList shopList={shopListArray} />}
      </Card.Body>
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
