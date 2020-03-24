import React from 'react'
import {
  Switch, Route, Link
} from 'react-router-dom'
import ListFoodPacks from '../../FoodPack/presentational/ListFoodPacks'
import Description from './Description'
import Food from '../../Food/presentational/Food'
import Ingredient from '../../Ingredient/presentational/Ingredient'
import FoodPack from '../../FoodPack/presentational/FoodPack'
import ListFoodsContainer from '../../Food/containers/ListFoodsContainer'
import ListIngredientsContainer from '../../Ingredient/containers/ListIngredientsContainer'

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
          <FoodPack />
        </Route>
        <Route path='/ruokapaketit'>
          <ListFoodPacks />
        </Route>
        <Route path='/ruoat/:name'>
          <Food />
        </Route>
        <Route path='/ruoat'>
          <ListFoodsContainer />
        </Route>
        <Route path='/ainesosat/:name'>
          <Ingredient />
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