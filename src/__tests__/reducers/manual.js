import reducer from '../../reducers/manual';
import * as types from '../../actions/types';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  })

  it('should handle MANUAL_FETCH_SUCCESS', () => {
    expect(
      reducer({}, {
        type: types.MANUAL_FETCH_SUCCESS,
        payload: [
          {
            image: 'someimage.png',
            title: 'Drive System',
            description: 'At vero eos et accusamus et iusto odio'
          }
        ]
      })
    ).toEqual([
      {
        image: 'someimage.png',
        title: 'Drive System',
        description: 'At vero eos et accusamus et iusto odio'
      }
    ]);
  });
});