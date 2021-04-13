import React from 'react';
import { connect } from 'react-redux';

import { syncUser } from "src/store/user/actions";
import { changeSnackbar } from "src/store/app/actions";

import Tasks from './Tasks';

const TasksContainer = (props) => <Tasks {...props} />;

const mapStateToProps = (state) => ({
  user: state.user.data,
  snackbar: state.app.snackbar,
  profile: state.profile.data
});

const mapDispatchToProps = {
  syncUser,
  changeSnackbar
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksContainer);
