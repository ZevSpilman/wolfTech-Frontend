import React from 'react'
import {connect} from 'react-redux';
import { Link, Route } from 'react-router-dom'

const Dashboard = () => {


  return (
    <div>
    <h1>Good Morning</h1>
     <Link to="/admin/residents">
     <button>
      Rooms/Residents
     </button>
     </Link>


     <Link to="/admin/nurses">
     <button>
      Nurses
     </button>
     </Link>


     <Link to="/admin/alerts">
     <button>
      Alerts
     </button>
     </Link>

    </div>
  )
}

function mapStateToProps() {

}



export default connect(mapStateToProps)(Dashboard)
