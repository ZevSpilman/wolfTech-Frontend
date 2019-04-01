import React, {Fragment} from 'react'
import {connect} from 'react-redux'

const Rooms = () => {


  return (
    <Fragment>
    <p>Hello from rooms</p>
    </Fragment>
  )
}

function mapStateToProps(){
}



export default connect(mapStateToProps)(Rooms)
