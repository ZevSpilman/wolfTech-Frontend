import React, {Fragment} from 'react'
import {connect} from 'react-redux'


const Alerts = () => {
  return (
    <Fragment>
    <p>Hello from Alerts</p>
    </Fragment>
  )
}

function mapStateToProps(){

}

export default connect(mapStateToProps)(Alerts)
