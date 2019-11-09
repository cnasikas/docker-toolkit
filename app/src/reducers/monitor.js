import types from '../actions/actionTypes'
import { createReducer } from '../helpers'

const containers = createReducer({ stats: {}, log: '' }, {
  [types.UPDATE_LOG]: (state, action) => ({ ...state, log: state.log + action.payload.data.log }),
  [types.UPDATE_STATS]: (state, action) => ({ stats: { ...action.payload.data }, log: state.log }),
  [types.CLEAR_MONITOR]: (state, action) => ({ stats: {}, log: '' })
})

export default containers
