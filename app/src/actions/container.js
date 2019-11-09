import types from './actionTypes'
import { createSimpleAction, createAPIAction } from '../helpers'

const getContainers = createAPIAction({
  url: '/container',
  beforeAction: createSimpleAction(types.GET_CONTAINERS),
  afterAction: createSimpleAction(types.GET_CONTAINERS_SUCESS)
})

const startContainer = createAPIAction({
  url: '/container/:id/start',
  action: 'post',
  beforeAction: createSimpleAction(types.START_CONTAINER),
  afterAction: createSimpleAction(types.START_CONTAINER_SUCESS)
})

const stopContainer = createAPIAction({
  url: '/container/:id/stop',
  action: 'post',
  beforeAction: createSimpleAction(types.STOP_CONTAINER),
  afterAction: createSimpleAction(types.STOP_CONTAINER_SUCESS)
})

const deleteContainer = createAPIAction({
  url: '/container/:id',
  action: 'delete',
  beforeAction: createSimpleAction(types.DELETE_CONTAINER),
  afterAction: createSimpleAction(types.DELETE_CONTAINER_SUCESS)
})

const disconnectFromContainer = createSimpleAction(types.DISCONNECT_FROM_CONTAINER)
const connectToContainer = createSimpleAction(types.CONNECT_TO_CONTAINER)

const clearMonitor = createSimpleAction(types.CLEAR_MONITOR)
const createContainer = createSimpleAction(types.CREATE_CONTAINER)

const clearOutput = createSimpleAction(types.CLEAR_OUTPUT)
const buildImage = createSimpleAction(types.BUILD_IMAGE)

export default {
  getContainers,
  startContainer,
  stopContainer,
  deleteContainer,
  createContainer,
  disconnectFromContainer,
  connectToContainer,
  clearMonitor,
  buildImage,
  clearOutput
}
