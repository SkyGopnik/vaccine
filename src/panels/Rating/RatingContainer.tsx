import React from 'react';
import { connect } from 'react-redux';

import { getRating } from "src/store/rating/actions";
import { changeModal } from "src/store/app/actions";
import { sendWsMessage } from "src/store/webSocket/actions";

import Rating from './Rating';

const RatingContainer = (props) => <Rating {...props} />;

const mapStateToProps = (state) => {
  const props = {
    list: state.rating.list,
    user: state.user.data,
    snackbar: state.app.snackbar
  };

  return props;
};

const mapDispatchToProps = {
  getRating,
  changeModal,
  sendWsMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(RatingContainer);
