const io = require('socket.io')
const ss = require('socket.io-stream')

const { onAttachContainer, onCreateContainer, onBuildImage, onDisconnect } = require('./handlers')

const clients = {}

const initWSS = server => {
  const wss = io(server)
  wss.set('transports', ['websocket'])

  wss.on('connection', socket => {
    console.log('[*] WebSocket Client connected')
    clients[socket.id] = { streams: [] }

    socket.on('attach-container', async message => onAttachContainer(message, socket, clients))
    socket.on('create-container', async message => onCreateContainer(message, socket, clients))
    ss(socket).on('build-image', async (stream, data) => onBuildImage(stream, data, socket, clients))

    socket.on('disconnect', reason => onDisconnect({ reason, client: clients[socket.id] }))
    socket.on('disconnect', reason => onDisconnect({ reason, client: clients[socket.id] }))
  })
}

module.exports = initWSS
