const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')

const routes = require('./routes')
const logger = require('./logger')
const { ErrorHandler, HTTPErrorHandler } = require('./middlewares/error')

const app = express()

app.set('trust proxy', '127.0.0.1')
app.disable('x-powered-by')
app.use(helmet())
app.use(cors({ methods: ['GET', 'POST', 'DELETE'] }))
app.use(bodyParser.json())
app.use(morgan('combined', { stream: logger.stream }))

for (const url in routes) {
  app.use(url, routes[url])
}

app.use(HTTPErrorHandler)
app.use(ErrorHandler)

module.exports = app
