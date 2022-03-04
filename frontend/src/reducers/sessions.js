import { GET_SESSIONS, GETBLOCK_SESSIONS, DELETE_SESSION, ADD_SESSION, SHOW_SESSION, UPDATE_SESSION, REPLACE_SESSION, GET_MYSESSIONS, GET_ALLSESSIONS } from '../actions/types.js'

const initialState = {
  sessions: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_SESSIONS:
      return {
        ...state,
        sessions: action.payload,
        //  &&
      }
      case GETBLOCK_SESSIONS:
        return {
          ...state,
          sessions: action.payload,
          //  &&
        }
      case GET_MYSESSIONS:
        return {
          ...state,
          sessions: action.payload.filter((session) =>  session.owner == action.user ),
        }
        case GET_ALLSESSIONS:
          return {
            ...state,
            sessions: action.payload,
          }
      case DELETE_SESSION:
        return {
          ...state,
          sessions: state.sessions.filter((session) => session.id !== action.payload),
        };

      case UPDATE_SESSION:
        return {
          ...state,
          sessions: state.sessions.map(session => {
            if (session.id !== action.payload.id) {
              return session;
            } else {
              return { ...session, title: action.payload.title, conditions: action.conditionsArray, complaints: action.complaintsArray };

            }
          })
        };


      case ADD_SESSION:
        return {
          ...state,
          sessions: [...state.sessions, action.payload]
        };
      default:
        return state;
  }
}
