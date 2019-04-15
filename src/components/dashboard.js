import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap'
import { ActionCableConsumer } from 'react-actioncable-provider';
import Notification from './notification'
import { createBrowserHistory } from 'history';
import NavBar from './nav-bar'
import CircularProgressbar from 'react-circular-progressbar';
import TimeAgo from 'react-timeago'



const history = createBrowserHistory();

class Dashboard extends Component {
  state = {
    numOfAlerts:null,
    alert: null,

  }

  componentWillReceiveProps(props){
     this.setState({numOfAlerts: props.alerts.length})
  }

   handleLogout = () => {
    localStorage.setItem('currentNurse', null);
    window.location.replace("http://localhost:3001/");
  }

  cancelAlert = () => {
    this.setState({alert: null})
  }


  unique = (a) => {
    let temp = {};
    for (let i = 0; i < a.length; i++)
        temp[a[i]] = true;
    let r = [];
    for (let k in temp)
        r.push(k);
    return r;
  }

  getBusyNurses = () => {
    let nurses = []
    let openShifts = this.props.shifts.filter(shift => shift.time_out == null)
    openShifts.forEach(shift => {
      nurses.push(shift.nurse)
    })
    return nurses
  }

  getPercentage = () => {
    if (this.props.nurses.length != [] && this.props.shifts[0]){
      return this.getBusyNurses().length / this.props.nurses.length * 100
    }
  }

  getBedCount = () => {
    if (this.props.residents[0]){
      return this.props.residents.length / 150 * 100
    }
  }


  render() {
    return (
      <Fragment>
      <NavBar alerts={this.state.numOfAlerts}/>
        <ActionCableConsumer
          channel={{ channel: 'AlertChannel' }}
          onReceived={alert => {
            console.log(alert);
            let newNum = this.state.numOfAlerts + 1
            this.setState({numOfAlerts: newNum})
            this.setState({alert: alert.message})
          }}
        />
{this.state.alert? <Notification alert={this.state.alert} cancelAlert={this.cancelAlert}/>:''}
        <div className="progressBars">
        <p>Nurses Working </p>
          <CircularProgressbar
            percentage={Math.round(this.getPercentage())}
            text={`${Math.round(this.getPercentage())}%`}
          />
          <br/>
          <br/>
          <p>Beds full</p>
          <CircularProgressbar
            percentage={Math.round(this.getBedCount())}
            text={`${Math.round(this.getBedCount())}%`}
          />
        </div>
        <TimeAgo date="April 2, 2019" />
        <h1>Good Morning</h1>

        <Button onClick={this.handleLogout}>
        Logout
        </Button>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {alerts: state.alerts, nurses: state.nurses, shifts: state.shifts, residents: state.residents}
}



export default connect(mapStateToProps)(Dashboard)
