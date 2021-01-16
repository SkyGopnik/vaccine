import React from 'react';
import { connect } from 'react-redux';
import { getRating } from "src/store/rating/actions";

import Rating from './Rating';

const RatingContainer = (props) => <Rating {...props} />;

const mapStateToProps = (state) => {
  const props = {
    list: state.rating.list
  };

  return props;
};

const mapDispatchToProps = {
  getRating
};

export default connect(mapStateToProps, mapDispatchToProps)(RatingContainer);
