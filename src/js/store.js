import {compose, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import navigation from 'modules/navigation';
import analytics from 'modules/analytics';

import { combineReducers, install } from 'redux-loop';

const store = createStore(combineReducers({
  analytics,
  navigation
}), {}, compose(
  install(),
  applyMiddleware(thunk)
));

export default store;
