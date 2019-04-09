import React, {Component} from 'react'
import {connect} from 'react-redux';
import { Link, Route } from 'react-router-dom'
import {Button} from 'react-bootstrap'
import { ActionCableConsumer } from 'react-actioncable-provider';
import Notification from './notification'


class Dashboard extends Component {
  state = {
    numOfAlerts:null,
    alert: null
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

  render() {
    return (
        <div>
      <ActionCableConsumer
        channel={{ channel: 'AlertChannel' }}
        onReceived={alert => {
          console.log(alert);
          let newNum = this.state.numOfAlerts + 1
          this.setState({numOfAlerts: newNum})
          this.setState({alert: alert.message})
        }}
      />
      <h1>Good Morning</h1>
      {this.state.alert? <Notification alert={this.state.alert} cancelAlert={this.cancelAlert}/>:''}
      <Button onClick={this.handleLogout}>
      Logout
      </Button>
      <div className="people-div">
       <Link to="/admin/residents">
       <Button
       className='people-tile'>
        big button with amount of residents Rooms/Residents
       </Button>
       </Link>
      </div>

      <div className="people-div">
       <Link to="/admin/nurses">
       <Button
       className='people-tile'>
        Nurses maybe call it staff
       </Button>
       </Link>
       </div>

        <div className="alert-div">
       <Link to="/admin/alerts">
       <Button
       className='alert-tile'
        variant="danger"
        size="lg">
        Alerts: {this.state.numOfAlerts? `alerts ${this.state.numOfAlerts}`:"nope"}
       </Button>
       </Link>
       </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {alerts: state.alerts}
}



export default connect(mapStateToProps)(Dashboard)
