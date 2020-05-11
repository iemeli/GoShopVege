import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Description from './Description'
import ListFoodsContainer from '../../Food/containers/ListFoodsContainer'
import ListIngredientsContainer from '../../Ingredient/containers/ListIngredientsContainer'
import IngredientContainer from '../../Ingredient/containers/IngredientContainer'
import FoodContainer from '../../Food/containers/FoodContainer'
import ListFoodPacksContainer from '../../FoodPack/containers/ListFoodPacksContainer'
import FoodPackContainer from '../../FoodPack/containers/FoodPackContainer'
import NewIngredient from '../../Ingredient/Forms/NewIngredient'
import UpdateFood from '../../Food/containers/UpdateFood'
import NewFood from '../../Food/containers/NewFood'
import NewFoodPack from '../../FoodPack/containers/NewFoodPack'
import UpdateFoodPack from '../../FoodPack/containers/UpdateFoodPack'
import ShopList from '../../ShopList/ShopList'
const Routes = () => {
  return (
    <div>
      <Switch>
        <Route path="/ostoslista">
          <ShopList />
        </Route>
        <Route path="/ruokapaketit/paivita/:name">
          <UpdateFoodPack />
        </Route>
        <Route path="/ruokapaketit/uusi">
          <NewFoodPack />
        </Route>
        <Route path="/ruokapaketit/:name">
          <FoodPackContainer />
        </Route>
        <Route path="/ruokapaketit">
          <ListFoodPacksContainer />
        </Route>
        <Route path="/ruoat/paivita/:name">
          <UpdateFood />
        </Route>
        <Route path="/ruoat/uusi">
          <NewFood />
        </Route>
        <Route path="/ruoat/:name">
          <FoodContainer />
        </Route>
        <Route path="/ruoat">
          <ListFoodsContainer />
        </Route>
        <Route path="/ainesosat/uusi">
          <NewIngredient />
        </Route>
        <Route path="/ainesosat/:name">
          <IngredientContainer />
        </Route>
        <Route path="/ainesosat">
          <ListIngredientsContainer />
        </Route>
        <Route exact path="/">
          <Description />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  )
}

export default Routes
