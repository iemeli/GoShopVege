const shopListReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return state.concat(action.id)
    case 'REMOVE':
      return state.filter(id => id !== action.id)
    case 'EMPTY':
      return []
    default:
      return state
  }
}

export const addItem = id => {
  return {
    type: 'ADD_ITEM',
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
