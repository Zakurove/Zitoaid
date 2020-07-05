import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth'

import { GET_LEADS, DELETE_LEAD, ADD_LEAD} from './types';

//GET Leads
export const getLeads = () => (dispatch, getState) => {
  axios.get('/api/leads/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_LEADS,
        payload: res.data
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//Delete Leads
//It's beind dispatched to the reducers, check lead reducer
export const deleteLead = id => (dispatch, getState) => {
  axios
    .delete(`/api/leads/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({deleteLead: "Lead Deleted Successfully"}))
      dispatch({
        type: DELETE_LEAD,
        payload: id
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//ADD Leads
export const addLead = lead => (dispatch, getState) => {
  axios
    .post('/api/leads/', lead, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({addLead: "Lead Added Successfully"}))
      dispatch({
        type: ADD_LEAD,
        payload: res.data
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
