import React from 'react';
import { connect } from 'react-redux';

import Levels from './Levels';

const LevelsContainer = (props) => <Levels {...props} />;

const mapStateToProps = (state) => ({
  snackbar: state.app.snackbar,
  user: state.user.data
});

export default connect(mapStateToProps)(LevelsContainer);
