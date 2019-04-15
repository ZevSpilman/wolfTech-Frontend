import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { render } from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router} from 'react-router-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import { ActionCableProvider } from 'react-actioncable-provider';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import 'react-circular-progressbar/dist/styles.css';

import reducer from './reducer';

const store = createStore(reducer)



  render (
    <ActionCableProvider url={'ws://localhost:3000/cable'}>
      <Provider store={store}>
        <Router>
          <App />
        </ Router >
      </ Provider >
    </ActionCableProvider>
    ,
    document.getElementById('root')
  )
