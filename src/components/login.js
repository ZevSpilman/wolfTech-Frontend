import React, {Component} from 'react'
import { connect } from 'react-redux';

class Login extends Component {

  state = {
    userInput: '',
    passInput: ''
  }

  handleUserInput = (e) => {
    this.setState({userInput: e.target.value})
  }

  handlePassInput = (e) => {
    this.setState({passInput: e.target.value})
  }

  handleSubmit = (e) => {
    this.props.dispatch({type: "LOGIN", payload: this.state.userInput})
  }

  render(){
    return(
      <div>
      <p>yo from login</p>
        <input type="text" value={this.state.userInput} onChange={this.handleUserInput}/><br/>
        <input type="text" value={this.state.passInput} onChange={this.handlePassInput}/><br/>
        <input type="submit" onClick={(e) => this.handleSubmit()}/>
      </div>
    )
  }
}

function mapStateToProps(){
  return {

  }
}


export default connect(mapStateToProps)(Login)
