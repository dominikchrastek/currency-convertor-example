import 'normalize.css';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './services/store';

import App from './App';

import registerServiceWorker from './registerServiceWorker';
registerServiceWorker();

const app = document.getElementById('root');
if (app) {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    app,
  );
}

