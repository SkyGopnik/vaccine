import React from 'react';
import { connect } from 'react-redux';

import {changeSnackbar} from "src/store/app/actions";
import {syncUser} from "src/store/user/actions";

import Levels from './Levels';

const LevelsContainer = (props) => <Levels {...props} />;

const mapStateToProps = (state) => ({
  snackbar: state.app.snackbar,
  user: state.user.data
});

export default connect(mapStateToProps, {
  changeSnackbar,
  syncUser
})(LevelsContainer);
