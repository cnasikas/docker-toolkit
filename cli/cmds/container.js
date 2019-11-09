const { buildCommand } = require('../helpers')
const handlers = require('../handlers/container')

const createOptions = {
  image: {
    alias: 'i',
    demandOption: true,
    desc: 'Image name'
  }
}

const streamOption = {
  stream: {
    alias: 's',
    boolean: true,
    default: false,
    desc: 'Stream the output. If false, the output will be printed once.'
  }
}

const subCommands = {
  create: {
    command: 'create',
    desc: 'Create a container. Run cli.js container create --help for more information.',
    builder: { ...createOptions },
    handler: handlers.create
  },
  list: {
    command: 'list',
    desc: 'List docker containers. Run cli.js container list --help for more information.',
    builder: {},
    handler: handlers.list
  }
}

const group = {
  cmd: ':key <id>',
  desc: 'Run cli.js container :key --help for more information.',
  entries: {
    start: { handler: handlers.start, desc: 'Start a container given by id.' },
    stop: { handler: handlers.stop, desc: 'Stop a container given by id.' },
    delete: { handler: handlers.delete, desc: 'Delete a container given by id.' },
    stats: { opts: { ...streamOption }, handler: handlers.stats, desc: 'Get the stats of a container given by id.' },
    logs: { opts: { ...streamOption }, handler: handlers.logs, desc: 'Get the logs of a container given by id.' }
  }
}

for (const entry in group.entries) {
  if (group.entries.hasOwnProperty(entry)) {
    const cmd = {
      command: group.cmd.replace(':key', entry),
      desc: `${group.entries[entry].desc} ${group.desc.replace(':key', entry)}`,
      builder: { ...group.entries[entry].opts },
      handler: group.entries[entry].handler
    }

    subCommands[entry] = cmd
  }
}

module.exports = {
  command: 'container <create|start|stop|delete|logs|stats|list> [id]',
  desc: 'Manage docker containers. Run cli.js container --help for more information.',
  builder: yargs => buildCommand(yargs, subCommands),
  handler: argv => {}
}
