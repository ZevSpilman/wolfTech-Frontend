const initialState = {currentNurse: '', nurses: [], residents: [], appoinments: [], alerts: [], shifts: []}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_NURSES':
    return {...state, nurses: action.payload }
    case 'ADD_RESIDENTS':
    return {...state, residents: action.payload }
    case 'ADD_APPOINTMENTS':
    return {...state, appointments: action.payload }
    case 'ADD_ALERTS':
    return {...state, alerts: action.payload }
    case 'SET_CURRENT_USER':
    return {...state, currentNurse: action.payload}
    case 'ADD_SHIFTS':
    return {...state, shifts: action.payload}
    default:
    return state
  }
}

export default reducer
