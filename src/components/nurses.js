import React, {Component, Fragment} from  'react'
import {connect} from 'react-redux'
import ReactModal from 'react-modal';
import { Link, Route } from 'react-router-dom'
import App from '../App.css'
import {CardDeck, Card, Button, ListGroup} from 'react-bootstrap'


class Nurses extends Component {
  state={
    nurseClicked: ''
  }

  shiftLogs = () => {
    let myNurse = this.props.allNurses.find(nurse => nurse.id == this.state.nurseClicked)
      return myNurse.shifts.map(shift => {
        return (
           <ListGroup.Item>
              <p>{shift.time_in}</p>
              <p>{shift.time_out}</p>
              <p>Unit: {shift.unit.name}</p>
              <p>residents: {shift.unit.residents.map(resident => `${resident.name} `)}</p>
            </ListGroup.Item>
        )
      })
  }

  renderNurseInfo = () => {
    let myNurse = this.props.allNurses.find(nurse => nurse.id == this.state.nurseClicked)
    return (
      <div>
      <h1>{myNurse.name}</h1>
      <p>{myNurse.logged_in == true? "Logged IN":"Logged OUT"}</p>
      <div className="shift-logs">
      <ListGroup>
        {this.shiftLogs()}
        </ListGroup>
      </div>
      <button onClick={this.resetNurse}>Back</button>
      </div>
    )
  }

  renderNurses = () => {
      return this.props.allNurses.map((nurse) => {
      return (
        <div>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="" />
          <Card.Body>
            <Card.Title>{nurse.name}</Card.Title>
            <Card.Text>
              Age: {nurse.age}<br/>
            </Card.Text>
            <Button variant="primary" onClick={() => this.setNurse(nurse.id)}>Go somewhere</Button>
          </Card.Body>
        </Card>
        </div>
      )
    })
  }

  setNurse = (nurse) => {
    this.setState({nurseClicked: nurse})
  }

  resetNurse = () => {
    this.setState({nurseClicked: ''})
  }

  render(){
    return (
      <Fragment>
        <Link to="/admin/dashboard">
          <button>
           Home
          </button>
        </Link>
        {this.state.nurseClicked === '' ? <CardDeck>{this.renderNurses()}</CardDeck> : this.renderNurseInfo()}
      </Fragment>
    )
  }

}

function mapStateToProps(state){
  return {nurses: state.nurses};
}

function mapDispatchToProps(){
}

export default connect(mapStateToProps)(Nurses)
