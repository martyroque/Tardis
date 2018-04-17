import axios from 'axios';
import { MANUAL_FETCH_SUCCESS } from './types';
import config from '../config';

export const manualFetch = () => async dispatch => {
  try {
    const { data } = await axios.get(`${config.apiUrl}/manual/index.json`);

    dispatch({ 
      type: MANUAL_FETCH_SUCCESS, 
      payload: data
    });
  } catch (err) {
    console.log(err);
  }
};
