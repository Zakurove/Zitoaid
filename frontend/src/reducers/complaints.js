import { GET_COMPLAINTS, GETBLOCK_COMPLAINTS, DELETE_COMPLAINT, ADD_COMPLAINT, SHOW_COMPLAINT, UPDATE_COMPLAINT, REPLACE_COMPLAINT, GET_MYCOMPLAINTS, GET_ALLCOMPLAINTS } from '../actions/types.js'

const initialState = {
  complaints: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_COMPLAINTS:
      return {
        ...state,
        complaints: action.payload,
        //  &&
      }
      case GETBLOCK_COMPLAINTS:
        return {
          ...state,
          complaints: action.payload,
          //  &&
        }
      case GET_MYCOMPLAINTS:
        return {
          ...state,
          complaints: action.payload.filter((complaint) =>  complaint.owner == action.user ),
        }
        case GET_ALLCOMPLAINTS:
          return {
            ...state,
            complaints: action.payload,
          }
      case DELETE_COMPLAINT:
        return {
          ...state,
          complaints: state.complaints.filter((complaint) => complaint.id !== action.payload),
        };

      case UPDATE_COMPLAINT:
        return {
          ...state,
          complaints: state.complaints.map(complaint => {
            if (complaint.id !== action.payload.id) {
              return complaint;
            } else {
              return { ...complaint, title: action.payload.title };

            }
          })
        };


      case ADD_COMPLAINT:
        return {
          ...state,
          complaints: [...state.complaints, action.payload]
        };
      default:
        return state;
  }
}
