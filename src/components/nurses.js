import React, {Component, Fragment} from  'react'
import {connect} from 'react-redux'
import ReactModal from 'react-modal';
import { Link, Route } from 'react-router-dom'
import App from '../App.css'
import {CardDeck, Card, Button, ListGroup} from 'react-bootstrap'


class Nurses extends Component {
  state={
    nurseClicked: '',
    searchInput: '',
    filteredNurses: this.props.allNurses,
    nurses: this.props.allNurses

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
      return this.state.filteredNurses.map((nurse) => {
      return (
        <div>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="https://cdn.technologyreview.com/i/images/faceapp1.jpg?sw=600&cx=0&cy=0&cw=1280&ch=720" />
          <Card.Body>
            <Card.Title>{nurse.name}</Card.Title>
            <Card.Text>
              Position: Nurse
            </Card.Text>
            <Button variant="primary" onClick={() => this.setNurse(nurse.id)}>INFO</Button>
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

  handleSearchInput = (e) => {
    this.setState({searchInput: e.target.value})
    let filtered = this.state.nurses.filter(nurse => nurse.name.includes(e.target.value))
    this.setState({filteredNurses: filtered})
  }

  render(){
    return (
      <Fragment>
        <Link to="/admin/dashboard">
          <button>
           Home
          </button>
        </Link>
        <div>
        {this.state.nurseClicked === '' ? <input type='text' value={this.state.searchInput} onChange={this.handleSearchInput}></input> : ''}
        </div>
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
