import io from 'socket.io-client'

const initWSClient = url => {
  const socket = io(url, { transports: ['websocket'], upgrade: false })
  return socket
}

export default initWSClient
