import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import configureStore from './store/configureStore';
import CssBaseline from '@material-ui/core/CssBaseline';
import {MuiThemeProvider} from '@material-ui/core/styles';
import theme from './theme';
import App from './layouts/App';
import {BrowserRouter} from 'react-router-dom';
const store = configureStore();
const rootElement = document.getElementById('root');


rootElement
  ? ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>,
    document.getElementById('root'))
  : console.warn('-----> root element required <-----');
