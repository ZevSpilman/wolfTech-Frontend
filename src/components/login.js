import React, {Fragment, Component} from 'react'
import { Form, Button } from 'react-bootstrap'
import SignUp from './new-user'
import LoginForm from './login-form'

class Login extends Component {
  state={
    login: false
  }

  flipLogin = () => {
    this.setState({login: !this.state.login})
  }

	render(){
		return (
      <div className="signup-container">
      {!this.state.login?
        <LoginForm flipLogin={this.flipLogin}/>
        :
        <SignUp flipLogin={this.flipLogin}/>
       }
       </div>
		)
	}
}

export default Login
