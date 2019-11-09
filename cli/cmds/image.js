const { buildCommand } = require('../helpers')
const handlers = require('../handlers/image')

const buildOptions = {
  image: {
    alias: 'i',
    demandOption: true,
    desc: 'Image name'
  }
}

const subCommands = {
  build: {
    command: 'build <file>',
    desc: 'Build an image from tar file. Run cli.js image build --help for more information.',
    builder: { ...buildOptions },
    handler: handlers.build
  }
}

module.exports = {
  command: 'image build <file>',
  desc: 'Manage docker images. Run cli.js image --help for more information.',
  builder: yargs => buildCommand(yargs, subCommands),
  handler: argv => {}
}
