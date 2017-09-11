import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import main from '../scenes/Main/services/';
import mainEpic from '../scenes/Main/services/epics';


export const rootEpic = combineEpics(
  mainEpic,
);

export const rootReducer = combineReducers({
  main
});
