import { combineReducers } from 'redux'
import notifications from './notifications'
import containers from './containers'
import monitor from './monitor'
import output from './output'

const app = combineReducers({
  notifications,
  containers,
  monitor,
  output
})

export default app
