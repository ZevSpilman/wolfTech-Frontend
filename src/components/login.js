import React, {Component} from 'react'
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

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

  handleSubmit = () => {
    localStorage.setItem('currentNurse', this.state.userInput);
    window.location.replace("http://localhost:3001/nurse");

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
