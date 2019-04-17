import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap'
import { ActionCableConsumer } from 'react-actioncable-provider';
import Notification from './notification'
import NavBar from './nav-bar'
import CircularProgressbar from 'react-circular-progressbar';
import TimeAgo from 'react-timeago'
import Chart from './bar-chart'
import MyCalendar from './admin-cal'




function parseISOString(s) {
  var b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

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
    else{
      return 0
    }
  }

  getBedCount = () => {
    if (this.props.residents[0]){
      return this.props.residents.length / 150 * 100
    }
  }

  getMonthData = () => {
    if (this.props.residents[0]){
      let feb = 0
      let march = 0
      let april = 0
      let arrOfDates = this.props.residents.map(resident => parseISOString(resident.created_at))
      arrOfDates.forEach(date => {
        if (date.getMonth() == 1){
          feb += 1
        }
        else if (date.getMonth() == 2) {
          march += 1
        }
        else if (date.getMonth() == 3) {
          april += 1
        }
      })
      return [{text: 'Feb', value: feb}, {text: "March", value: march}, {text: "April", value: april}]
    }
  }


  render() {
    return (
      <Fragment>
      <ActionCableConsumer
        channel={{ channel: 'AlertChannel' }}
        onReceived={alert => {
          console.log(alert);
          let newNum = this.state.numOfAlerts + 1
          this.setState({numOfAlerts: newNum})
          this.setState({alert: alert.message})
        }}
      />
      <NavBar logOut={this.handleLogout} alerts={this.state.numOfAlerts}/>
      <h1>Good Morning</h1>
      {this.state.alert? <Notification alert={this.state.alert} cancelAlert={this.cancelAlert}/>:''}
      <div className='all-charts'>
        <div className='bar-graph'>
        {/*being that this is a fetch it laggs*/}
        <Chart months={this.getMonthData()}/>
        </div>
          <MyCalendar />
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
        </div>
        <TimeAgo date="April 2, 2019" />
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {alerts: state.alerts, nurses: state.nurses, shifts: state.shifts, residents: state.residents}
}



export default connect(mapStateToProps)(Dashboard)
