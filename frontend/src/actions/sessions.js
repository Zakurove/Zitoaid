import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth'
import { GET_SESSIONS, GETBLOCK_SESSIONS, DELETE_SESSION, ADD_SESSION, SHOW_SESSION, UPDATE_SESSION, REPLACE_SESSION, GET_MYSESSIONS, GET_ALLSESSIONS} from './types';

//Choose Block

//GET Sessions
export const getSessions = () => (dispatch, getState) => {
  axios.get('/api/sessions/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_SESSIONS,
        payload: res.data,
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};


//GET ALL SESSIONS
export const getAllSessions = () => (dispatch, getState) => {
  axios.get('/api/sessions/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_ALLSESSIONS,
        payload: res.data,
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
//ADD Session
export const addSession = session => (dispatch, getState) => {
  axios
    .post('/api/sessions/', session, tokenConfig(getState), {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then(res => {
      dispatch(createMessage({success: "Session Created Successfully"}))
      dispatch({
        type: ADD_SESSION,
        payload: res.data
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//Update Sessions
export const updateSession = (session, id, setsArray) => (dispatch, getState) => {
  axios
    .put(`/api/sessions/${id}/`, session, tokenConfig(getState), {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then(res => {
      dispatch(createMessage({info: "Session Edited"}))
      dispatch({
        type: UPDATE_SESSION,
        payload: res.data,
        complaintsArray: complaintsArray,
        conditionsArray: conditionsArray
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//Show details of a single SHOW_SESSION
export const showSession = id => (dispatch, getState) => {
  axios.get('/api/sessions/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: SHOW_SESSION,
        payload: id

      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//Delete Sessions
export const deleteSession = (id) => (dispatch, getState) => {
  axios
   .delete(`/api/sessions/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({danger: "Session Deleted"}))
      dispatch({
        type: DELETE_SESSION,
        payload: id
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};


