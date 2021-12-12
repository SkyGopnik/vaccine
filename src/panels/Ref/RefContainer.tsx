import React from 'react';
import { connect } from 'react-redux';

import {getProfile} from "src/store/profile/actions";
import {changeModal, changePanel, changeSnackbar} from "src/store/app/actions";
import {sendWsMessage} from "src/store/webSocket/actions";
import {syncUser} from "src/store/user/actions";

import Ref from './Ref';

const RefContainer = (props) => <Ref {...props} />;

const mapStateToProps = (state) => {
  const props = {
    snackbar: state.app.snackbar,
    user: state.user.data,
    ...state.profile
  };

  return props;
};

const mapDispatchToProps = {
  sendWsMessage,
  changeSnackbar,
  syncUser,
  changeModal,
  changePanel,
  getProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(RefContainer);
