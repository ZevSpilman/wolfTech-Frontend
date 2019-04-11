import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {InputGroup} from 'react-bootstrap';
import {DropdownButton} from 'react-bootstrap';
import {Dropdown} from 'react-bootstrap';
import {FormControl} from 'react-bootstrap';
import {Card, CardDeck} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import Agenda from './nurse-schedule'
import DateTimePicker from 'react-datetime-picker';
import { MDBJumbotron, MDBContainer, MDBIcon } from "mdbreact";
import { ReactAgenda , ReactAgendaCtrl , guid } from 'react-agenda';
import AlertForm from './alert-form'


function parseISOString(s) {
  var b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

const add_minutes =  function (dt, minutes) {
  return new Date(dt.getTime() + minutes*70000);
}
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
    appointmentDuration: 0,
    firstTime: true,
    newAppointment: []
  }

  componentDidMount(){
    this.intervalID = setInterval(
     () => this.tick(),
     1000
   );
    if (this.props.allNurses){
      if (!this.props.currentNurse){
        window.location.replace("http://localhost:3001/")
      }
      else if (this.props.currentNurse.name=="Zev") {
        window.location.replace("http://localhost:3001/admin/dashboard");
      }
      let theNurse = this.props.allNurses.find(n => n.name == this.props.currentNurse.name)
      this.setState({currentNurse: theNurse})
    }
  }
  componentWillUnmount(){
    console.log("clearing interval");
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
    .then(r => r.json())
    .then(r => {
      this.setState({newAppointment: r})
      this.setState({firstTime: false})
      this.openAppointmentForm()
    })
  }
  handleAppointmentInput = (e, module) => {
    switch (module) {
      case "type":
      return this.setState({appoinmentInputType: e.target.value})
      case "date":
      return this.setState({appoinmentInputDate: e.target.value})
    }
  }
  handleResidentInput = (e) => {
    e.preventDefault()
    this.setState({appoinmentInputResidentId: e.target.id})
  }
  renderAppointmentForm = () => {
    let residents = this.state.currentNurse.shifts.find(shift => shift.time_out == null).unit.residents
    return (
      <form >
      <DropdownButton id="dropdown-item-button" title="Resident">
        {residents.map(resident => {
          return <Dropdown.Item
            id={resident.id}
            as="button"
            onClick={(e)=>this.handleResidentInput(e)}>
            {resident.name}
          </Dropdown.Item>
        })}
      </DropdownButton>
        <input placeholder={"type of oppointment"} type="text" value={this.state.appoinmentInputType} onChange={(e) => this.handleAppointmentInput(e, "type")}></input><br/><br/>
        <DateTimePicker
          onChange={this.setSelectedDate}
          value={this.state.date}
        />
        <input type="number" placeholder={"duration in minutes"} onChange={this.handleDuration}></input>
        <button onClick={(e) => this.handleSubmitAppointment(e)}> Submit appoinment</button>
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
    if (this.state.selected_unit_id){
        fetch(`http://localhost:3000/api/v1/shifts`, {
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
      .then( r => {
          this.setState({shiftFrom: false})
          let updatedArray = this.state.currentNurse.shifts
          updatedArray.push(r)
          debugger
          this.setState({currentNurse: {...this.state.currentNurse, shifts: updatedArray}})
          this.showOpenShifts()

        }
      )
    }
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
    .then(r => {
      let updatedArray = this.state.currentNurse.shifts.filter(thisShift => thisShift.id != shift)
      console.log(updatedArray);
      this.setState({currentNurse: {...this.state.currentNurse, shifts: updatedArray}})
    })
  }
  renderShiftForm = () => {
    return (
      <div>
        <Card className="shift" bg="primary" text="white" style={{ width: '79rem'}}>
          <Card.Body>
            <Card.Title>Select A Zone and press enter to start a shift</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Current time: {this.state.time}</Card.Subtitle>
            <Card.Text>
              <DropdownButton id="dropdown-item-button" title="Dropdown button">
                <Dropdown.Item id="1" as="button" onClick={(e)=>this.handleUnitSelection(e.target.id)}>Unit A</Dropdown.Item>
                <Dropdown.Item id="2" as="button" onClick={(e)=>this.handleUnitSelection(e.target.id)}>Unit B</Dropdown.Item>
                <Dropdown.Item id="3" as="button" onClick={(e)=>this.handleUnitSelection(e.target.id)}>Unit C</Dropdown.Item>
                <Dropdown.Item id="4" as="button" onClick={(e)=>this.handleUnitSelection(e.target.id)}>Unit D</Dropdown.Item>
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
    console.log(this.state.selected_unit_id);
  }
  showOpenShifts = () => {
    if (this.state.currentNurse.shifts){
      return this.state.currentNurse.shifts.map(shift => {
        if (!shift.time_out){
          return (
            <div className='shift-card-container'>
              <Card className="shift-card" style={{ width: '18rem' }}>
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
            </div>
          )
        }
      })
    }
  }
  currentAppoinments = () => {
    let items = []
    if (this.state.currentNurse.shifts){
      if (this.state.currentNurse.shifts.find(shift => shift.time_out == null))
      {
      let residents = this.state.currentNurse.shifts.find(shift => shift.time_out == null).unit.residents
      residents.forEach(resident =>{
         resident.appointments.forEach(appoinment => {
           items.push(
             {
               _id            :guid(),
                name          : resident.name + ":" + " " + appoinment.variation,
                startDateTime : parseISOString(appoinment.time),
                endDateTime   : add_minutes(parseISOString(appoinment.time), appoinment.duration),
                classes       : 'color-2 color-3'
             }
           )
         })
       })
       return items
     }
    else {
      return false
    }
  }}
  RenderAgenda = () => {
    if (this.state.firstTime){
      return (
        <Agenda
         appointments={this.currentAppoinments()}
         />
       )
    }
    else{
      //the adjeca component is receiving the new props with the new event included but its not rendering the new event on the calendar
      //on the refresh it works obviously.
      //the adjenda component rerenders every second and im pretty sure its cuz there is a bar on the adgenda that moves with time
      //so it is receiving the props and even if it is not rerendering when it receivs them it should rerendder with the new appointment
      //when it does its secondly reredner
      let prevAppointments = this.currentAppoinments()
      let updated = [...prevAppointments, this.state.newAppointment]
      return (
        <Agenda
         appointments={updated}
         />
       )
    }

  }
  handleLogout = () => {
    clearInterval(this.intervalID);
    localStorage.setItem('currentNurse', null);
    window.location.replace("http://localhost:3001/");
  }
  renderJumbotron = (callBack, text) => {
    return(
      <MDBJumbotron fluid>
       <MDBContainer onClick={callBack}>
         <h2 className="display-4">{text} </h2>
         <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
       </MDBContainer>
      </MDBJumbotron>)
  }

  hasOpenShift = () =>{
    return this.state.currentNurse.shifts && this.state.currentNurse.shifts.find(shift => shift.time_out == null)
  }

  render(){
    return (
      <Fragment>
        <Button onClick={this.handleLogout}>
        Logout<MDBIcon icon="user-lock" />
        </Button>
        {
        this.state.alertFrom ? <AlertForm currentNurse={this.state.currentNurse.id} back={this.openAlertForm}/> :
        this.state.appoinmentForm ? <div>{this.renderAppointmentForm()}</div> :
        this.state.shiftFrom ? this.renderShiftForm() :
        <div><p>Welcome {this.state.currentNurse.name}!</p>
        {this.renderResidents()}
        {this.renderJumbotron(this.openAlertForm, "Create Alert")}
        {this.renderJumbotron(this.openShiftForm, "Initate Shift")}
        {this.hasOpenShift() ? this.renderJumbotron(this.openAppointmentForm, "Schedule An Appointment")  : ''}
        <div className="shift-card-container">
        <CardDeck> {this.showOpenShifts()}</CardDeck><br/>
        </div>
        {this.hasOpenShift() ? this.RenderAgenda() : "Start a shift to see schedule"}
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
