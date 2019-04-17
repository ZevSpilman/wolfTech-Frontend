import React from "react";
import { MDBNav, MDBContainer, MDBBtn, MDBRow, MDBCol, MDBIcon } from "mdbreact";

const NavBar =  (props) => (
    <MDBContainer>
      <MDBRow>
        <MDBCol size="12">
          <MDBNav color="aqua-gradient" className="font-weight-bold py-4 px-2 mb-4">
            <MDBBtn onClick={props.alert}>Create Alert</MDBBtn>
            <MDBBtn onClick={props.shift}>Initiate Shift</MDBBtn>
            {props.shifted?<MDBBtn onClick={props.appointment}>Schedule Appointment</MDBBtn>:''}
            <MDBBtn onClick={props.logOut}>
              Logout<MDBIcon icon="user-lock" />
            </MDBBtn>
          </MDBNav>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
);

export default NavBar
