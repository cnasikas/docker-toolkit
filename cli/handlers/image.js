const docker = require('../../docker')({ host: process.env.DOCKER_HOST })
const { printProgress } = require('../helpers')

const build = async argv => {
  console.log(`[*] Creating image from ${argv.file} and name ${argv.image}`)
  await docker.buildImage({ tar: argv.file, name: argv.image, handler: printProgress(['id', 'status', 'progress', 'stream']) })
  console.log('[*] Image build!')
}

module.exports = {
  build
}
