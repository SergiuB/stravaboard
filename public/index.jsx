import React from 'react';
import ReactDOM from 'react-dom';
import Router, {Route} from 'react-router';

import App from './components/App';
import {ActivityList} from './components/ActivityList';

const routes = <Route component={App}>
  <Route path="/" component={ActivityList} />
</Route>;

ReactDOM.render(
  <Router>{routes}</Router>,
  document.getElementById('app')
);
