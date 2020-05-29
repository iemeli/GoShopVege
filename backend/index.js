const mongoose = require('mongoose')
const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const http = require('http')
const path = require('path')
const cors = require('cors')
const resolvers = require('./resolvers/resolvers')
const typeDefs = require('./typeDefs')
require('dotenv').config()

const app = express(cors())

app.use(express.static('build'))

mongoose.set('useFindAndModify', false)

const { MONGODB_URI } = process.env

console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(e => {
    console.log('error connection to MongoDB', e.message)
  })

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: '*',
  },
  introspection: true,
})

server.applyMiddleware({ app })

const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'))
})

httpServer.listen({ port: process.env.PORT || 4000 }, () => {
  console.log(`Server ready at ${server.graphqlPath}`)
})

process.on('uncaughtException', (reason, p) => {
  console.log(console.error(reason, 'Unhandled Rejection at Promise', p))
})
