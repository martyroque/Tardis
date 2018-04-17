import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { TouchableHighlight } from 'react-native';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { KeyFob } from '../../components';

enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Testing <Manual />', () => {
  it('it should render 2 TouchableHighlight components', () => {
    const store = mockStore({ auth: { token: 'some_token' }});

    const wrapper = shallow(<KeyFob store={store} />).dive();

    expect(wrapper.find(TouchableHighlight).length).toEqual(2);
  });
});