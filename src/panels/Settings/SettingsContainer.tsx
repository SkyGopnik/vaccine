import React from 'react';
import { connect } from 'react-redux';

import { changeAdditional } from "src/store/user/actions";
import { changePanel, changeSnackbar, changePopout, changeModal } from "src/store/app/actions";

import Settings from './Settings';

const OnboardContainer = (props) => <Settings {...props} />;

const mapStateToProps = (state) => ({
  user: state.user.data,
  snackbar: state.app.snackbar,
  ...state.profile
});

const mapDispatchToProps = {
  changeAdditional,
  changePanel,
  changeSnackbar,
  changePopout,
  changeModal
};

export default connect(mapStateToProps, mapDispatchToProps)(OnboardContainer);
