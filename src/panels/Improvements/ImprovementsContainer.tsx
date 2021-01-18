import React from 'react';
import { connect } from 'react-redux';

import { syncUser } from "src/store/user/actions";
import { changeModal, changeSnackbar } from "src/store/app/actions";
import Improvements from './Improvements';

const ImprovementsContainer = (props) => <Improvements {...props} />;

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

export default connect(mapStateToProps, mapDispatchToProps)(ImprovementsContainer);
