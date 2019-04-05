import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {InputGroup} from 'react-bootstrap';
import {DropdownButton} from 'react-bootstrap';
import {Dropdown} from 'react-bootstrap';
import {FormControl} from 'react-bootstrap';
import {Card} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import Agenda from './nurse-schedule'
import DateTimePicker from 'react-datetime-picker';


class NurseDash extends Component {

  state = {
    currentNurse: {name: "hi"},
    alertFrom: false,
    appoinmentForm: false,
    shiftFrom: false,
    alertInput: '',
    appoinmentInputResidentId: '',
    appoinmentInputType: '',
    time: new Date().toLocaleString(),
    selected_unit_id: null,
    date: new Date(),
    appointmentDuration: 0
  }

  componentDidMount(){
    this.intervalID = setInterval(
     () => this.tick(),
     1000
   );
    if (this.props.allNurses){
      let theNurse = this.props.allNurses.find(n => n.id == this.props.currentNurse)
      this.setState({currentNurse: theNurse})
    }
  }

  componentWillUnmount(){
    clearInterval(this.intervalID);
  }

  tick() {
   this.setState({
     time: new Date().toLocaleString()
   })
 }

 setSelectedDate = date => this.setState({ date })

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
       admin_id: 1,
       resolved: false

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
        time: this.state.date,
        resident_id: parseInt(this.state.appoinmentInputResidentId),
        variation: this.state.appoinmentInputType,
        duration: this.state.appointmentDuration
      })
    })
    .then(this.renderDoneMessage)
  }

  renderAlertForm = () => {
    return (
      <form onSubmit={(e) => this.handleSubmitAlert(e)}>
        <input placeholder={"message"} type="text" value={this.state.alertInput} onChange={this.handleAlertForm}></input><br/><br/>
        <input type="submit" value={"Submit Alert"}></input>
          <button onClick={this.openAlertForm}>Back</button>
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
        <DateTimePicker
          onChange={this.setSelectedDate}
          value={this.state.date}
        />
        <input type="number" placeholder={"duration in minutes"} onChange={this.handleDuration}></input>
        <input type="submit" value={"Submit appoinment"}></input>
        <button onClick={this.openAppointmentForm}>Back</button>
      </form>
    )
  }

  handleDuration = (e) => {
    this.setState({appointmentDuration: e.target.value})
  }

  renderDoneMessage = () => {
  }

  openShiftForm = () => {
    this.setState({shiftFrom: !this.state.shiftFrom})
  }

  startShift = () => {
    if (this.state.selected_unit_id){  fetch(`http://localhost:3000/api/v1/shifts`, {
        method: 'POST',
        headers: {
          "Content-Type" : 'application/json',
          Accept: "application/json"
        },
        body: JSON.stringify({
          nurse_id: this.state.currentNurse.id,
          time_in: this.state.time,
          unit_id: this.state.selected_unit_id
        })
      })
      .then(r => r.json())
      .then(this.setState({shiftFrom: false}))}
      else
      {
        window.alert("Please pick a Unit")
      }
  }

  endShift = (shift) => {
    fetch(`http://localhost:3000/api/v1/shifts/${shift}`, {
      method: 'PATCH',
      headers: {
        "Content-Type" : 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify({
        time_out: this.state.time
      })
    })
    .then(r => r.json())
    .then(this.setState({currentNurse: {...this.state.currentNurse.shifts = null}}))
  }


  renderShiftForm = () => {
    return (
      <div>
        <Card className="shift" bg="primary" text="white" style={{ width: '25rem'}}>
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Current time: {this.state.time}</Card.Subtitle>
            <Card.Text>
              <DropdownButton id="dropdown-item-button" title="Dropdown button">
                <Dropdown.Item id="1" as="button" onClick={(e)=>this.handleUnitSelection(e.target.id)}>Unit A</Dropdown.Item>
                <Dropdown.Item id="2" as="button" onClick={(e)=>this.handleUnitSelection(e.target.id)}>Unit B</Dropdown.Item>
                <Dropdown.Item id="3" as="button" onClick={(e)=>this.handleUnitSelection(e.target.id)}>Unit C</Dropdown.Item>
                <Dropdown.Item id= "4" as="button" onClick={(e)=>this.handleUnitSelection(e.target.id)}>Unit D</Dropdown.Item>
              </DropdownButton>
            </Card.Text>
            <button onClick={this.startShift}>Start Shift</button>
          </Card.Body>
        </Card>
        <button onClick={this.openShiftForm}>Back</button>
      </div>
    )
  }

  handleUnitSelection = (e) => {
    this.setState({selected_unit_id: e})
  }

  showOpenShifts = () => {
    if (this.state.currentNurse.shifts){
      return this.state.currentNurse.shifts.map(shift => {
        if (!shift.time_out){
          return (
          <Card className="shift" style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://loading.io/spinners/typing/lg.-text-entering-comment-loader.gif" />
            <Card.Body>
              <Card.Title>Unit: {shift.unit.name}</Card.Title>
              <Card.Text>
                This shift is currently open.
                it began at {shift.time_in}
              </Card.Text>
              <Button variant="primary" onClick={() => this.endShift(shift.id)}>Clock Out</Button>
            </Card.Body>
          </Card>
          )
        }
      })
    }
  }


  render(){
    return (
      <Fragment>
        {
        this.state.alertFrom ? <div>{this.renderAlertForm()} </div> :
        this.state.appoinmentForm ? <div>{this.renderAppointmentForm()}</div> :
        this.state.shiftFrom ? this.renderShiftForm() :
        <div><p>Welcome {this.state.currentNurse.name}!</p>
        {this.renderResidents()}
        <button onClick={this.openAlertForm}>Create Alert</button>
        <button onClick={this.openAppointmentForm}>Create Appoinment</button>
        <button onClick={this.openShiftForm}>Initiate Shift</button><br/>
        {this.showOpenShifts()}<br/>
        {this.state.currentNurse.shifts && this.state.currentNurse.shifts.find(shift => shift.time_out == null) ? <Agenda residents={this.state.currentNurse.shifts.find(shift => shift.time_out == null).unit.residents}/> : "Start a shift to see schedule"}

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
