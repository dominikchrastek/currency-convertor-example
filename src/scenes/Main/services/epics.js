import { combineEpics } from 'redux-observable';
// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { getData, postConvert } from './api';
import { FETCH_DATA, FETCH_SUCCESS, FETCH_ERROR, CONVERT_CURRENCY, CONVERT_CURRENCY_SUCCESS, CONVERT_CURRENCY_ERROR } from './actions';


const fetchDataEpic = (action$) =>
  action$
    .filter(({ type }) => type === FETCH_DATA)
    .flatMap(() =>
      getData()
        .then(data => ({
          type: FETCH_SUCCESS,
          payload: { data },
        }))
        .catch(error => ({
          type: FETCH_ERROR,
          payload: { error },
        })),
    );
const convertCurrencyEpic = (action$) =>
  action$
  .filter(({ type }) => type === CONVERT_CURRENCY)
  .flatMap(action => (
    postConvert(action.payload.data)
    .then(data => ({
      type: CONVERT_CURRENCY_SUCCESS,
      payload: data,
    }))
    .catch(error => ({
      type: CONVERT_CURRENCY_ERROR,
      payload: { error },
    }))
  ));
export default combineEpics(
  fetchDataEpic,
  convertCurrencyEpic,
);
