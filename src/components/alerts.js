import React, {Fragment, Component} from 'react'
import {connect} from 'react-redux'
import { Link, Route } from 'react-router-dom'
import { ActionCableConsumer } from 'react-actioncable-provider';


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
          {this.state.alertClicked.resolved ? <p>This issue has been resoved by: </p> :<button onClick={this.resolveAlert}>Resolve</button> }
        </div>
        <div>
         <button onClick={this.handleAlertUnClick}>Back</button>
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

  alertColor = (r) => {
    let myAlert = this.state.allAlerts.find(alert => alert.id == this.state.alertClicked.id)
    myAlert.resolved = true
  }

  handleAlertUnClick = () => {
    this.setState({alertClicked: ''})
  }

  handleAlertClick = (alert) => {
    this.setState({alertClicked: alert})
  }

  renderAlerts = () => {
    return this.state.allAlerts.map(alert => {
      return(
         <p className={alert.resolved ? "resolved-alert" : "unresolved-alert"} onClick={() => this.handleAlertClick(alert)}>{alert.message}</p>
      )
    })
  }

  render(){
    return (
      <Fragment>
      <ActionCableConsumer
        channel={{ channel: 'AlertChannel' }}
        onReceived={alert => {
          let newArray = [...this.state.allAlerts, alert]
          this.setState({allAlerts: newArray})
        }}/>
      <Link to="/admin/dashboard">
        <button>
         Home
        </button>
      </Link>
      <div>
      {this.state.alertClicked=='' ? this.renderAlerts() : this.renderAlertInfo()}
      </div>
      </Fragment>
    )
  }
}

function mapStateToProps(){

}

export default connect(mapStateToProps)(Alerts)
