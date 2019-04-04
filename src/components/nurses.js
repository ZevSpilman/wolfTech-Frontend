import React, {Component, Fragment} from  'react'
import {connect} from 'react-redux'
import ReactModal from 'react-modal';
import { Link, Route } from 'react-router-dom'
import App from '../App.css'

class Nurses extends Component {
  state={
    nurseClicked: ''
  }

  shiftLogs = () => {
    let myNurse = this.props.allNurses.find(nurse => nurse.id == this.state.nurseClicked)
      return myNurse.shifts.map(shift => {
        return (<div className="shift">
            <p>{shift.time_in}</p>
            <p>{shift.time_out}</p>
            <p>Unit: {shift.unit.name}</p>
            <p>residents: {shift.unit.residents.map(resident => `${resident.name} `)}</p>
          </div>
        )
      })
  }


  renderNurseInfo = () => {
    let myNurse = this.props.allNurses.find(nurse => nurse.id == this.state.nurseClicked)
    console.log(myNurse);
    return (
      <div>
      <h1>{myNurse.name}</h1>
      <p>{myNurse.logged_in == true? "Logged IN":"Logged OUT"}</p>
      {this.shiftLogs()}
      <button onClick={this.resetNurse}>Back</button>
      </div>
    )
  }

  renderNurses = () => {
      return this.props.allNurses.map((nurse) => {
      return (<div>
        <p onClick={() => this.setNurse(nurse.id)}>
        {nurse.name}
        </p>

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
        {this.state.nurseClicked =='' ? this.renderNurses(): this.renderNurseInfo()}
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
