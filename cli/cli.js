#!/usr/bin/env node

require('dotenv').config()
const yargs = require('yargs')
const chalk = require('chalk')

yargs // eslint-disable-line no-unused-expressions
  .commandDir('cmds')
  .fail((msg, err) => {
    if (err) {
      console.log(chalk.red(`An error has occured: ${err.message}`))
      console.error(`Callstack:\n`, err)
      process.exit(1)
    }

    yargs.showHelp()

    msg = msg ? `\n${msg}` : ''
    console.log(msg)
  })
  .help()
  .argv
