import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { MDBContainer, MDBRow, MDBIcon, MDBCol, MDBModalFooter, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';

class SignUp extends React.Component {
	state = {
		name: "",
		password: "",
		passwordConfirmation: "",
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	createUser = () => {
		fetch("http://localhost:3000/api/v1/nurses", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accepts": "application/json",
			},
			body: JSON.stringify(this.state)
		})
		.then(res => res.json())
		.then((response) => {

			if (response.errors){
				alert(response.errors)
			} else {
        window.location.replace(`/users/${response.user.id}`);
			}
		})
	}

	handleSubmit = () => {
		if(this.state.password === this.state.passwordConfirmation){
			this.createUser()
		} else {
			alert("Passwords don't match!")
		}
	}

	render(){
		return (
			<div className='sign-up'>
				<MDBContainer>
		      <MDBRow>
		        <MDBCol md="6">
		          <MDBCard className="login-card">
		            <MDBCardBody>
		              <form>
		                <p className="h4 text-center py-4">Sign up</p>
		                <div className="grey-text">
		                  <MDBInput
		                    label="Your name"
		                    icon="user"
		                    group
		                    type="text"
		                    validate
		                    error="wrong"
		                    success="right"
												onChange={this.handleChange}
											  name="name"
											  value={this.state.name}
											  placeholder='Name'
		                  />
											<MDBInput
		                    label="Your password"
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
		                  <MDBInput
		                    label="Confirm your Password"
		                    icon="exclamation-triangle"
		                    group
		                    type="text"
		                    validate
		                    error="wrong"
		                    success="right"
												onChange={this.handleChange}
											  type="password"
											  name="passwordConfirmation"
											  value={this.state.passwordConfirmation}
											  placeholder='Password Confirmation'
		                  />
		                </div>
		                <div className="text-center py-4 mt-3">
		                  <Button variant="success" type="submit" onClick={this.handleSubmit}>
		                    Register
		                  </Button>
		                </div>
		              </form>
									<MDBModalFooter>
                    <div className="font-weight-light">
                    <p>Already Have An Account?</p>
                    <MDBBtn
                      color="light-blue"
                      className="mb-3"
                      onClick={this.props.flipLogin}
                    >
                    Log In
                    </MDBBtn>
                    </div>
                  </MDBModalFooter>
		            </MDBCardBody>
		          </MDBCard>
		        </MDBCol>
		      </MDBRow>
		    </MDBContainer>
			</div>
		)
	}
}

export default SignUp
