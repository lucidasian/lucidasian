import config from './config'
import DB from './model'
import authenticate from './src/authenticate.js'
import { setUUID, verifyJwt } from './src/middleware.js'
import { schema } from'./graphql'

import jwt from 'jsonwebtoken'
import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'

import morgan from 'morgan'

import {
  graphiqlExpress,
  graphqlExpress
} from 'apollo-server-express'

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser(config.cookieSecret))
app.use(session({
  secret: config.sessionSecret,
  resave: true,
  saveUninitialized: false,
}))

app.use(morgan('dev'))
app.use(setUUID)

const authen = authenticate({ 
  app: app,
  DB: DB
})

app.use(verifyJwt)


// setting up graphql
app.use('/graphql', bodyParser.json(), graphqlExpress(req => ({
  schema,
  context: { 
    DB,
    IP_ADDRESS: req.header('x-forwarded-for') || req.connection.remoteAddress,
    UUID: req.cookies.UUID,
    user: req.user
  }
})))

// setting up a graphiql a ui for testing our query
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}))

// connecting to a mongodb database with name of db fullstack
mongoose.connect('mongodb://database:27017/lucidasian', () => {
  console.log('connected to database successfully')
})

app.listen(config.serverPort, () => {
  console.log(`starting server on port: ${config.serverPort}`)
})