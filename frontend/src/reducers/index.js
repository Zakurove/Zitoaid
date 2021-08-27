import { combineReducers } from "redux";
import leads from "./leads";
import errors from './errors';
import messages from './messages';
import auth from './auth';
import sets from './sets';
import clusters from './clusters';
import practiceDescSessions from './practiceDescSessions';
import practiceDescInputs from './practiceDescInputs';
import loading from './loading';



export default combineReducers({
  leads,
  sets,
  clusters,
  practiceDescSessions,
  practiceDescInputs,
  errors,
  messages,
  auth,
  loading
});
