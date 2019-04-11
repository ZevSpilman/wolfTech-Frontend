import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux';
import { Link, Route } from 'react-router-dom'
import {Button} from 'react-bootstrap'
import { ActionCableConsumer } from 'react-actioncable-provider';
import Notification from './notification'
import { MDBJumbotron, MDBContainer } from "mdbreact";
import { createBrowserHistory } from 'history';
import Tiles from './tiles'

const history = createBrowserHistory();

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

  renderJumbotron = (link, text) => {
    return(
      <MDBJumbotron fluid>
       <MDBContainer onClick={() =>  window.location.replace(`http://localhost:3001/admin/${link}`)}>
         <h2 className="display-4">{text} </h2>
         <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
       </MDBContainer>
      </MDBJumbotron>)
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
        <h1>Good Morning</h1>
        {this.state.alert? <Notification alert={this.state.alert} cancelAlert={this.cancelAlert}/>:''}
        <Button onClick={this.handleLogout}>
        Logout
        </Button>
        <div className='dash-cards'>
          <div className="people-div">
            {this.renderJumbotron('nurses', 'Nurses')}
          </div>
          <div className="people-div">
            {this.renderJumbotron('residents', 'Residents')}
          </div>
            <div className="alert-div">
            {this.renderJumbotron('alerts', 'Alerts')}
             <Link to="/admin/alerts">
             <Button
             className='alert-tile'
              variant="danger"
              size="lg">
              Alerts: {this.state.numOfAlerts? `alerts ${this.state.numOfAlerts}`:"nope"}
             </Button>
             </Link>
           </div>
           <Tiles />
         </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {alerts: state.alerts}
}



export default connect(mapStateToProps)(Dashboard)
