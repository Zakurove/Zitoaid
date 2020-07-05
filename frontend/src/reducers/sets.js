import { GET_SETS, DELETE_SET, ADD_SET, SHOW_SET } from '../actions/types.js'

const initialState = {
  sets: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_SETS:
      return {
        ...state,
        sets: action.payload
      }
      case DELETE_SET:
        return {
          ...state,
          //We're filtering through and returing the ones that haven't been deleted, for which id is the action.payload BTW
          sets: state.sets.filter(set => set.id !== action.payload)
        }
      case SHOW_SET:
        return {
          ...state,
          sets: state.sets.filter(set => set.id == action.payload)
        }
      case ADD_SET:
        return {
          ...state,
          sets: [...state.sets, action.payload]
        };
      default:
        return state;
  }
}
