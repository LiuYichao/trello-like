import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route, Redirect
} from 'react-router-dom';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Login from './Login';


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route path="/app">
        <App />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Redirect from="/" to="/login" />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
