import React from 'react';
import { connect } from 'react-redux';

import Profile from './Profile';

const ProfileContainer = (props) => <Profile {...props} />;

const mapStateToProps = (state) => {
  const props = {
    user: state.user.data
  };

  return props;
};

export default connect(mapStateToProps)(ProfileContainer);
