const mongoose = require('mongoose')
const { ApolloServer } = require('apollo-server')
const resolvers = require('./resolvers')
const typeDefs = require('./typeDefs')
require('dotenv').config()

mongoose.set('useFindAndModify', false)

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(e => {
    console.log('error connection to MongoDB', e.message)
  })

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})