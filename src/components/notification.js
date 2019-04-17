import React from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {connect} from 'react-redux'


class Notification extends React.Component {
  createNotification = (type) => {

    return () => {
      switch (type) {
        case 'info':
          NotificationManager.info('Info message');
          break;
        case 'success':
          NotificationManager.success('Success message', 'Title here');
          break;
        case 'warning':
          NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
          break;
        case 'error':
          NotificationManager.error(this.props.alert, 'Check inbox for message!', 5000, () => {
            this.props.cancelAlert();
          });
          break;
      }
    };
  };

  render() {
    return (
      <div>

        <button className='btn btn-info'
          onClick={this.createNotification('error')}>New Notification
        </button>

        <NotificationContainer/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {nurses: state.nurses};
}

export default connect()(Notification);
