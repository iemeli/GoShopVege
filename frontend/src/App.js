import React from 'react'
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import Menu from './Menu/presentational/Menu'
import {
  useSubscription, useApolloClient 
} from '@apollo/client'
import { FOOD_ADDED, ALL_FOODS } from './Food/queries'

const App = () => {
  const client = useApolloClient()

  const updateCacheWith = (addedFood) => {
    const includedIn = (set, object) =>
      set.map(f => f.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_FOODS })
    if (!includedIn(dataInStore.allFoods, addedFood)) {
      client.writeQuery({
        query: ALL_FOODS,
        data: { 
          allFoods: dataInStore.allFoods.concat(addedFood)
        }
      })
    } 
  }

  useSubscription(FOOD_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedFood = subscriptionData.data.foodAdded
      window.alert(`Uusi ruoka lisätty: ${addedFood.name}`)
      updateCacheWith(addedFood)
    }
  })

  return (
    <Router>
      <div className="container">
        <Menu />
      </div>
    </Router>
  )
}

export default App
