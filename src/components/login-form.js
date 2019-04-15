import React, {Component} from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBModalFooter,
  MDBIcon,
  MDBCardHeader,
  MDBBtn,
  MDBInput
} from "mdbreact";

class LoginForm extends Component {

  state = {
		name: "",
		password: ""
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (e) => {
    e.preventDefault()
		fetch("http://localhost:3000/api/v1/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accepts": "application/json",
			},
			body: JSON.stringify(this.state)
		})
		.then(res => res.json())
		.then((response) => {

			if (response.errors) {
				alert(response.errors)
			} else {
					// we need to login at the top level where we are holding our current user!
					// setState in App to currentuser
					//this.props.setCurrentNurse(response.nurse)
					localStorage.setItem('jwt', response.jwt)
					localStorage.setItem('currentNurse', response.nurse.name)
				  window.location.replace("http://localhost:3001/nurse");
				}
			})
	}
  render(){
    return (
      <div className='sign-up'>
        <MDBContainer>
          <MDBRow>
            <MDBCol md="6">
              <MDBCard className='login-card'>
                <MDBCardBody>
                  <MDBCardHeader className="form-header deep-blue-gradient rounded">
                    <h3 className="my-3">
                      <MDBIcon icon="lock" /> Login:
                    </h3>
                  </MDBCardHeader>
                  <form>
                    <div className="grey-text">
                      <MDBInput
                        label="Type your Username"
                        icon="envelope"
                        group
                        type="user"
                        validate
                        error="wrong"
                        success="right"
                        onChange={this.handleChange}
                        name="name"
                        value={this.state.name}
                        placeholder='Username'
                      />
                      <MDBInput
                        label="Type your password"
                        icon="lock"
                        group
                        type="password"
                        validate
                        onChange={this.handleChange}
                        type="password"
                        name="password"
                        value={this.state.password}
                        placeholder='Password'
                      />
                    </div>

                  <div className="text-center mt-4">
                    <MDBBtn
                      color="light-blue"
                      className="mb-3"
                      onClick={this.handleSubmit}
                    >
                      Login
                    </MDBBtn>
                  </div>
                  </form>
                  <MDBModalFooter>
                    <div className="font-weight-light">
                    <p>Not A Member?</p>
                    <MDBBtn
                      color="light-blue"
                      className="mb-3"
                      onClick={this.props.flipLogin}
                    >
                      Sign Up
                    </MDBBtn>
                    </div>
                  </MDBModalFooter>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
};

export default LoginForm;
