import React from 'react'
import ReactDOM from 'react-dom'
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
  split,
} from '@apollo/client'
// import { setContext } from 'apollo-link-context'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/link-ws'
import { Provider } from 'react-redux'
import store from './redux/store'
import App from './App'

const httpLink = new HttpLink({
  uri: '/graphql',
})

const WS_LINK =
  process.env.NODE_ENV === 'production'
    ? 'wss://goshopvege.herokuapp.com/graphql'
    : 'ws://localhost:4000/graphql'

const wsLink = new WebSocketLink({
  uri: WS_LINK,
  options: {
    reconnect: true,
  },
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
  connectToDevTools: true,
})

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>,
  // eslint-disable-next-line no-undef
  document.getElementById('root')
)
