import { GET_SETS, DELETE_SET, ADD_SET, SHOW_SET, UPDATE_SET, REPLACE_SET } from '../actions/types.js'

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
          sets: state.sets.filter((set) => set.id !== action.payload),
        };

      case UPDATE_SET:
        console.log(action.payload, "payloaad");
        return {
          ...state,
          sets: state.sets.map(set => {
            if (set.id !== action.payload.id) {
              return set;
            } else {
              return { ...set, title: action.payload.title, description: action.payload.description, images: action.payload.images };
            }
          })
        };


      case ADD_SET:
        return {
          ...state,
          sets: [...state.sets, action.payload]
        };
      default:
        return state;
  }
}
