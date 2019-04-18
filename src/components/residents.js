import React, {Component, Fragment} from  'react'
import {connect} from 'react-redux'
import ReactModal from 'react-modal';
import { Link, Route } from 'react-router-dom'
import {Card, Button, CardDeck} from 'react-bootstrap'
import {MDBBtn, MDBCard, MDBCardBody } from "mdbreact";


let imgsrc = "data:image/jpeg;base64,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"


class Residents extends Component {
  state = {
    residentClicked: '',
    searchInput: '',
    filteredResidents: this.props.residents,
    residents: this.props.residents
  }

  componentWillReceiveProps(props){
    this.setState({residents: this.props.residents, filteredResidents: this.props.residents})
  }


  renderResidentInfo = () => {
    console.log(" in renderResidentInfo",this.state.residentClicked);
    let myResident = this.props.residents.find(resident => resident.id == this.state.residentClicked)
    return (
      <div>
      <MDBCard>
        <MDBCardBody>
          <h1>{myResident.name}</h1>
          <p>Allergies: {myResident.allergies}</p>
          <p>Meds: {myResident.medications}</p>
          <p>Unit: {this.props.units.find(unit => unit.id == myResident.unit.id).name}</p>
          <MDBBtn onClick={this.resetResident}>Back</MDBBtn>
        </MDBCardBody>
      </MDBCard>
      </div>
    )
  }

  renderResidents = () => {
    if (this.state.filteredResidents){
      return this.state.filteredResidents.map(resident => {
      return (<div>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={imgsrc} />
          <Card.Body>
            <Card.Title>{resident.name}</Card.Title>
            <Card.Text>
              Age: {resident.age}<br/>
              Unit: {resident.unit.name}
            </Card.Text>
            <Button variant="primary" onClick={() => this.setResident(resident.id)}>INFO</Button>
          </Card.Body>
        </Card>
        </div>
      )
    })
    }

  }

  setResident = (resident) => {
    this.setState({residentClicked: resident})
  }

  resetResident = () => {
    console.log("resetting...");
    this.setState({residentClicked: ''})
  }

  handleSearchInput = (e) => {
    this.setState({searchInput: e.target.value})
    let filtered = this.state.residents.filter(resident => resident.name.includes(e.target.value))
    this.setState({filteredResidents: filtered})
  }

  render(){
    console.log(this.state.residentClicked);
    return (
      <Fragment>
      <Link to="/admin/dashboard">
        <MDBBtn>
         Home
        </MDBBtn>
      </Link>
        <div>
          {this.state.residentClicked === '' ? <input type='text' value={this.state.searchInput} onChange={this.handleSearchInput}></input>: ''}
        </div>
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
