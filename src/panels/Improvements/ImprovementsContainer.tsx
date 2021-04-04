import React from 'react';
import { connect } from 'react-redux';

import { syncUser } from "src/store/user/actions";
import { changeModal, changeSnackbar, changePopout } from "src/store/app/actions";
import Improvements from './Improvements';

const ImprovementsContainer = (props) => <Improvements {...props} />;

const mapStateToProps = (state) => ({
  user: state.user.data,
  snackbar: state.app.snackbar
});

const mapDispatchToProps = {
  syncUser,
  changeModal,
  changePopout,
  changeSnackbar
};

export default connect(mapStateToProps, mapDispatchToProps)(ImprovementsContainer);
