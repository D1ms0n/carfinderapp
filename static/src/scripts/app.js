import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import Mainpage from './components/mainpage';

import '../styles/styles.scss';

ReactDOM.render(
    <Router history={browserHistory}>  
        <Route path="/" component={Mainpage}/>      
    </Router>,
    document.getElementById('app')
);
