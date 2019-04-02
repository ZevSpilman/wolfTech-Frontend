import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'


class NurseDash extends Component {

  state = {
    currentNurse: {name: "hi"},
    alertFrom: false
  }

  componentDidMount(){
    if (this.props.allNurses){
      let theNurse = this.props.allNurses.find(n => n.id == this.props.currentNurse)
      this.setState({currentNurse: theNurse})
    }
  }

  renderResidents = () => {
    if (this.state.currentNurse.residents){
      return this.state.currentNurse.residents.map(resident => {
        return <p>Your Resident: {resident.name}</p>
      })
    }
  }

  openAlertForm = () => {
    this.setState({alertFrom: true})
  }


  render(){
    return (
      <Fragment>
      <p>Welcome {this.state.currentNurse.name}!</p>
       {this.renderResidents()}
       <button onClick={this.openAlertForm}>Create Alert</button>
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {nurses: state.nurses}
}


export default connect(mapStateToProps)(NurseDash)
