import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'


class NurseDash extends Component {

  state = {
    currentNurse: {name: "hi"},
    alertFrom: false,
    appoinmentForm: false,
    alertInput: '',
    appoinmentInputResidentId: '',
    appoinmentInputType: '',
    appoinmentInputDate: ''
  }

  componentDidMount(){
    if (this.props.allNurses){
      let theNurse = this.props.allNurses.find(n => n.id == this.props.currentNurse)
      this.setState({currentNurse: theNurse})
    }
  }

  renderResidents = () => {
    if (this.state.currentNurse.residents){
      return this.state.currentNurse.residents.map(resident => {
        return <p>Your Resident: {resident.name}</p>
      })
    }
  }

  openAlertForm = () => {
    this.setState({alertFrom: !this.state.alertFrom})
  }
  openAppointmentForm = () => {
    this.setState({appoinmentForm: !this.state.appoinmentForm})
  }

  handleAlertForm = (e) => {
    this.setState({alertInput: e.target.value})
  }

  handleSubmitAlert = (e) => {
    fetch("http://localhost:3000/api/v1/alerts", {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        Accepts: 'application/json'
      },
      body: JSON.stringify({
       nurse_id: this.state.currentNurse.id,
       message: this.state.alertInput,
       admin_id: 1
     })
    })
    .then(this.renderDoneMessage())
  }

  handleSubmitAppointment = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/api/v1/appointments', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json'
      },
      body: JSON.stringify({
        time: this.state.appoinmentInputDate,
        resident_id: parseInt(this.state.appoinmentInputResidentId),
        variation: this.state.appoinmentInputType
      })
    })
    .then(this.renderDoneMessage)
  }

  renderAlertForm = () => {
    return (
      <form onSubmit={(e) => this.handleSubmitAlert(e)}>
        <input placeholder={"message"} type="text" value={this.state.alertInput} onChange={this.handleAlertForm}></input><br/><br/>
        <input type="submit" value={"Submit Alert"}></input>
      </form>
    )
  }

  handleAppointmentInput = (e, module) => {
    switch (module) {
      case "id":
      return this.setState({appoinmentInputResidentId: e.target.value})
      case "type":
      return this.setState({appoinmentInputType: e.target.value})
      case "date":
      return this.setState({appoinmentInputDate: e.target.value})
    }
  }


  renderAppointmentForm = () => {
    return (
      <form onSubmit={(e) => this.handleSubmitAppointment(e)}>
        <input placeholder={"resident-id"} type="text" value={this.state.appoinmentInputResidentId} onChange={(e) => this.handleAppointmentInput(e, "id")}></input><br/><br/>
        <input placeholder={"type of oppointment"} type="text" value={this.state.appoinmentInputType} onChange={(e) => this.handleAppointmentInput(e, "type")}></input><br/><br/>
        <input placeholder={"date"} type="text" value={this.state.appoinmentInputDate} onChange={(e) => this.handleAppointmentInput(e, "date")}></input><br/><br/>
        <input type="submit" value={"Submit appoinment"}></input>
        <button onClick={this.openAppointmentForm}>Back</button>
      </form>
    )
  }

  renderDoneMessage = () => {
    console.log('done');
  }


  render(){
    return (
      <Fragment>
      {
      this.state.alertFrom ? <div>{this.renderAlertForm()} </div> :
      this.state.appoinmentForm ? <div>{this.renderAppointmentForm()}</div> :
      <div><p>Welcome {this.state.currentNurse.name}!</p>
      {this.renderResidents()}
      <button onClick={this.openAlertForm}>Create Alert</button>
      <button onClick={this.openAppointmentForm}>Create Appoinment</button>

      </div>
      }
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {nurses: state.nurses}
}


export default connect(mapStateToProps)(NurseDash)
