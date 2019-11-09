const fs = require('fs')
const path = require('path')

const docker = require('../../docker')({ host: process.env.DOCKER_HOST })
const { formatStats, getProgress, promisifyStream, registerToStream } = require('../helpers')

const onLog = socket => data => {
  if (!socket.connected) {
    return
  }

  if (!data) {
    return
  }

  socket.emit('log', { log: data.toString() })
}

const onStats = socket => data => {
  if (!socket.connected) {
    return
  }

  if (!data) {
    return
  }

  socket.emit('stats', formatStats(data.toString()))
}

const onImage = (socket, args) => async data => {
  if (!socket.connected) {
    return
  }

  if (!data) {
    return
  }

  socket.emit('output', { output: getProgress(args, data.toString()) })
}
const messageWrapper = async (socket, cb) => {
  try {
    await cb()
  } catch (err) {
    socket.emit('stream-error', { message: err.message })
  }
}

const onAttachContainer = async (message, socket, clients) => {
  await messageWrapper(socket, async () => {
    const statsStream = await docker.getStatsStream({ id: message.id, follow: true })
    const logStream = await docker.getLogStream({ id: message.id, follow: true })
    registerToStream(statsStream, onStats(socket))
    registerToStream(logStream, onLog(socket))

    clients[socket.id].streams.push(statsStream, logStream)
  })
}

const onCreateContainer = async (message, socket, clients) => {
  await messageWrapper(socket, async () => {
    const imageFound = await docker.imageExists(message.image)

    if (!imageFound) {
      const imageStream = await docker.getPullImageStream({ fromImage: message.image, tag: 'latest' })
      clients[socket.id].streams.push(imageStream)
      registerToStream(imageStream, onImage(socket, ['id', 'status', 'progress']))
      await promisifyStream(imageStream)
    }

    const container = await docker.createContainer({ image: message.image })
    socket.emit('output', { output: `Container created! ID: ${container.id}` })
  })
}

const onBuildImage = async (stream, data, socket, clients) => {
  await messageWrapper(socket, async () => {
    const imageFileName = 'custom-image.tar'
    const imagePath = path.resolve(__dirname, imageFileName)
    const tag = data.tag || 'custom-image'

    socket.emit('output', { output: `Uploading image ${data.name}...` })
    stream.pipe(fs.createWriteStream(imagePath))
    await promisifyStream(stream)
    const imageStream = await docker.getBuildImageStream({ tar: imagePath, name: tag })
    clients[socket.id].streams.push(imageStream)
    registerToStream(imageStream, onImage(socket, ['id', 'status', 'progress', 'stream']))
    await promisifyStream(imageStream)
    socket.emit('output', { output: `Image build! Name: ${tag}` })
  })
}

const onDisconnect = ({ reason, client }) => {
  console.log(`[*] Client disconnected. Reason: ${reason}`)
  const streams = client.streams
  streams.forEach(s => s.destroy())
}

module.exports = {
  onAttachContainer,
  onCreateContainer,
  onBuildImage,
  onDisconnect
}
