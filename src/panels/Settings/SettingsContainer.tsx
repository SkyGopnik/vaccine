import React from 'react';
import { connect } from 'react-redux';

import { changeAdditional } from "src/store/user/actions";

import Settings from './Settings';

const OnboardContainer = (props) => <Settings {...props} />;

const mapStateToProps = (state) => {
  const props = {
    user: state.user.data
  };

  return props;
};

const mapDispatchToProps = {
  changeAdditional
};

export default connect(mapStateToProps, mapDispatchToProps)(OnboardContainer);
