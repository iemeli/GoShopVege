import React from 'react'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import Container from 'react-bootstrap/Container'
import useEpicSubscription from './hooks/useEpicSubscription'
import Menu from './Menu/presentational/Menu'
import Routes from './Menu/presentational/Routes'
import { ALL_INGREDIENTS } from './Ingredient/queries'
import { ALL_FOODS } from './Food/queries'
import { ALL_FOODPACKS } from './FoodPack/queries'
import GlobalAlert from './general/GlobalAlert'
import useUpdateStore from './hooks/useUpdateStore'

const App = () => {
  const ingredients = useQuery(ALL_INGREDIENTS)
  const foods = useQuery(ALL_FOODS)
  const foodPacks = useQuery(ALL_FOODPACKS)

  useUpdateStore('INITSHOPLIST')

  useEpicSubscription()

  if (ingredients.loading || foods.loading || foodPacks.loading) {
    return <div>...loading</div>
  }

  return (
    <div>
      <Container style={{ paddingTop: '5rem' }}>
        <Router>
          <Menu />
          <Routes />
          <GlobalAlert />
        </Router>
      </Container>
    </div>
  )
}

export default App
