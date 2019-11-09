const { createLogger, format, transports } = require('winston')

const options = {
  console: {
    level: 'info',
    format: format.combine(
      format.colorize(),
      format.simple()
    )
  }
}

const logger = createLogger({
  format: format.combine(
    format.errors({ stack: true }),
    format.splat(),
    format.timestamp(),
    format.simple()
  ),
  transports: [
    new transports.Console(options.console)
  ],
  exitOnError: false
})

logger.stream = {
  write: function (message, encoding) {
    logger.info(message)
  }
}

module.exports = logger
