export const FETCH_DATA = 'main/FETCH_DATA';
export const FETCH_SUCCESS = 'main/FETCH_SUCCESS';
export const FETCH_ERROR = 'main/FETCH_ERROR';
export const CONVERT_CURRENCY = 'main/CONVERT_CURRENCY';
export const CONVERT_CURRENCY_ERROR = 'main/CONVERT_CURRENCY_ERROR';
export const CONVERT_CURRENCY_SUCCESS = 'main/CONVERT_CURRENCY_SUCCESS';


export const fetchData = () => ({
  type: FETCH_DATA,
});
export const convertCurrency = (data) => ({
  type: CONVERT_CURRENCY,
  payload: { data }
});