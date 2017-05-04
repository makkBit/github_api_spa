
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } 
	from 'react-router';

import App from './components/App';
import Search from './components/Search';
import User from './components/User';

import './index.css';


ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
    	<IndexRoute component={Search} />
    	<Route path="/user/:username" component={User} />
	</Route>
  </Router>
), document.getElementById('root'));