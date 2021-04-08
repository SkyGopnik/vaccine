import React from 'react';
import { connect } from 'react-redux';

import { changeView } from "src/store/app/actions";
import { syncUser } from "src/store/user/actions";
import { connectWs } from "src/store/webSocket/actions";

import Error from './Error';

const ErrorContainer = (props) => <Error {...props} />;

const mapStateToProps = (state) => ({
  ...state.webSocket,
});

const mapDispatchToProps = {
  connectWs,
  changeView,
  syncUser
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorContainer);
