import React from 'react';
import { connect } from 'react-redux';

import { getRating } from "src/store/rating/actions";
import { changeModal, changePanel, changeStory } from "src/store/app/actions";
import { sendWsMessage } from "src/store/webSocket/actions";

import Users from './Users';

const UsersContainer = (props) => <Users {...props} />;

const mapStateToProps = (state) => ({
  list: state.rating.list,
  user: state.user.data,
  snackbar: state.app.snackbar
});

const mapDispatchToProps = {
  getRating,
  changeModal,
  changePanel,
  changeStory,
  sendWsMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
