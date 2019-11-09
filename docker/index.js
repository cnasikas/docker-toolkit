const fs = require('fs')
const Docker = require('node-docker-api').Docker
const { promisifyStream, normalizeHost, sortenID, normalizeArgs } = require('./utils')

module.exports = config => {
  const docker = new Docker({ ...normalizeHost(config.host) })

  const imageExists = async image => {
    try {
      await docker.image.get(image).status()
      return true
    } catch (err) {
      return false
    }
  }

  const getImageStatus = async image => {
    const status = await docker.image.get(image).status()
    return status
  }

  const listContainers = async () => {
    const containers = await docker.container.list({ all: true })
    return containers.map(c => ({ id: sortenID(c.id), image: c.data.Image, state: c.data.State, status: c.data.Status }))
  }

  const createContainer = async (opts = { image: 'ubuntu' }) => {
    opts = normalizeArgs(opts)
    opts.Tty = true
    // opts.AttachStdin = true
    const container = await docker.container.create({ ...opts })

    return { id: container.id }
  }

  const startContainer = async id => {
    const container = docker.container.get(id)
    await container.start()
  }

  const stopContainer = async id => {
    const container = docker.container.get(id)
    await container.stop()
  }

  const deleteContainer = async id => {
    const container = docker.container.get(id)
    await container.delete({ force: true })
  }

  const getStats = async (id, stream = false, handler = () => {}) => {
    const statsStream = await getStatsStream({ id, follow: stream })
    statsStream.on('data', stats => handler(stats))
    statsStream.on('error', err => console.log(err))
  }

  const getStatsStream = async ({ id, follow = false }) => {
    const container = docker.container.get(id)
    const statsStream = await container.stats({ stream: follow })
    return statsStream
  }

  const getContainerLogs = async (id, stream = false, handler = () => {}) => {
    const log = await getLogStream({ id, follow: stream })
    log.on('data', data => handler(data))
    log.on('error', err => console.log(err))
  }

  const getLogStream = async ({ id, follow = false }) => {
    const container = docker.container.get(id)
    const log = await container.logs({ follow, stdout: true, stderr: true })
    return log
  }

  const pullImage = async (opts = {}, handler = () => {}) => {
    const stream = await getPullImageStream({ ...opts })
    await promisifyStream(stream, handler)
    const status = await docker.image.get(opts.fromImage).status()
    return status
  }

  const buildImage = async ({ tar, name, handler }) => {
    const imageStream = await getBuildImageStream({ tar, name })
    await promisifyStream(imageStream, handler)
    const status = await docker.image.get(name).status()
    return status
  }

  const getPullImageStream = async (opts = {}) => {
    const stream = await docker.image.create({}, { ...opts })
    return stream
  }

  const getBuildImageStream = async ({ tar, name }) => {
    const tarStream = fs.createReadStream(tar)
    const imageStream = await docker.image.build(tarStream, { t: name })
    return imageStream
  }

  return {
    listContainers,
    createContainer,
    startContainer,
    stopContainer,
    deleteContainer,
    getStats,
    getContainerLogs,
    pullImage,
    imageExists,
    getImageStatus,
    getStatsStream,
    getLogStream,
    getPullImageStream,
    getBuildImageStream,
    buildImage
  }
}
