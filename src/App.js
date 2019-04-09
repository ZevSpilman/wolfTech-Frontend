import React, { Component, Fragment } from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import { connect } from 'react-redux';
import Login from './components/login'
import Dashboard from './components/dashboard'
import Residents from './components/residents'
import Nurses from './components/nurses'
import Alerts from './components/alerts'
import NurseDash from './components/nurse-dashboard'

class App extends Component {

  state = {
    nurses: null,
    alerts: null,
    units: null,
    shifts: null
  }


  componentDidMount(){
    fetch('http://localhost:3000/api/v1/nurses')
    .then(r => r.json())
    .then(r => this.setState({nurses: r}))

    fetch('http://localhost:3000/api/v1/residents')
    .then(r => r.json())
    .then(r => this.props.dispatch({type: 'ADD_RESIDENTS', payload: r}))

    fetch('http://localhost:3000/api/v1/nurses')
    .then(r => r.json())
    .then(r => this.props.dispatch({type: 'ADD_NURSES', payload: r}))

    fetch('http://localhost:3000/api/v1/alerts')
    .then(r => r.json())
    .then(r => this.setState({alerts: r}))

    fetch('http://localhost:3000/api/v1/alerts')
    .then(r => r.json())
    .then(r => this.props.dispatch({type: "ADD_ALERTS", payload: r}))

    fetch('http://localhost:3000/api/v1/units')
    .then(r => r.json())
    .then(r => this.setState({units: r}))

    fetch('http://localhost:3000/api/v1/shifts')
    .then(r => r.json())
    .then(r => this.setState({shifts: r}))
  }


  render() {
    return (
      <div className="App">


      <Route path="/" exact render={(props) => {
        return (
          <Fragment>
            <Login/>
          </Fragment>
        )
      }}/>

      <Route path="/admin/dashboard" exact render={(props) => {
        if(this.state.alerts){
          return (
            <Fragment>
              <Dashboard alerts={this.state.alert}/>
            </Fragment>
          )
        }
      }}/>

      <Route path="/admin/assignments" exact render={(props) => {
        return (
          <p>admin assignments</p>
        )
      }}/>

      <Route path="/admin/residents" exact render={(props) => {
        if (this.state.units){
          return (
            <Residents units={this.state.units} shifts={this.state.shifts}/>
          )
        }
      }}/>

      <Route path="/admin/nurses" exact render={(props) => {
        if (this.state.nurses){
          console.log(this.state.nurses);
        return (
          <Nurses allNurses={this.state.nurses}/>
        )
      }
      }}/>

      <Route path="/admin/alerts" exact render={(props) => {
        if (this.state.alerts){
        return (
          <Alerts allAlerts={this.state.alerts}/>
        )
      }
      }}/>


      <Route path="/nurse" exact render={(props) => {
          if (this.state.nurses){
            let currentNurse = this.state.nurses.find(nurse => nurse.name === localStorage.getItem('currentNurse'))
            return (
              <NurseDash currentNurse={currentNurse} allNurses={this.state.nurses}/>
            )
          }
      }}/>

    </div>
    );
  }
}
const mapStateToProps = (state) => {
  return ({currentNurse: state.currentNurse})
}



export default connect()(App);
