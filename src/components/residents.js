import React, {Component, Fragment} from  'react'
import {connect} from 'react-redux'
import ReactModal from 'react-modal';
import { Link, Route } from 'react-router-dom'
import {Card, Button, CardDeck} from 'react-bootstrap'

class Residents extends Component {
  state = {
    residentClicked: ''
  }

  renderResidentInfo = () => {
    console.log(" in renderResidentInfo",this.state.residentClicked);
    let myResident = this.props.residents.find(resident => resident.id == this.state.residentClicked)
    return (
      <div>
      <h1>{myResident.name}</h1>
      <p>Allergies: {myResident.allergies}</p>
      <p>Meds: {myResident.medications}</p>
      <p>Unit: {this.props.units.find(unit => unit.id == myResident.unit.id).name}</p>
      <button onClick={this.resetResident}>Back</button>
      </div>
    )
  }

  renderResidents = () => {
      return this.props.residents.map(resident => {
      return (<div>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="" />
          <Card.Body>
            <Card.Title>{resident.name}</Card.Title>
            <Card.Text>
              Age: {resident.age}<br/>
              Unit: {resident.unit.name}
            </Card.Text>
            <Button variant="primary" onClick={() => this.setResident(resident.id)}>Go somewhere</Button>
          </Card.Body>
        </Card>
        </div>
      )
    })
  }

  setResident = (resident) => {
    this.setState({residentClicked: resident})
  }

  resetResident = () => {
    console.log("resetting...");
    this.setState({residentClicked: ''})
  }

  render(){
    console.log(this.state.residentClicked);
    return (
      <Fragment>
      <Link to="/admin/dashboard">
        <button>
         Home
        </button>
      </Link>
        {this.state.residentClicked === '' ? <CardDeck>{this.renderResidents()}</CardDeck> : this.renderResidentInfo()}
      </Fragment>
    )
  }
}

function mapStateToProps(state){
  return {residents: state.residents};
}

function mapDispatchToProps(){

}

export default connect(mapStateToProps)(Residents)
