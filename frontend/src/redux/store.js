import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension'
import alertReducer from './alertReducer'
import shopListReducer from './shopListReducer'

const reducer = combineReducers({
  alerts: alertReducer,
  shopList: shopListReducer,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
