import React from 'react';
import { connect } from 'react-redux';

import { changeModal } from "src/store/app/actions";
import { getNotifications } from "src/store/notifications/actions";

import Notifications from './Notifications';

const NotificationsContainer = (props) => <Notifications {...props} />;

const mapStateToProps = (state) => ({
  snackbar: state.app.snackbar,
  ...state.notifications
});

const mapDispatchToProps = {
  changeModal,
  getNotifications
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsContainer);
