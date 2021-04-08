import React from 'react';
import { connect } from 'react-redux';

import { changeModal, changePanel } from "src/store/app/actions";
import { getNotifications } from "src/store/notifications/actions";

import Notifications from './Notifications';

const NotificationsContainer = (props) => <Notifications {...props} />;

const mapStateToProps = (state) => ({
  snackbar: state.app.snackbar,
  ...state.notifications
});

const mapDispatchToProps = {
  changeModal,
  changePanel,
  getNotifications
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsContainer);
