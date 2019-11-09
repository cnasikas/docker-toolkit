import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000'

const buildActionTypes = (types) => {
  return types.reduce((obj, item) => {
    obj[item] = item
    return obj
  }, {})
}

const createReducer = (intialState, handlers) => {
  return (state = intialState, action) => {
    if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action)
    }

    return state
  }
}

const createSimpleAction = (type) => {
  return (data = {}) => {
    return { type, payload: { ...data } }
  }
}

const createAPIAction = ({ url, action = 'get', beforeAction, afterAction }) => {
  return (routeParameters = {}, requestData = {}) => {
    return async (dispatch, getState) => {
      dispatch(beforeAction({ params: routeParameters, data: requestData }))

      const config = { method: action, data: requestData }
      let normalizedURL = `${BASE_URL}${url}`

      normalizedURL = Object.keys(routeParameters).reduce((prev, cur) => prev.replace(`:${cur}`, routeParameters[cur]), normalizedURL)

      config.url = normalizedURL

      const res = await axios.request(config)

      dispatch(afterAction({ params: routeParameters, data: res.data }))
      return res.data
    }
  }
}

export {
  createReducer,
  buildActionTypes,
  createSimpleAction,
  createAPIAction
}
