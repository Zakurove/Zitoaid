import { GET_CONDITIONS, GETBLOCK_CONDITIONS, DELETE_CONDITION, ADD_CONDITION, SHOW_CONDITION, UPDATE_CONDITION, REPLACE_CONDITION, GET_MYCONDITIONS, GET_ALLCONDITIONS } from '../actions/types.js'

const initialState = {
  conditions: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_CONDITIONS:
      return {
        ...state,
        conditions: action.payload,
        //  &&
      }
      case GETBLOCK_CONDITIONS:
        return {
          ...state,
          conditions: action.payload,
          //  &&
        }
      case GET_MYCONDITIONS:
        return {
          ...state,
          conditions: action.payload.filter((condition) =>  condition.owner == action.user ),
        }
        case GET_ALLCONDITIONS:
          return {
            ...state,
            conditions: action.payload,
          }
      case DELETE_CONDITION:
        return {
          ...state,
          conditions: state.conditions.filter((condition) => condition.id !== action.payload),
        };

      case UPDATE_CONDITION:
        return {
          ...state,
          conditions: state.conditions.map(condition => {
            if (condition.id !== action.payload.id) {
              return condition;
            } else {
              return { ...condition, title: action.payload.title, complaints: action.complaintsArray };

            }
          })
        };


      case ADD_CONDITION:
        return {
          ...state,
          conditions: [...state.conditions, action.payload]
        };
      default:
        return state;
  }
}
