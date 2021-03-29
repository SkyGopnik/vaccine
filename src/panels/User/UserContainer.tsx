import React from 'react';
import { connect } from 'react-redux';

import User from './User';

const UserContainer = (props) => <User {...props} />;

const mapStateToProps = (state) => ({
  snackbar: state.app.snackbar,
  panelData: state.app.panelData
});

export default connect(mapStateToProps)(UserContainer);
