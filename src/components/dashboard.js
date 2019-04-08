import React from 'react'
import {connect} from 'react-redux';
import { Link, Route } from 'react-router-dom'
import {Button} from 'react-bootstrap'

const Dashboard = (props) => {


  return (
    <div>
    <h1>Good Morning</h1>

    <div className="people-div">
     <Link to="/admin/residents">
     <Button
     className='people-tile'>
      big button with amount of residents Rooms/Residents
     </Button>
     </Link>
    </div>

    <div className="people-div">
     <Link to="/admin/nurses">
     <Button
     className='people-tile'>
      Nurses maybe call it staff
     </Button>
     </Link>
     </div>

      <div className="alert-div">
     <Link to="/admin/alerts">
     <Button
     className='alert-tile'
      variant="danger"
      size="lg">
      Alerts: {props.alerts? props.alerts.length:"nope"}
     </Button>
     </Link>
     </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {alerts: state.alerts}
}



export default connect(mapStateToProps)(Dashboard)
