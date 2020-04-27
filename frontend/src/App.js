import React from 'react'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import Menu from './Menu/presentational/Menu'
import Routes from './Menu/presentational/Routes'
import { ALL_INGREDIENTS } from './Ingredient/queries'
import { ALL_FOODS } from './Food/queries'
import { ALL_FOODPACKS } from './FoodPack/queries'

const App = () => {
  const ingredients = useQuery(ALL_INGREDIENTS)
  const foods = useQuery(ALL_FOODS)
  const foodPacks = useQuery(ALL_FOODPACKS)

  if (ingredients.loading || foods.loading || foodPacks.loading) {
    return <div>...loading</div>
  }

  return (
    <Router>
      <div className="container">
        <Menu />
        <Routes />
      </div>
    </Router>
  )
}

export default App
