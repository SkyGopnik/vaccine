import React from 'react';
import { connect } from 'react-redux';

import {changeModal} from "src/store/app/actions";

import Notifications from './Notifications';

const NotificationsContainer = (props) => <Notifications {...props} />;

const mapStateToProps = (state) => ({
  snackbar: state.app.snackbar
});

const mapDispatchToProps = {
  changeModal
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsContainer);
