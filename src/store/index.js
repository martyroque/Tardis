/**
 * @flow
 */

import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import thunk from 'redux-thunk';

// import individual reducers
import auth from '../reducers/auth';
import manual from '../reducers/manual';

const reducers = combineReducers({
  auth,
  manual
});

const middleware = [
  thunk
];

const composer = __DEV__ ? composeWithDevTools : compose;
const store = createStore(reducers, composer(applyMiddleware(...middleware), autoRehydrate()));

persistStore(store, { storage: AsyncStorage, whitelist: ['auth'] });//.purge();

export default store;

