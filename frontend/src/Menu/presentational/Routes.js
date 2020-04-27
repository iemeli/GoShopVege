import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import GlobalAlert from '../../general/GlobalAlert'
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

const Routes = () => {
  const alertRef = React.createRef()

  const setAlert = (variant, message) => {
    // alertRef.current.setAlert(variant, message)
    console.log(variant, message)
  }

  return (
    <div>
      <GlobalAlert ref={alertRef} />
      <Switch>
        <Route path="/ruokapaketit/paivita/:name">
          <UpdateFoodPack setAlert={setAlert} />
        </Route>
        <Route path="/ruokapaketit/uusi">
          <NewFoodPack setAlert={setAlert} />
        </Route>
        <Route path="/ruokapaketit/:name">
          <FoodPackContainer setAlert={setAlert} />
        </Route>
        <Route path="/ruokapaketit">
          <ListFoodPacksContainer setAlert={setAlert} />
        </Route>
        <Route path="/ruoat/paivita/:name">
          <UpdateFood setAlert={setAlert} />
        </Route>
        <Route path="/ruoat/uusi">
          <NewFood setAlert={setAlert} />
        </Route>
        <Route path="/ruoat/:name">
          <FoodContainer setAlert={setAlert} />
        </Route>
        <Route path="/ruoat">
          <ListFoodsContainer setAlert={setAlert} />
        </Route>
        <Route path="/ainesosat/uusi">
          <NewIngredient setAlert={setAlert} />
        </Route>
        <Route path="/ainesosat/:name">
          <IngredientContainer setAlert={setAlert} />
        </Route>
        <Route path="/ainesosat">
          <ListIngredientsContainer setAlert={setAlert} />
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
