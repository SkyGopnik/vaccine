import React from 'react';
import { connect } from 'react-redux';

import { changePanel, changeModal, changeSnackbar } from "src/store/app/actions";

import Admin from './Admin';

const OnboardContainer = (props) => <Admin {...props} />;

const mapStateToProps = (state) => {
  return {
    snackbar: state.app.snackbar
  };
};

const mapDispatchToProps = {
  changePanel,
  changeModal,
  changeSnackbar
};

export default connect(mapStateToProps, mapDispatchToProps)(OnboardContainer);
