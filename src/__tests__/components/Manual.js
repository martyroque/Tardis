import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { ListView } from 'react-native';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Manual } from '../../components';

enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Testing <Manual />', () => {
  it('it should render 1 ListView component', () => {
    const store = mockStore({ manual: []});

    const wrapper = shallow(<Manual store={store} />).dive();

    expect(wrapper.find(ListView).length).toEqual(1);
  });
});