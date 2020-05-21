import React, { useState } from 'react'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import useEpicSubscription from './hooks/useEpicSubscription'
import Toolbar from './Menu/presentational/Toolbar'
import Routes from './Menu/presentational/Routes'
import { ALL_INGREDIENTS } from './Ingredient/queries'
import { ALL_FOODS } from './Food/queries'
import { ALL_FOODPACKS } from './FoodPack/queries'
import GlobalAlert from './general/GlobalAlert'
import SideDrawer from './Menu/presentational/SideDrawer'
import useUpdateStore from './hooks/useUpdateStore'
import BackDrop from './Menu/presentational/BackDrop'

const App = () => {
  const ingredients = useQuery(ALL_INGREDIENTS)
  const foods = useQuery(ALL_FOODS)
  const foodPacks = useQuery(ALL_FOODPACKS)
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false)

  useUpdateStore('INITSHOPLIST')

  useEpicSubscription()

  if (ingredients.loading || foods.loading || foodPacks.loading) {
    return <div>...loading</div>
  }

  const drawerToggleClickHandler = () => {
    setSideDrawerOpen(!sideDrawerOpen)
  }

  const backDropClickHandler = () => {
    setSideDrawerOpen(false)
  }

  return (
    <div className="container" style={{ heigth: '100%' }}>
      <Router>
        <Toolbar drawerClickHandler={drawerToggleClickHandler} />
        <SideDrawer show={sideDrawerOpen} />
        {sideDrawerOpen && (
          <BackDrop backDropClickHandler={backDropClickHandler} />
        )}
        <main>
          <Routes />
          <GlobalAlert />
        </main>
      </Router>
    </div>
  )
}

export default App
