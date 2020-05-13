const shopListReducer = (
  state = { foodPacks: [], foods: [], ingredients: [], shopListIds: [] },
  action
) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const shopListIdsClone = [...state.shopListIds]
      action.data.shopListIds.forEach(id => {
        if (shopListIdsClone.map(slid => slid.id).includes(id)) {
          shopListIdsClone.some(slid => {
            if (slid.id === id) {
              // eslint-disable-next-line no-param-reassign
              slid.count++
              return true
            }
            return false
          })
        } else {
          shopListIdsClone.push({ id, count: 1 })
        }
      })
      const object = state[action.data.set].find(
        o => o.id === action.data.objectId
      )
      if (object) {
        const setClone = [...state[action.data.set]]
        setClone.forEach(o => {
          if (o.id === action.data.objectId) {
            // eslint-disable-next-line no-param-reassign
            o.count++
          }
        })
        return {
          ...state,
          [action.data.set]: setClone,
          shopListIds: shopListIdsClone,
        }
      }
      return {
        ...state,
        [action.data.set]: state[action.data.set].concat({
          id: action.data.objectId,
          count: 1,
        }),
        shopListIds: shopListIdsClone,
      }
    }
    case 'REMOVE': {
      const shopListIdsClone = [...state.shopListIds]
      action.data.shopListIds.forEach(id => {
        shopListIdsClone.filter(slid => {
          if (slid.id === id) {
            if (slid.count > 1) {
              // eslint-disable-next-line no-param-reassign
              slid.count--
              return true
            }
            return false
          }
          return true
        })
      })
      const object = state[action.data.set].find(
        o => o.id === action.data.objectId
      )
      if (object.count === 1) {
        return {
          ...state,
          [action.data.set]: state[action.data.set].filter(
            o => o.id !== action.data.objectId
          ),
          shopListIds: shopListIdsClone,
        }
      }
      const clone = [...state[action.data.set]]
      clone.forEach(o => {
        if (o.id === action.data.objectId) {
          // eslint-disable-next-line no-param-reassign
          o.count--
        }
      })
      return {
        ...state,
        [action.data.set]: clone,
        shopListIds: shopListIdsClone,
      }
    }
    case 'EMPTY':
      return { foodPacks: [], foods: [], ingredients: [], shopListIds: [] }
    default:
      return state
  }
}

export const addItem = (objectForStore, set) => {
  console.log('täs objectForStore', objectForStore)
  return {
    type: 'ADD_ITEM',
    data: {
      shopListIds: objectForStore.shopListIds,
      objectId: objectForStore.objectId,
      set,
    },
  }
}

export const removeItem = (objectForStore, set) => {
  return {
    type: 'REMOVE',
    data: {
      shopListIds: objectForStore.shopListIds,
      objectId: objectForStore.objectId,
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
