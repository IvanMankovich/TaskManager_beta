import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import store from './store';
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <Root store={store}/>,
  document.getElementById('root')
);