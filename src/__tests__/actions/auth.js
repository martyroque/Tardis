import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { loginUser } from '../../actions/auth';
import * as types from '../../actions/types';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import config from  '../../config';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockAxios = new MockAdapter(axios);

describe('manual fetch async actions', () => {
  it('creates LOGIN_SUCCESS when login has passed', async () => {
    mockAxios.onPost(`${config.apiUrl}/login`).reply(200, 'this is a token');

    const expectedActions = [
      {
        type: types.LOGIN_START
      },
      { 
        type: types.LOGIN_SUCCESS, 
        payload: 'this is a token'
      }
    ]

    const store = mockStore([]);

    let actions = await store.dispatch(loginUser({
      username: 'some',
      password: 'passw0rd'
    }));

    actions = store.getActions();

    expect(actions).toEqual(expectedActions)
  });

  it('creates LOGIN_FAIL when login has failed', async () => {
    mockAxios.onPost(`${config.apiUrl}/login`).reply(401);

    const expectedActions = [
      {
        type: types.LOGIN_START
      },
      { 
        type: types.LOGIN_FAIL, 
        payload: 'There was an error procesing your request.'
      }
    ]

    const store = mockStore([]);

    let actions = await store.dispatch(loginUser({
      username: 'some',
      password: 'passw0rd'
    }));

    actions = store.getActions();

    expect(actions).toEqual(expectedActions);
  });
});