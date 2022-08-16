import { combineReducers } from 'redux';
import * as echoSelectors from './echo/selectors';
import { echoSlice } from './echo/slice';

const selectors = {
  echoSelectors,
};

const reducer = combineReducers({
  echo: echoSlice.reducer,
});

const actions = {
  echo: echoSlice.actions,
};

export { selectors, reducer, actions };
