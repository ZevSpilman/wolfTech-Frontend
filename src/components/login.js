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
// import React, {Component} from 'react'
// import { connect } from 'react-redux';
// import { createBrowserHistory } from 'history';
// const history = createBrowserHistory();
//
// class Login extends Component {
//
//   state = {
// 		username: "",
// 		password: "",
// 	}
//
// handleChange = (event) => {
// 		this.setState({
// 			[event.target.name]: event.target.value
// 		})
// 	}
//
// handleSubmit = () => {
// 		fetch("http://localhost:3000/api/v1/login", {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 				"Accepts": "application/json",
// 			},
// 			body: JSON.stringify(this.state)
// 		})
// 		.then(res => res.json())
// 		.then((response) => {
// 			if (response.errors) {
// 				alert(response.errors)
// 			} else {
// 					// we need to login at the top level where we are holding our current user!
// 					// setState in App to currentuser
// 					this.props.setCurrentUser(response.user)
// 					localStorage.setItem('jwt', response.jwt)
// 					this.props.history.push(`/users/${response.user.id}`)
// 				}
// 			})
// 	}
//
//   render(){
//     return(
//       <div>
//       <p>yo from login</p>
//         <input type="text" value={this.state.userInput} onChange={this.handleUserInput}/><br/>
//         <input type="text" value={this.state.passInput} onChange={this.handlePassInput}/><br/>
//         <input type="submit" onClick={(e) => this.handleSubmit()}/>
//       </div>
//     )
//   }
// }
//
// function mapStateToProps(){
//   return {
//
//   }
// }
//
//
// export default connect(mapStateToProps)(Login)


//
// import React from 'react'
// import { Form, Button } from 'react-bootstrap'
//
// class Login extends React.Component {
// 	state = {
// 		name: "",
// 		username: "",
// 		password: "",
// 		passwordConfirmation: "",
// 	}
//
// 	handleChange = (event) => {
// 		this.setState({
// 			[event.target.name]: event.target.value
// 		})
// 	}
//
// 	createUser = () => {
// 		fetch("http://localhost:3000/api/v1/nurses", {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 				"Accepts": "application/json",
// 			},
// 			body: JSON.stringify(this.state)
// 		})
// 		.then(res => res.json())
// 		.then((response) => {
//
// 			if (response.errors){
// 				alert(response.errors)
// 			} else {
//         window.location.replace(`/users/${response.user.id}`);
// 			}
// 		})
// 	}
//
// 	handleSubmit = () => {
// 		if(this.state.password === this.state.passwordConfirmation){
// 			this.createUser()
// 		} else {
// 			alert("Passwords don't match!")
// 		}
// 	}
//
// 	render(){
// 		return (
//
// 			<Form onSubmit={this.handleSubmit}>
// 		    <p>
// 		      <label>Username</label>
// 		      <input onChange={this.handleChange} name="username" value={this.state.username} placeholder='Username' />
// 		    </p>
// 		    <p>
// 		      <label>Name</label>
// 		      <input onChange={this.handleChange} name="name" value={this.state.name} placeholder='Name' />
// 		    </p>
// 		    <p>
// 		      <label>Password</label>
// 		      <input onChange={this.handleChange} type="password" name="password" value={this.state.password} placeholder='Password' />
// 		    </p>
// 		    <p>
// 		      <label>Password Confirmation</label>
// 		      <input onChange={this.handleChange} type="password" name="passwordConfirmation" value={this.state.passwordConfirmation} placeholder='Password Confirmation' />
// 		    </p>
// 		    <Button type='submit'>Submit</Button>
// 		  </Form>
// 		)
// 	}
// }
//
// export default Login
