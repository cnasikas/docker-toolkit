import types from '../actions/actionTypes'
import { createReducer } from '../helpers'

const changeContainerState = (state, id, containerState) => {
  return state.map((item, index) => {
    if (item.id !== id) {
      return item
    }

    return {
      ...item,
      state: containerState,
      status: containerState
    }
  })
}

const containers = createReducer([], {
  [types.GET_CONTAINERS_SUCESS]: (state, action) => { return [...action.payload.data] },
  [types.START_CONTAINER_SUCESS]: (state, action) => changeContainerState(state, action.payload.params.id, 'running'),
  [types.STOP_CONTAINER_SUCESS]: (state, action) => changeContainerState(state, action.payload.params.id, 'exited'),
  [types.DELETE_CONTAINER_SUCESS]: (state, action) => { return state.filter(c => c.id !== action.payload.params.id) }
})

export default containers
