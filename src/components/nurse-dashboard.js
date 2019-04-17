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
import { MDBJumbotron, MDBContainer, MDBIcon, MDBBtn, MDBRow, MDBCol, MDBCard, MDBCardBody } from "mdbreact";
import { ReactAgenda , ReactAgendaCtrl , guid } from 'react-agenda';
import AlertForm from './alert-form'
import NavBar from './nurse-nav'



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
    newAppointment: [],
    alert: null
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

  // renderResidents = () => {
  //   if (this.state.currentNurse.residents){
  //     return this.state.currentNurse.residents.map(resident => {
  //       return <p>Your Resident: {resident.name}</p>
  //     })
  //   }
  // }
  openAlertForm = () => {
    this.setState({shiftFrom:false, appoinmentForm: false, alertFrom: !this.state.alertFrom})
  }
  openAppointmentForm = () => {
    console.log("im here!");
    this.setState({shiftFrom: false, alertFrom: false, appoinmentForm: !this.state.appoinmentForm})
  }
  handleSubmitAppointment = (e) => {
    e.preventDefault()
    if (this.state.appoinmentInputResidentId == ''){
      window.alert("Please Choose a resident")
    }
    else {
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
      <MDBContainer>
        <MDBRow>
          <MDBCol md="6" >
            <MDBCard >
              <MDBCardBody >
                <form >
                  <p >Schedule Appointment</p>
                  <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                    Choose A Date
                  </label><br/>
                  <DateTimePicker
                      onChange={this.setSelectedDate}
                      value={this.state.date}
                    />
                  <br /><br/>

                  <label
                    htmlFor="defaultFormRegisterConfirmEx"
                    className="grey-text"
                  >
                  Type of Appointment
                  </label>
                  <input
                    type="email"
                    id="defaultFormRegisterConfirmEx"
                    className="form-control"
                    type="text"
                    value={this.state.appoinmentInputType}
                    onChange={(e) => this.handleAppointmentInput(e, "type")}
                  />
                  <br/>
                  <label
                    htmlFor="defaultFormRegisterConfirmEx"
                    className="grey-text"
                  >
                  Duration In Minutes
                  </label>
                  <input
                    type="email"
                    id="defaultFormRegisterConfirmEx"
                    className="form-control"
                    type="number"
                    onChange={this.handleDuration}
                  />
                  <br />

                  <label
                    htmlFor="defaultFormRegisterPasswordEx"
                    className="grey-text"
                  >
                    Choose A Resident
                  </label>
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
                  <div className="text-center mt-4">
                    <MDBBtn
                      type="submit"
                      onClick={(e) => this.handleSubmitAppointment(e)}
                      >
                      Schedule  <MDBIcon far icon="calendar-check" />
                    </MDBBtn>
                     <MDBBtn onClick={this.openAppointmentForm}>
                     Back <MDBIcon icon="hand-peace" />
                     </MDBBtn>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    )
  }

  handleDuration = (e) => {
    this.setState({appointmentDuration: e.target.value})
  }

  openShiftForm = () => {
    this.setState({appoinmentForm: false, alertFrom: false, shiftFrom: !this.state.shiftFrom})
  }
  startShift = () => {
    if (this.showOpenShifts()[0]){
      //in the future maybe we will just take this button out of the navbar when there is a shift open but for now...
      window.alert("You Currently Have an Open shift!")
    }
    else{
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
      <MDBContainer>
        <MDBRow>
          <MDBCol md="6" >
            <MDBCard>
              <MDBCardBody>
                <h1>Select A Zone and press enter to start a shift</h1>
                <h3 >Current time: {this.state.time}</h3>
                <DropdownButton id="dropdown-item-button" title="UNIT SELECTION">
                  <Dropdown.Item id="1" as="button" onClick={(e)=>this.handleUnitSelection(e.target.id)}>Unit A</Dropdown.Item>
                  <Dropdown.Item id="2" as="button" onClick={(e)=>this.handleUnitSelection(e.target.id)}>Unit B</Dropdown.Item>
                  <Dropdown.Item id="3" as="button" onClick={(e)=>this.handleUnitSelection(e.target.id)}>Unit C</Dropdown.Item>
                  <Dropdown.Item id="4" as="button" onClick={(e)=>this.handleUnitSelection(e.target.id)}>Unit D</Dropdown.Item>
                </DropdownButton>
                <MDBBtn onClick={this.startShift}>Start Shift</MDBBtn>
                <MDBBtn outline color="secondary" onClick={this.openShiftForm}>
                  Back <MDBIcon far icon="hand-peace"  className="ml-1" />
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    )
  }
  handleUnitSelection = (e) => {
    this.setState({selected_unit_id: e})
    console.log(this.state.selected_unit_id);
  }
  showOpenShifts = () => {
    let arr = []
    if (this.state.currentNurse.shifts){
       this.state.currentNurse.shifts.map(shift => {
        if (!shift.time_out){
          arr.push(
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
    return arr
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

  hasOpenShift = () =>{
    return this.state.currentNurse.shifts && this.state.currentNurse.shifts.find(shift => shift.time_out == null)
  }

  renderGif = () => {
    return (
      <div>
      <h3>Start a shift to see schedule!</h3>
      <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/c8b32127075137.5635f930a8c2d.gif" alt="Smiley face"></img>
      </div>
    )
  }

  render(){
    return (
      <Fragment className='nurse-dash'>
        
        <NavBar logOut={this.handleLogout} appointment={this.openAppointmentForm} alert={this.openAlertForm} shift={this.openShiftForm} shifted={this.hasOpenShift()}/>
        {
        this.state.alertFrom ? <AlertForm currentNurse={this.state.currentNurse.id} back={this.openAlertForm}/> :
        this.state.appoinmentForm ? <div className="appoinment-container">{this.renderAppointmentForm()}</div> :
        this.state.shiftFrom ? <div className="appoinment-container">{this.renderShiftForm()} </div>:
        <div className="nurse-dash-components"><h3>Welcome {this.state.currentNurse.name}!</h3>
        <CardDeck> {this.showOpenShifts()}</CardDeck><br/>
        {this.hasOpenShift() ? this.RenderAgenda() : this.renderGif()}
        </div>
        }
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {nurses: state.nurses, residents: state.residents}
}

export default connect(mapStateToProps)(NurseDash)
