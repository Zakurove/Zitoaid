import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth'
import { GET_COMPLAINTS, GETBLOCK_COMPLAINTS, DELETE_COMPLAINT, ADD_COMPLAINT, SHOW_COMPLAINT, UPDATE_COMPLAINT, REPLACE_COMPLAINT, GET_MYCOMPLAINTS, GET_ALLCOMPLAINTS} from './types';

//Choose Block

//GET Complaints
export const getComplaints = () => (dispatch, getState) => {
  axios.get('/api/complaints/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_COMPLAINTS,
        payload: res.data,
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};


//GET ALL COMPLAINTS
export const getAllComplaints = () => (dispatch, getState) => {
  axios.get('/api/complaints/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_ALLCOMPLAINTS,
        payload: res.data,
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
//ADD Complaint
export const addComplaint = complaint => (dispatch, getState) => {
  axios
    .post('/api/complaints/', complaint, tokenConfig(getState), {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then(res => {
      dispatch(createMessage({success: "Complaint Created Successfully"}))
      dispatch({
        type: ADD_COMPLAINT,
        payload: res.data
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//Update Complaints
export const updateComplaint = (complaint, id, setsArray) => (dispatch, getState) => {
  axios
    .put(`/api/complaints/${id}/`, complaint, tokenConfig(getState), {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then(res => {
      dispatch(createMessage({info: "Complaint Edited"}))
      dispatch({
        type: UPDATE_COMPLAINT,
        payload: res.data
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//Show details of a single SHOW_COMPLAINT
export const showComplaint = id => (dispatch, getState) => {
  axios.get('/api/complaints/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: SHOW_COMPLAINT,
        payload: id

      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//Delete Complaints
export const deleteComplaint = (id) => (dispatch, getState) => {
  axios
   .delete(`/api/complaints/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({danger: "Complaint Deleted"}))
      dispatch({
        type: DELETE_COMPLAINT,
        payload: id
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};


