import React from 'react'
import './App.css';
import { useQuery, gql } from '@apollo/client'
import ListFoods from './components/ListFoods'
 
const ALL_FOODS = gql`
  query {
    allFoods  {
      name
      price
      kiloCalories
      id
      ingredients {
        name
        id
      }
    }
  }
`

const App = (props) => {
  const foodsResult = useQuery(ALL_FOODS)

  if (foodsResult.loading) {
    return (
      <div>...loading</div>
    )
  }

  const foods = foodsResult.data.allFoods

  return (
    <div>
      <ListFoods foods={foods} />
    </div>
  )
}



export default App
