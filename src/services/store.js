import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootReducer, rootEpic } from './';

const initialState = {};
const enhancers = [];
const middleware = [createEpicMiddleware(rootEpic)];

const logger = require('redux-logger').createLogger;

middleware.push(logger({ collapsed: true }));

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(rootReducer, initialState, composedEnhancers);

export default store;
