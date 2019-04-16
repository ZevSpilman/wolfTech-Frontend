import React from "react";
import { MDBNav, MDBContainer, MDBBtn, MDBRow, MDBCol, MDBIcon } from "mdbreact";

const NavBar =  (props) => (
    <MDBContainer>
      <MDBRow>
        <MDBCol size="12">
          <MDBNav color="aqua-gradient" className="font-weight-bold py-4 px-2 mb-4">
            <MDBBtn onClick={() => window.location.replace(`http://localhost:3001/admin/nurses`)}>Nurses</MDBBtn>
            <MDBBtn onClick={() => window.location.replace(`http://localhost:3001/admin/residents`)}>Residents</MDBBtn>
            <MDBBtn onClick={() => window.location.replace(`http://localhost:3001/admin/alerts`)}>Alerts: {props.alerts? props.alerts:0}</MDBBtn>
            <MDBBtn onClick={props.logOut}>
              Logout<MDBIcon icon="user-lock" />
            </MDBBtn>
          </MDBNav>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
);

export default NavBar
