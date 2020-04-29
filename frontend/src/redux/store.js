import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'
import alertReducer from './alertReducer'

const store = createStore(alertReducer, applyMiddleware(thunk))

export default store
