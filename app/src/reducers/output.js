import types from '../actions/actionTypes'
import { createReducer } from '../helpers'

const output = createReducer({ output: '' }, {
  [types.OUTPUT]: (state, action) => ({ ...state, output: `${state.output} \n ${action.payload.data.output}` }),
  [types.CLEAR_OUTPUT]: (state, action) => ({ output: '' })
})

export default output
