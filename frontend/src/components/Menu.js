import React from 'react'
import {
  Switch, Route, Link
} from 'react-router-dom'
import ListFoodPacks from './ListFoodPacks'
import ListFoods from './ListFoods'
import ListIngredients from './ListIngredients'
import Description from './Description'
import Food from './Food'
import Ingredient from './Ingredient'

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
        <Route path='/ruokapaketit'>
          <ListFoodPacks />
        </Route>
        <Route path='/ruoat/:name'>
          <Food />
        </Route>
        <Route path='/ruoat'>
          <ListFoods />
        </Route>
        <Route path='/ainesosat/:name'>
          <Ingredient />
        </Route>
        <Route path='/ainesosat'>
          <ListIngredients />
        </Route>
        <Route path='/'>
          <Description />
        </Route>
      </Switch>
    </div>
  )
}

export default Menu