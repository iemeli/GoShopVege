import React from 'react'
import ReactDOM from 'react-dom'
import App from './App';
import {
  ApolloClient, HttpLink, InMemoryCache, ApolloProvider,
  split
} from '@apollo/client'
import store from './services/store'
import { Provider } from 'react-redux'
// import { setContext } from 'apollo-link-context'
// import { getMainDefinition } from '@apollo/client/utilities'
// import { WebSocketLink } from '@apollo/link-ws'

const httpLink = new HttpLink({
  uri: 'http://localhost:4000',
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
)
