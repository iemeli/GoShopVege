import React from 'react'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import Container from 'react-bootstrap/Container'
import useEpicSubscription from './general/useEpicSubscription'
import Menu from './Menu/presentational/Menu'
import Routes from './Menu/presentational/Routes'
import { ALL_INGREDIENTS } from './Ingredient/queries'
import { ALL_FOODS } from './Food/queries'
import { ALL_FOODPACKS } from './FoodPack/queries'
import GlobalAlert from './general/GlobalAlert'

const App = () => {
  const ingredients = useQuery(ALL_INGREDIENTS)
  const foods = useQuery(ALL_FOODS)
  const foodPacks = useQuery(ALL_FOODPACKS)

  useEpicSubscription()

  if (ingredients.loading || foods.loading || foodPacks.loading) {
    return <div>...loading</div>
  }

  const setAlert = (variant, message) => {
    // alertRef.current.setAlert(variant, message)
    console.log(variant, message)
  }

  return (
    <div>
      <Container>
        <Router>
          <Menu />
          <GlobalAlert />
          <Routes setAlert={setAlert} />
        </Router>
      </Container>
    </div>
  )
}

export default App
