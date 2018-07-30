import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './javascript/store/configureStore';
import {MuiThemeProvider} from '@material-ui/core/styles';
import theme from './theme';
import App from './javascript/containers/App.js';

const store = configureStore();
const rootElement = document.getElementById('root');

rootElement
  ? ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </Provider>,
    document.getElementById('root'))
  : console.warn('-----> root element required <-----');
