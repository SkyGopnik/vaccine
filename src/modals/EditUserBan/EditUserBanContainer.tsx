import React from 'react';
import { connect } from 'react-redux';

import { changeSnackbar } from 'src/store/app/actions';

import EditUserBan from './EditUserBan';

const EditUserBanContainer = (props) => <EditUserBan {...props} />;

const mapStateToProps = (state) => ({
  modalData: state.app.modalData
});

const mapDispatchToProps = {
  changeSnackbar
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUserBanContainer);
