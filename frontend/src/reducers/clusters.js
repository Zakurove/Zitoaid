import { GET_CLUSTERS, DELETE_CLUSTER, ADD_CLUSTER, SHOW_CLUSTER, UPDATE_CLUSTER, REPLACE_CLUSTER, GET_MYCLUSTERS, GET_ALLCLUSTERS } from '../actions/types.js'

const initialState = {
  clusters: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_CLUSTERS:
      return {
        ...state,
        clusters: action.payload.filter((cluster) =>  cluster.subject == action.subject && cluster.block == action.block),
        //  &&
      }
      case GET_MYCLUSTERS:
        return {
          ...state,
          clusters: action.payload.filter((cluster) =>  cluster.owner_username == action.user ),
        }
        case GET_ALLCLUSTERS:
          return {
            ...state,
            clusters: action.payload,
          }
      case DELETE_CLUSTER:
        return {
          ...state,
          clusters: state.clusters.filter((cluster) => cluster.id !== action.payload),
        };

      case UPDATE_CLUSTER:
        return {
          ...state,
          clusters: state.clusters.map(cluster => {
            if (cluster.id !== action.payload.id) {
              return cluster;
            } else {
              return { ...cluster, title: action.payload.title, description: action.payload.description, sets: action.setsArray };

            }
          })
        };


      case ADD_CLUSTER:
        return {
          ...state,
          clusters: [...state.clusters, action.payload]
        };
      default:
        return state;
  }
}
