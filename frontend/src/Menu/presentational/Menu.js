import React from 'react'
import {
  Switch, Route, Link
} from 'react-router-dom'
import Description from './Description'
import ListFoodsContainer from '../../Food/containers/ListFoodsContainer'
import ListIngredientsContainer from '../../Ingredient/containers/ListIngredientsContainer'
import IngredientContainer from '../../Ingredient/containers/IngredientContainer'
import FoodContainer from '../../Food/containers/FoodContainer'
import ListFoodPacksContainer from '../../FoodPack/containers/ListFoodPacksContainer'
import FoodPackContainer from '../../FoodPack/containers/FoodPackContainer'

const Menu = () => {
  return (
    <div>
      <div>
        <Link style={{ padding: 5 }} to='/'>Etusivu</Link>
        <Link style={{ padding: 5 }} to='/ruokapaketit'>Ruokapaketit</Link>
        <Link style={{ padding: 5 }} to='/ruoat'>Ruoat</Link>
        <Link style={{ padding: 5 }} to='/ainesosat'>Ainesosat</Link>
      </div>
      <Switch>
        <Route path='/ruokapaketit/:name'>
          <FoodPackContainer />
        </Route>
        <Route path='/ruokapaketit'>
          <ListFoodPacksContainer />
        </Route>
        <Route path='/ruoat/:name'>
          <FoodContainer />
        </Route>
        <Route path='/ruoat'>
          <ListFoodsContainer />
        </Route>
        <Route path='/ainesosat/:name'>
          <IngredientContainer />
        </Route>
        <Route path='/ainesosat'>
          <ListIngredientsContainer />
        </Route>
        <Route path='/'>
          <Description />
        </Route>
      </Switch>
    </div>
  )
}

export default Menu