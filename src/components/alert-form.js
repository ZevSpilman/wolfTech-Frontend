import React, {Component} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput } from 'mdbreact';

class AlertForm extends Component {
  state = {
    alertInput: ''
  }


  handleSubmitAlert = (e) => {
    fetch("http://localhost:3000/api/v1/alerts", {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        Accepts: 'application/json'
      },
      body: JSON.stringify({
       nurse_id: this.props.currentNurse,
       message: this.state.alertInput,
       admin_id: 1,
       resolved: false

     })
    })
    .then(r => r.json())
    .then(console.log)
  }

  handleAlertForm = (e) => {
    this.setState({alertInput: e.target.value})
  }

  render(){
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol md="6">
            <form>
              <p className="h5 text-center mb-4">Write to us</p>
              <div className="grey-text">
                <MDBInput
                  label="Your name"
                  icon="user"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                />
                <MDBInput
                  label="Subject"
                  icon="tag"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                />
                <MDBInput
                  type="textarea"
                  rows="2"
                  label="Your message"
                  icon="pencil-alt"
                  value={this.state.alertInput}
                  onChange={this.handleAlertForm}
                />
              </div>
              <div className="text-center">
                <MDBBtn outline color="secondary" onClick={(e) => this.handleSubmitAlert(e)}>
                  Send <MDBIcon far icon="paper-plane" className="ml-1" />
                </MDBBtn>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
        <MDBBtn outline color="secondary" onClick={this.props.back}>
          Back <MDBIcon far icon="hand-peace"  className="ml-1" />
        </MDBBtn>
      </MDBContainer>
    );
  }
};

export default AlertForm;