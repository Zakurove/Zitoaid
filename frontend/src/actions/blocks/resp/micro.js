import axios from 'axios';
import { createMessage, returnErrors } from '../../messages';
import { tokenConfig } from '../../auth'
import { GET_SETS, DELETE_SET, ADD_SET, SHOW_SET, UPDATE_SET, REPLACE_SET} from '../../types';

//GET Sets
export const getSets = () => (dispatch, getState) => {
  axios.get('/api/resp/micro/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_SETS,
        payload: res.data
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//ADD Sets
export const addSet = set => (dispatch, getState) => {
  axios
    .post('/api/resp/micro/', set, tokenConfig(getState), {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then(res => {
      dispatch(createMessage({success: "Set Added Successfully"}))
      dispatch({
        type: ADD_SET,
        payload: res.data
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//Update Sets
export const updateSet = (set, id) => (dispatch, getState) => {
  axios
    .put(`/api/resp/micro/${id}/`, set, tokenConfig(getState), {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then(res => {
      dispatch(createMessage({info: "Set Edited"}))
      dispatch({
        type: UPDATE_SET,
        payload: res.data
      });
    }).catch(error => { throw(error) });
};

//Show details of a single SHOW_SET
export const showSet = id => (dispatch, getState) => {
  axios.get('/api/resp/micro/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: SHOW_SET,
        payload: id

      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//Delete Sets
export const deleteSet = (id) => (dispatch, getState) => {
  axios
   .delete(`/api/resp/micro/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({danger: "Set Deleted"}))
      dispatch({
        type: DELETE_SET,
        payload: id
      });
    }).catch((err) => console.log(err));
};


//Add Note
export const addNote = (set, id) => (dispatch, getState) => {
  axios
    .put(`/api/resp/micro/${id}/`, set, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({success: "Note Added"}))
      dispatch({
        type: UPDATE_SET,
        payload: res.data
      });
    }).catch(error => { throw(error) });
};
//Remove Images
export const removeImage = (set, id) => (dispatch, getState) => {
  axios
    .put(`/api/resp/micro/${id}/`, set, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({danger: "Image Removed"}))
      dispatch({
        type: UPDATE_SET,
        payload: res.data
      });
    }).catch(error => { throw(error) });
};

//Edit Note
export const editNote = (set, id) => (dispatch, getState) => {
  axios
    .put(`/api/resp/micro/${id}/`, set, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({info: "Note Edited"}))
      dispatch({
        type: UPDATE_SET,
        payload: res.data
      });
    }).catch(error => { throw(error) });
};

//Delete Note
export const deleteNote = (set, id) => (dispatch, getState) => {
  axios
    .put(`/api/resp/micro/${id}/`, set, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({danger: "Note Deleted"}))
      dispatch({
        type: UPDATE_SET,
        payload: res.data
      });
    }).catch(error => { throw(error) });
};