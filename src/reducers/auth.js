import { REHYDRATE } from 'redux-persist/constants';
import { 
  LOGIN_START,
  LOGIN_SUCCESS, 
  LOGIN_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  error: '',
  loading: false,
  token: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REHYDRATE:
      return action.payload.auth ? { ...state, token: action.payload.auth.token || null } : state;
    case LOGIN_START:
      return { ...state, loading: true, error: '' };
    case LOGIN_SUCCESS:
      return { ...state, token: action.payload, error: '', loading: false };
    case LOGIN_FAIL:
      return { ...state, token: null, error: action.payload, loading: false };
  }

  return state;
};