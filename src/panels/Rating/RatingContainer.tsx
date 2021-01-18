import React from 'react';
import { connect } from 'react-redux';
import { getRating } from "src/store/rating/actions";
import { changeModal } from "src/store/app/actions";

import Rating from './Rating';

const RatingContainer = (props) => <Rating {...props} />;

const mapStateToProps = (state) => {
  const props = {
    list: state.rating.list,
    snackbar: state.app.snackbar
  };

  return props;
};

const mapDispatchToProps = {
  getRating,
  changeModal
};

export default connect(mapStateToProps, mapDispatchToProps)(RatingContainer);
