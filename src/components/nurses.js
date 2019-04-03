import React, {Component, Fragment} from  'react'
import {connect} from 'react-redux'
import ReactModal from 'react-modal';

class Nurses extends Component {
  state={
    nurseClicked: ''
  }



  renderNurseInfo = () => {
    console.log("nurse info");
    let myNurse = this.props.nurses.find(nurse => nurse.id == this.state.nurseClicked)
    console.log(myNurse);
    return (
      <div>
      <h1>{myNurse.name}</h1>
      <p>{myNurse.logged_in == true? "Logged IN":"Logged OUT"}</p>
      <button onClick={this.resetNurse}>Back</button>
      </div>
    )
  }

  renderNurses = () => {
      return this.props.nurses.map(nurse => {
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
        {this.state.nurseClicked ==''? this.renderNurses(): this.renderNurseInfo()}

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
