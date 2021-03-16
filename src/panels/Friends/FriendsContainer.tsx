import React from 'react';
import { connect } from 'react-redux';
import { changeModal, changePanel } from "src/store/app/actions";

import Friends from './Friends';

const FriendsContainer = (props) => <Friends {...props} />;

const mapStateToProps = (state) => {
  const props = {
    snackbar: state.app.snackbar
  };

  return props;
};

const mapDispatchToProps = {
  changeModal,
  changePanel
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendsContainer);
