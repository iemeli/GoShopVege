import React from 'react'
import { connect } from 'react-redux'
import { useQuery } from '@apollo/client'
import Card from 'react-bootstrap/Card'
import { ALL_INGREDIENTS } from '../Ingredient/queries'
import { ALL_FOODS } from '../Food/queries'
import { ALL_FOODPACKS } from '../FoodPack/queries'
import { removeItem, emptyShopList } from '../redux/shopListReducer'

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
      {foodPacks.map(fp => (
        <Card style={{ background: '#88feff' }} key={fp.id} border="secondary">
          <Card.Header>Ruokapaketti</Card.Header>
          <Card.Body>
            <Card.Title>{fp.name}</Card.Title>
            {fp.foods.map(f => (
              <Card
                style={{ background: '#99ff99' }}
                key={f.id}
                border="success"
              >
                <Card.Header>Ruoka</Card.Header>
                <Card.Body>
                  {f.ingredients.map(i => (
                    <div key={i.id}>{i.item.name}</div>
                  ))}
                </Card.Body>
              </Card>
            ))}
          </Card.Body>
        </Card>
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
