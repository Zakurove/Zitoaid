import axios from 'axios';
import { createMessage, returnErrors } from '../../messages';
import { tokenConfig } from '../../auth'

import { GET_SETS, DELETE_SET, ADD_SET, SHOW_SET} from '../../types';

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
      dispatch(createMessage({addSet: "Set Added Successfully"}))
      dispatch({
        type: ADD_SET,
        payload: res.data
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
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

//Edit, not yet touched


//Delete Set
//We're getting the ID here so we can learn which set to delete
export const deleteSet = id => (dispatch, getState) => {
  axios
    .delete(`/api/resp/micro/delete/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({deleteSet: "Set Deleted Successfully"}))
      dispatch({
        type: DELETE_SET,
        //After we delete the set we will send its id as the payload then we will forward it to the reducer, where we will change the state and keep every set but the one we deleted.
        payload: id
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
