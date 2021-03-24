import React from 'react';
import { connect } from 'react-redux';

import { changeAdditional } from "src/store/user/actions";
import { changePanel, changeSnackbar } from "src/store/app/actions";

import Settings from './Settings';

const OnboardContainer = (props) => <Settings {...props} />;

const mapStateToProps = (state) => {
  const props = {
    user: state.user.data,
    snackbar: state.app.snackbar
  };

  return props;
};

const mapDispatchToProps = {
  changeAdditional,
  changePanel,
  changeSnackbar
};

export default connect(mapStateToProps, mapDispatchToProps)(OnboardContainer);
