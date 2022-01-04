import React from 'react';
import { connect } from 'react-redux';

import {changeModal, changePanel, changeSnackbar} from 'src/store/app/actions';
import {getProfile} from "src/store/profile/actions";
import {syncUser} from "src/store/user/actions";

import GroupLeave from './GroupLeave';

const GroupLeaveContainer = (props) => <GroupLeave {...props} />;

const mapStateToProps = (state) => ({
  modalData: state.app.modalData,
  user: state.user.data
});

const mapDispatchToProps = {
  changeModal,
  changePanel,
  changeSnackbar,
  getProfile,
  syncUser
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupLeaveContainer);
