import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import appReducers from './reducers'
import { wsSocketMiddleware } from './middlewares'

const loggerMiddleware = createLogger()

const store = createStore(
  appReducers,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
    wsSocketMiddleware(process.env.REACT_APP_WS_URL)
  )
)

export default store
