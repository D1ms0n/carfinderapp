import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './javascript/containers/AppWithDrawer.js';
import configureStore from './javascript/store/configureStore';

const store = configureStore();
const rootElement = document.getElementById('root');

rootElement
  ? ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'))
  : console.warn('-----> root element required <-----');
