const API_URL = 'http://localhost:8000'

function errorHandler(res) {
  if (!res.ok) {
    return res.json().then(body => Promise.reject(body.error));
  }
  return res;
}

export function getData() {
  return fetch(`${API_URL}/data`)
    .then(errorHandler)
    .then(res => res.json())
    .then(res => res)
}
export function postConvert(data) {
  return fetch(`${API_URL}/convert`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then(errorHandler)
    .then(res => res.json())
    .then(res => res)
}