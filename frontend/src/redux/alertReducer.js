import { v4 as uuid } from 'uuid'

const alertReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ALERT':
      return state.concat(action.data)
    case 'CLEAR':
      return state.filter(alert => alert.id !== action.id)
    default:
      return state
  }
}

export const clearAlert = id => {
  return {
    type: 'CLEAR',
    id,
  }
}

export const setAlert = (header, body) => {
  return dispatch => {
    const id = uuid()
    dispatch({
      type: 'ADD_ALERT',
      data: {
        header,
        body,
        id,
      },
    })
    setTimeout(() => {
      dispatch(clearAlert(id))
    }, 5000)
  }
}

export default alertReducer
