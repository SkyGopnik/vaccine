import React from 'react';
import { connect } from 'react-redux';

import {getProfile} from "src/store/profile/actions";
import {changeSnackbar} from "src/store/app/actions";

import Ref from './Ref';

const RefContainer = (props) => <Ref {...props} />;

const mapStateToProps = (state) => {
  const props = {
    snackbar: state.app.snackbar,
    ...state.profile
  };

  return props;
};

const mapDispatchToProps = {
  changeSnackbar,
  getProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(RefContainer);
