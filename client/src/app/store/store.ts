import {
    applyMiddleware,
    Store,
    compose,
    createStore,
    GenericStoreEnhancer
} from 'redux';

import { createLogger } from 'redux-logger';

import { IAppState } from './IAppState'
import rootReducer from './rootReducer'

declare var window: any;
const devToolsExtension: GenericStoreEnhancer = (window.devToolsExtension)
    ? window.devToolsExtension() : (f) => f;

const middlewares = [createLogger()];
const enhancers = [devToolsExtension as GenericStoreEnhancer];

const store: Store<IAppState> = createStore(rootReducer, compose(applyMiddleware(...middlewares), ...enhancers))

export default store;

