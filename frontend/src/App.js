import React from 'react'
import './App.css';
import { useQuery, gql } from '@apollo/client'
import ListFoods from './components/ListFoods'
import { connect } from 'react-redux'
import { initializeFoods } from './reducers/foodsReducer'
 
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
  props.initializeFoods(foods)

  return (
    <div>
      <ListFoods />
    </div>
  )
}



export default connect(
  null,
  { initializeFoods }
)(App);
