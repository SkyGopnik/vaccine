import React from 'react';
import { connect } from 'react-redux';

import { changeSnackbar } from 'src/store/app/actions';

import EditRole from './EditRole';

const EditRoleContainer = (props) => <EditRole {...props} />;

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  changeSnackbar
};

export default connect(mapStateToProps, mapDispatchToProps)(EditRoleContainer);
