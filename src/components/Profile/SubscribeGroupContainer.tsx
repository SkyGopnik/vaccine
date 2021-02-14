import React from 'react';
import { connect } from 'react-redux';

import {changeAdditional} from "src/store/user/actions";
import {changeSnackbar} from "src/store/app/actions";

import SubscribeGroup from './SubscribeGroup';

const SubscribeGroupContainer = (props) => <SubscribeGroup {...props} />;

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  changeAdditional,
  changeSnackbar
};

export default connect(mapStateToProps, mapDispatchToProps)(SubscribeGroupContainer);
