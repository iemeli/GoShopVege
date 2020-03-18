export const initializeFoods = foods => {
  return {
    type: 'INIT_FOODS',
    data: foods
  }
}

const foodsReducer = (state = [], action) => {
  switch (action.data) {
    case 'INIT_FOODS':
      return action.data
    default:
      return state
  }
}

export default foodsReducer