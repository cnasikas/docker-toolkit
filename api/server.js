require('dotenv').config()

const http = require('http')
const logger = require('./logger')
const app = require('./app')
const config = require('./config')
const wss = require('./ws')

;(async () => {
  const server = http.createServer(app)
  wss(server)
  server.listen(config.server.port, () => {
    logger.info('Server running on port %d', config.server.port)
  })
})()
  .catch(err => {
    logger.error('Server error: ', err)
    process.exit(1)
  })
