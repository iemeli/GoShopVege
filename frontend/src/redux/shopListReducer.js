const shopListReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD':
      return state.concat(action.id)
    case 'REMOVE':
      return state.filter(id => id !== action.data)
    case 'EMPTY':
      return []
    default:
      return state
  }
}

export const addItem = id => {
  return {
    type: 'ADD',
    id,
  }
}

export const removeItem = id => {
  return {
    type: 'REMOVE',
    id,
  }
}

export const emptyShopList = () => {
  return {
    type: 'EMPTY',
  }
}

export default shopListReducer
