import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth'
import { GET_CONDITIONS, GETBLOCK_CONDITIONS, DELETE_CONDITION, ADD_CONDITION, SHOW_CONDITION, UPDATE_CONDITION, REPLACE_CONDITION, GET_MYCONDITIONS, GET_ALLCONDITIONS} from './types';

//Choose Block

//GET Conditions
export const getConditions = () => (dispatch, getState) => {
  axios.get('/api/conditions/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_CONDITIONS,
        payload: res.data,
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};


//GET ALL CONDITIONS
export const getAllConditions = () => (dispatch, getState) => {
  axios.get('/api/conditions/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_ALLCONDITIONS,
        payload: res.data,
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
//ADD Condition
export const addCondition = condition => (dispatch, getState) => {
  axios
    .post('/api/conditions/', condition, tokenConfig(getState), {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then(res => {
      dispatch(createMessage({success: "Condition Created Successfully"}))
      dispatch({
        type: ADD_CONDITION,
        payload: res.data
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//Update Conditions
export const updateCondition = (condition, id, setsArray) => (dispatch, getState) => {
  axios
    .put(`/api/conditions/${id}/`, condition, tokenConfig(getState), {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then(res => {
      dispatch(createMessage({info: "Condition Edited"}))
      dispatch({
        type: UPDATE_CONDITION,
        payload: res.data,
        complaintsArray: complaintsArray
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//Show details of a single SHOW_CONDITION
export const showCondition = id => (dispatch, getState) => {
  axios.get('/api/conditions/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: SHOW_CONDITION,
        payload: id

      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//Delete Conditions
export const deleteCondition = (id) => (dispatch, getState) => {
  axios
   .delete(`/api/conditions/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({danger: "Condition Deleted"}))
      dispatch({
        type: DELETE_CONDITION,
        payload: id
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};


