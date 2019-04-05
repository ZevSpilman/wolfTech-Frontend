import React, {Component, Fragment} from  'react'
import {connect} from 'react-redux'
import ReactModal from 'react-modal';
import { Link, Route } from 'react-router-dom'

class Residents extends Component {
  state={
    residentClicked: ''
  }


  renderResidentInfo = () => {
    console.log("resident info");
    let myResident = this.props.residents.find(resident => resident.id == this.state.residentClicked)
    console.log(myResident);
    return (
      <div>
      <h1>{myResident.name}</h1>
      <p>Allergies: {myResident.allergies}</p>
      <p>Meds: {myResident.medications}</p>
      <p>Unit: {this.props.units.find(unit => unit.id == myResident.unit_id).name}</p>
      <button onClick={this.resetResident}>Back</button>
      </div>
    )
  }

  renderResidents = () => {
      return this.props.residents.map(resident => {
      return (<div>
        <p onClick={() => this.setResident(resident.id)}>
        {resident.name}
        </p>
        </div>
      )
    })
  }

  setResident = (resident) => {
    this.setState({residentClicked: resident})
  }

  resetResident = () => {
    this.setState({residentClicked: ''})
  }

  render(){
    return (
      <Fragment>
      <Link to="/admin/dashboard">
        <button>
         Home
        </button>
      </Link>
        {this.state.residentClicked ==''? this.renderResidents(): this.renderResidentInfo()}
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
