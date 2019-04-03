import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import Login from './components/login'
import Dashboard from './components/dashboard'
import Residents from './components/residents'
import Nurses from './components/nurses'
import Alerts from './components/alerts'
import NurseDash from './components/nurse-dashboard'

class App extends Component {

  state = {
    nurses: null
  }


  componentDidMount(){
    fetch('http://localhost:3000/api/v1/nurses')
    .then(r => r.json())
    .then(r => this.setState({nurses: r}))

    fetch('http://localhost:3000/api/v1/residents')
    .then(r => r.json())
    .then(r => this.props.dispatch({type: 'ADD_RESIDENTS', payload: r}))

    fetch('http://localhost:3000/api/v1/alerts')
    .then(r => r.json())
    .then(r => this.props.dispatch({type: 'ADD_ALERTS', payload: r}))

    fetch('http://localhost:3000/api/v1/appointments')
    .then(r => r.json())
    .then(r => this.props.dispatch({type: 'ADD_APPOINTMENTS', payload: r}))
  }

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
          <Residents />
        )
      }}/>

      <Route path="/admin/nurses" exact render={(props) => {
        return (
          <Nurses />
        )
      }}/>


      <Route path="/nurse/:id" exact render={(props) => {
        let currentNurse = parseInt(props.match.params.id)
          if (this.state.nurses){
            return (
              <NurseDash currentNurse={currentNurse} allNurses={this.state.nurses}/>
            )
          }
      }}/>

    </div>
    );
  }
}




export default connect()(App);
