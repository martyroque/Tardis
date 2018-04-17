import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { manualFetch } from '../../actions/manual';
import * as types from '../../actions/types';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import config from  '../../config';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockAxios = new MockAdapter(axios);

describe('manual fetch async actions', () => {
  afterEach(() => {
    mockAxios.reset();
    mockAxios.restore();
  })

  it('creates MANUAL_FETCH_SUCCESS when fetching manual has been done', async () => {
    mockAxios.onGet(`${config.apiUrl}/manual/index.json`).reply(200, [
      {
        image: 'someimage.png',
        title: 'Drive System',
        description: 'At vero eos et accusamus et iusto odio'
      }
    ]);

    const expectedActions = [
      { 
        type: types.MANUAL_FETCH_SUCCESS, 
        payload: [
          {
            image: 'someimage.png',
            title: 'Drive System',
            description: 'At vero eos et accusamus et iusto odio'
          }
        ]
      }
    ]

    const store = mockStore([]);

    let actions = await store.dispatch(manualFetch());

    actions = store.getActions();

    expect(actions).toEqual(expectedActions);
  });
});