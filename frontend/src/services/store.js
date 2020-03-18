import { createStore, combineReducers } from 'redux'
import foodsReducer from '../reducers/foodsReducer'

const reducer = combineReducers({
  foods: foodsReducer
})

const store = createStore(reducer)

export default store