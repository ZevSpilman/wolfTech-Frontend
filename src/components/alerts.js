import React, {Fragment, Component} from 'react'
import {connect} from 'react-redux'
import { Link, Route } from 'react-router-dom'
import { ActionCableConsumer } from 'react-actioncable-provider';
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn } from 'mdbreact';

class Alerts extends Component {
  state = {
    alertClicked: '',
    allAlerts: this.props.allAlerts
  }

  renderAlertInfo = () => {
    return (
      <div>
        <div className="shift">
          <h1>{this.state.alertClicked.nurse.name}</h1>
          <p>{this.state.alertClicked.message}</p>
          {this.state.alertClicked.resolved ? <p>This issue has been resoved by: </p> :<MDBBtn onClick={this.resolveAlert}>Resolve</MDBBtn> }
          <MDBBtn onClick={() => this.deleteAlert(this.state.alertClicked.id)}>Delete</MDBBtn>
        </div>
        <div>
         <MDBBtn onClick={this.handleAlertUnClick}>Back</MDBBtn>
        </div>
      </div>
    )
  }

  resolveAlert = () => {
    fetch(`http://localhost:3000/api/v1/alerts/${this.state.alertClicked.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        resolved: true
      })
    })
    .then(r => r.json())
    .then(this.alertColor())
  }


  optimisclyDeleteAlert = () => {
    let newArray = this.state.allAlerts.filter(alert => alert.id !== this.state.alertClicked.id)
    this.setState({allAlerts: newArray})
  }


  handleAlertUnClick = () => {
    this.setState({alertClicked: ''})
  }

  handleAlertClick = (alert) => {
    this.setState({alertClicked: alert})
  }

  renderAlerts = () => {
    let num = 1
    return this.state.allAlerts.sort((a,b) => b.id - a.id).map(alert => {
      console.log(alert.nurse);
      return(
         <tr onClick={() => this.handleAlertClick(alert)}>
           <td>{num++}</td>
           <td>{alert.message}</td>
           <td>{alert.nurse.name?alert.nurse.name:"smtn is wrong"}</td>
           <td>{alert.resolved ? "Resolved" : "UnResolved"}</td>
         </tr>
      )
    })
  }

  deleteAlert = (alertId) => {
    fetch(`http://localhost:3000/api/v1/alerts/${alertId}`, {
      method: "DELETE"
      }
    )
    .then(this.optimisclyDeleteAlert())
    .then(this.handleAlertUnClick())
  }

  render(){
    return (
      <div className='alert-page'>
      <ActionCableConsumer
        channel={{ channel: 'AlertChannel' }}
        onReceived={alert => {
          alert.nurse = this.props.nurses.find(nurse => nurse.id == alert.nurse_id)
          let newArray = [alert, ...this.state.allAlerts]
          this.setState({allAlerts: newArray})
        }}/>
      <Link to="/admin/dashboard">
        <MDBBtn>
         Home
        </MDBBtn>
      </Link>
      <div>
      {this.state.alertClicked=='' ?
         <MDBTable hover className='shift'>
         <MDBTableHead>
          <tr>
            <th>#</th>
            <th>Message</th>
            <th>Nurse</th>
            <th>Status</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {this.renderAlerts()}
          </MDBTableBody>
         </MDBTable>
         : this.renderAlertInfo()}
      </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {nurses: state.nurses}
}

export default connect(mapStateToProps)(Alerts)
