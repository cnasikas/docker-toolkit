import ss from 'socket.io-stream'
import types from '../actions/actionTypes'
import actions from '../actions'
import initWSClient from '../ws-socket'

const dispatchMessageOnEvent = (socket, dispatch, event, type) => {
  socket.on(event, message => {
    if (event === 'stream-error') {
      actions.addNotification({ msg: message.message, type: 'error', title: 'Error' })(dispatch)
      return
    }

    dispatch({
      type,
      payload: { data: message }
    })
  })
}

const wsSocketMiddleware = url => {
  const socket = initWSClient(url)
  return ({ dispatch }) => {
    dispatchMessageOnEvent(socket, dispatch, 'stream-error', types.ADD_NOTIFICATION)

    return next => action => {
      if (action.type === types.DISCONNECT_FROM_CONTAINER) {
        socket.removeAllListeners('log')
        socket.removeAllListeners('stats')
        socket.removeAllListeners('output')
        socket.emit('disconnect-client', { message: 'disconnect' })
        return
      }

      if (action.type === types.CONNECT_TO_CONTAINER) {
        dispatchMessageOnEvent(socket, dispatch, 'log', types.UPDATE_LOG)
        dispatchMessageOnEvent(socket, dispatch, 'stats', types.UPDATE_STATS)
        socket.emit('attach-container', { id: action.payload.id })
        return
      }

      if (action.type === types.CREATE_CONTAINER) {
        dispatchMessageOnEvent(socket, dispatch, 'output', types.OUTPUT)
        socket.emit('create-container', { ...action.payload })
        return
      }

      if (action.type === types.BUILD_IMAGE) {
        dispatchMessageOnEvent(socket, dispatch, 'output', types.OUTPUT)
        const stream = ss.createStream()
        ss(socket).emit('build-image', stream, { name: action.payload.image.name, size: action.payload.image.size, tag: action.payload.tag })
        ss.createBlobReadStream(action.payload.image).pipe(stream)
        return
      }

      return next(action)
    }
  }
}

export {
  wsSocketMiddleware
}
