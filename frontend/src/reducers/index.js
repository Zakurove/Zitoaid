import { combineReducers } from "redux";
import leads from "./leads";
import errors from './errors';
import messages from './messages';
import auth from './auth';
import sets from './sets';
import images from './sets';
import clusters from './clusters';
import sessions from './sessions';
import complaints from './complaints';
import conditions from './conditions';
import practiceDescSessions from './practiceDescSessions';
import practiceDescInputs from './practiceDescInputs';
import practiceIdentifySessions from './practiceIdentifySessions';
import loading from './loading';



export default combineReducers({
  leads,
  sets,
  clusters,
  sessions,
  conditions,
  complaints,
  practiceDescSessions,
  practiceDescInputs,
  practiceIdentifySessions,
  images,
  errors,
  messages,
  auth,
  loading
});
