import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import Login from './components/login'
import Dashboard from './components/dashboard'
import Rooms from './components/rooms'
import Nurses from './components/nurses'
import Alerts from './components/alerts'

class App extends Component {
  render() {
    return (
      <div className="App">


      <Route path="/login" exact render={(props) => {
        return (
          <Fragment>
            <Login/>
          </Fragment>
        )
      }}/>

      <Route path="/admin/dashboard" exact render={(props) => {
        return (
          <Fragment>
            <Dashboard />
          </Fragment>
        )
      }}/>

      <Route path="/admin/assignments" exact render={(props) => {
        return (
          <p>admin assignments</p>
        )
      }}/>

      <Route path="/admin/residents" exact render={(props) => {
        return (
          <Rooms />
        )
      }}/>

      <Route path="/admin/nurses" exact render={(props) => {
        return (
          <Nurses />
        )
      }}/>


      <Route path="/nurse/:id" exact render={(props) => {
        return (
          <p>nurse page</p>
        )
      }}/>

    </div>
    );
  }
}



function mapStateToProps(state){
  return {

  }
}


export default connect(mapStateToProps)(App);
