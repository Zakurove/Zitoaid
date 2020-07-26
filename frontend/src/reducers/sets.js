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
          //We're filtering through and returing the ones that haven't been deleted, for which id is the action.payload BTW
          sets: state.sets.filter(set => set.id !== action.payload)
        }
      case SHOW_SET:
        return {
          ...state,
          sets: state.sets.filter(set => set.id == action.payload)
        }
      // case UPDATE_SET:
      //   return {
      //     ...state,
      //     set: action.payload,
      //   }

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


      // case UPDATE_SET:
      //   return [
      //     {...state,
      //     sets: state.sets.filter(set => set.id == action.id)},
      //     Object.assign({}, action.set)
      //   ]
      // case UPDATE_SET:
      //   return Object.assign({}, state, {
      //       sets: state.sets.filter(set => set.id !== action.id)
      //   })
      // case UPDATE_SET: {
      //   return Object.assign({}, state, {
      //     sets: state.sets.map(set => {
      //       if (set.id !== action.id) {
      //         return set
      //       }
  
      //       return Object.assign({}, set)
      //     })
      //   })
      // }
      //   return {
      //     ...state,
      //     set: action.set,
      //   }
      case ADD_SET:
        return {
          ...state,
          sets: [...state.sets, action.payload]
        };
        // case UPDATE_SET: {
        //   return Object.assign({}, state, {
        //     sets: state.sets.map(set => {
        //       if (set.id !== action.id) {
        //         return set
        //       }
    
        //       return Object.assign({}, set, {
        //         id: action.id,
        //         title: action.title,
        //         description: action.description,
        //         images: action.images
        //       })
        //     })
        //   })
        // }
      default:
        return state;
  }
}
