import React, {Component} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput, MDBCard, MDBCardBody } from 'mdbreact';
import Notification from './notification'

class AlertForm extends Component {
  state = {
    alertInput: '',
    alert: false
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
    .then(r => this.setState({alert: true}))
  }

  handleAlertForm = (e) => {
    this.setState({alertInput: e.target.value})
  }

  cancelAlert = () => {
    this.setState({alert: null})
  }

  render(){
    return (
      <MDBContainer>
        {this.state.alert? <button className='btn btn-success' onClick={this.cancelAlert}>Message Sent</button>:''}
        <MDBRow  className="nav-bar">
          <MDBCol md="6">
          <MDBCard className='appointment-scheduler'>
            <MDBCardBody className='alert-card'>
              <form>
                <p className="h5 text-center mb-4">Alert Form</p><MDBIcon icon="pencil-alt"  />
                <div className="grey-text">
                  <MDBInput
                    type="textarea"
                    rows="2"
                    label="Your message"
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
            </MDBCardBody>
          </MDBCard>
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
