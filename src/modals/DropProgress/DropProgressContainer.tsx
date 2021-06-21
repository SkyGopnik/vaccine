import React from 'react';
import { connect } from 'react-redux';

import { changeSnackbar } from 'src/store/app/actions';
import DropProgress from './DropProgress';

const DropProgressContainer = (props) => <DropProgress {...props} />;

const mapStateToProps = (state) => ({
  user: state.user.data
});

const mapDispatchToProps = {
  changeSnackbar
};

export default connect(mapStateToProps, mapDispatchToProps)(DropProgressContainer);
