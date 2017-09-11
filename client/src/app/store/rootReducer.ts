import { combineReducers } from 'redux';

import { IAppState } from './IAppState';

import authenticationReducer from './authentication';
import carsReducer from './cars';

const reducers = {
  authentication: authenticationReducer,
  cars: carsReducer,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;

