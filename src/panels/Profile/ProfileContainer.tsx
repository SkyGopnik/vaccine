import React from 'react';
import { connect } from 'react-redux';

import {changeSnackbar} from "src/store/app/actions";

import Profile from './Profile';

const ProfileContainer = (props) => <Profile {...props} />;

const mapStateToProps = (state) => {
  const props = {
    user: state.user.data,
    snackbar: state.app.snackbar
  };

  return props;
};

const mapDispatchToProps = {
  changeSnackbar
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
