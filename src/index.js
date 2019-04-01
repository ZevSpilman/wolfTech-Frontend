import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { render } from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router} from 'react-router-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';


import reducer from './reducer';

const store = createStore(reducer)



  render (
    <Provider store={store}>
      <Router>
        <App />
      </ Router >
    </ Provider >,
    document.getElementById('root')
  )
