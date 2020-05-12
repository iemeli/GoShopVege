const shopListReducer = (
  state = { foodPacks: [], foods: [], ingredients: [] },
  action
) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const object = state[action.data.set].find(o => o.id === action.data.id)
      if (object) {
        const clone = [...state[action.data.set]]
        clone.forEach(o => {
          if (o.id === action.data.id) {
            // eslint-disable-next-line no-param-reassign
            o.count++
          }
        })
        return {
          ...state,
          [action.data.set]: clone,
        }
      }
      return {
        ...state,
        [action.data.set]: state[action.data.set].concat({
          id: action.data.id,
          count: 1,
        }),
      }
    }
    case 'REMOVE': {
      const object = state[action.data.set].find(o => o.id === action.data.id)
      if (object.count === 1) {
        return {
          ...state,
          [action.data.set]: state[action.data.set].filter(
            o => o.id !== action.data.id
          ),
        }
      }
      const clone = [...state[action.data.set]]
      clone.forEach(o => {
        if (o.id === action.data.id) {
          // eslint-disable-next-line no-param-reassign
          o.count--
        }
      })
      return {
        ...state,
        [action.data.set]: clone,
      }
    }
    case 'EMPTY':
      return { foodPacks: [], foods: [], ingredients: [] }
    default:
      return state
  }
}

export const addItem = (id, set) => {
  return {
    type: 'ADD_ITEM',
    data: {
      id,
      set,
    },
  }
}

export const removeItem = (id, set) => {
  return {
    type: 'REMOVE',
    data: {
      id,
      set,
    },
  }
}

export const emptyShopList = () => {
  return {
    type: 'EMPTY',
  }
}

export default shopListReducer
