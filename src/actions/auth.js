import axios from 'axios';
import CryptoJS from 'crypto-js';

import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from './types';

import config from '../config';

const base64url = (source) => {
  // Encode in classical base64
  let encodedSource = CryptoJS.enc.Base64.stringify(source);

  // Remove padding equal characters
  encodedSource = encodedSource.replace(/=+$/, '');

  // Replace characters according to base64url specifications
  encodedSource = encodedSource.replace(/\+/g, '-');
  encodedSource = encodedSource.replace(/\//g, '_');

  return encodedSource;
};

const createToken = (data) => {
  const header = {
    "alg": "HS256",
    "typ": "JWT"
  };
  
  const stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
  const encodedHeader = base64url(stringifiedHeader);
  
  const stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
  const encodedData = base64url(stringifiedData);
  
  const token = encodedHeader + "." + encodedData;

  const secret = 'client_secret';

  let signature = CryptoJS.HmacSHA256(token, secret);
  signature = base64url(signature);

  const signedToken = token + "." + signature;

  return signedToken;
};

export const loginUser = ({ username, password }) => async dispatch => {
  dispatch({ type: LOGIN_START });

  if (username === '' || password === '') {
    dispatch({ 
      type: LOGIN_FAIL,
      payload: 'Please enter your credentials.'
    });
    return;
  }

  try {
    const myToken = createToken({ 
      client_id: config.clientId,
      username,
      password
    });
    
    const { data } = await axios.post(`${config.apiUrl}/login`, myToken);

    dispatch({ 
      type: LOGIN_SUCCESS, 
      payload: data 
    });
  } catch (err) {
    dispatch({ 
      type: LOGIN_FAIL,
      payload: 'There was an error procesing your request.'
    });
  }
};