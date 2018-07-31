import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Route} from "react-router-dom";
import configureStore from './store/configureStore';
import {MuiThemeProvider} from '@material-ui/core/styles';
import theme from './theme';
import App from './containers/App';
import About from './containers/About';
import NotAbout from './containers/NotAbout';

const store = configureStore();
const rootElement = document.getElementById('root');

rootElement
  ? ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <Router>
          <div>
            <Route exact path="/" component={App} />
            <Route exact path="/about" component={About} />
            <Route exact path="/notabout" component={NotAbout} />
          </div>
        </Router>
      </MuiThemeProvider>
    </Provider>,
    document.getElementById('root'))
  : console.warn('-----> root element required <-----');
