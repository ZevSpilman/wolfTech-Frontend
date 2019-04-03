import React, {Component, Fragment} from 'react'

class Modal extends Component{
  state = {
    modalIsOpen: false
  }

  render(){
    return(
      <ReactModal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.renderNurseInfo}
        onRequestClose={this.handleRequestCloseFunc}
        closeTimeoutMS={0}
        contentLabel="Example Modal"

        portalClassName="ReactModalPortal"

        overlayClassName="ReactModal__Overlay"

        className="ReactModal__Content"

        bodyOpenClassName="ReactModal__Body--open"

        htmlOpenClassName="ReactModal__Html--open"
        />
    )
  }
}
