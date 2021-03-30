import React from 'react';
import { connect } from 'react-redux';

import User from './User';
import {getRandomUser} from "src/store/randomUser/actions";

const UserContainer = (props) => <User {...props} />;

const mapStateToProps = (state) => ({
  snackbar: state.app.snackbar,
  panelData: state.app.panelData,
  ...state.randomUser
});

const mapDispatchToProps = {
  getRandomUser
};

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
