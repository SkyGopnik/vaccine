import React from 'react';
import { connect } from 'react-redux';

import {changeSnackbar} from "src/store/app/actions";
import {syncUser} from "src/store/user/actions";

import Promocode from './Promocode';

const PromocodeContainer = (props) => <Promocode {...props} />;

const mapStateToProps = (state) => ({
  user: state.user.data
});

const mapDispatchToProps = {
  changeSnackbar,
  syncUser
};

export default connect(mapStateToProps, mapDispatchToProps)(PromocodeContainer);
