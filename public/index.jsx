import React from 'react';
import ReactDOM from 'react-dom';
import Router, {Route} from 'react-router';
import NotificationSystem from 'react-notification-system';

import App from './components/App';
import {ActivityList} from './components/ActivityList';
import {setNotifier} from './utils';

const routes = <Route component={App}>
  <Route path="/" component={ActivityList} />
</Route>;

ReactDOM.render(
  <div>
    <NotificationSystem ref={(c) => setNotifier(c)}/>
    <Router>{routes}</Router>
  </div>,
  document.getElementById('app')
);
