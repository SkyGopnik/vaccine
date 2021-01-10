import React from 'react';
import { connect } from 'react-redux';

import { syncUser } from "src/store/user/actions";
import { changeModal } from "src/store/app/actions";
import Improvements from './Improvements';

const ImprovementsContainer = (props) => <Improvements {...props} />;

const mapStateToProps = (state) => {
  const props = {
    user: state.user.data
  };

  return props;
};

const mapDispatchToProps = {
  syncUser,
  changeModal
};

export default connect(mapStateToProps, mapDispatchToProps)(ImprovementsContainer);
