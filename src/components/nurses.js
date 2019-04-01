import React, {Fragment} from  'react'
import {connect} from 'react-redux'

const Nurses = () => {
  return (
    <Fragment>
    <p>Hello From Nurses</p>
    </Fragment>

  )
}

function mapStateToProps(){
  
}

export default connect(mapStateToProps)(Nurses)
