const alertReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET':
      return action.data
    case 'CLEAR':
      return ''
    default:
      return state
  }
}

export const clearAlert = () => {
  return {
    type: 'CLEAR',
  }
}

export const setAlert = (variant, message) => {
  return dispatch => {
    dispatch({
      type: 'SET',
      data: {
        variant,
        message,
      },
    })
    setTimeout(() => {
      dispatch(clearAlert())
    }, 5000)
  }
}

export default alertReducer
