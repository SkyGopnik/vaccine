import React from 'react';
import { connect } from 'react-redux';

import { syncUser } from "src/store/user/actions";
import { changeModal, changeSnackbar } from "src/store/app/actions";
import Tasks from './Tasks';

const TasksContainer = (props) => <Tasks {...props} />;

const mapStateToProps = (state) => {
  const props = {
    user: state.user.data,
    snackbar: state.app.snackbar
  };

  return props;
};

const mapDispatchToProps = {
  syncUser,
  changeModal,
  changeSnackbar
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksContainer);
