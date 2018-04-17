import reducer from '../../reducers/auth';
import * as types from '../../actions/types';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      error: '',
      loading: false,
      token: null
    });
  })

  it('should handle LOGIN_START', () => {
    expect(
      reducer({}, {
        type: types.LOGIN_START
      })
    ).toEqual({
      error: '',
      loading: true
    });
  });

  it('should handle LOGIN_FAIL', () => {
    expect(
      reducer({}, {
        type: types.LOGIN_FAIL,
        payload: 'some test error'
      })
    ).toEqual({
      error: 'some test error',
      loading: false,
      token: null
    });
  });

  it('should handle LOGIN_SUCCESS', () => {
    expect(
      reducer({}, {
        type: types.LOGIN_SUCCESS,
        payload: 'some test token'
      })
    ).toEqual({
      error: '',
      loading: false,
      token: 'some test token'
    });
  });
});