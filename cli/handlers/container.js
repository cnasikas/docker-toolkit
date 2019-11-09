const docker = require('../../docker')({ host: process.env.DOCKER_HOST })
const {
  constructTable,
  printStats,
  printProgress,
  printStreamData
} = require('../helpers')

const create = async argv => {
  console.log('[*] Checking image existence...')

  const imageFound = await docker.imageExists(argv.image)

  if (!imageFound) {
    console.log('[*] Image not found. Creating image...')
    await docker.pullImage({ fromImage: argv.image, tag: 'latest' }, printProgress(['id', 'status', 'progress']))
  }

  console.log('[*] Done!')
  console.log(`[*] Creating container...`)
  const container = await docker.createContainer({ image: argv.image })
  console.log(`[*] Container created. ID: ${container.id}`)
}

const start = async argv => {
  console.log(`[*] Starting container with id ${argv.id}`)
  await docker.startContainer(argv.id)
  console.log('[*] Container started!')
}

const stop = async argv => {
  console.log(`[*] Stoping container with id ${argv.id}`)
  await docker.stopContainer(argv.id)
  console.log('[*] Container stoped!')
}

const del = async argv => {
  console.log(`[*] Deleting container with id ${argv.id}`)
  await docker.deleteContainer(argv.id)
  console.log('[*] Container deleted!')
}

const stats = async argv => {
  await docker.getStats(argv.id, argv.stream, printStats)
}

const logs = async argv => {
  await docker.getContainerLogs(argv.id, argv.stream, printStreamData)
}

const list = async argv => {
  const containers = await docker.listContainers()
  const table = constructTable(containers)
  console.log(table.toString())
}

module.exports = {
  create,
  stop,
  start,
  del,
  stats,
  logs,
  list
}
