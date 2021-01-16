import React from 'react';
import { connect } from 'react-redux';

import { connectWs } from "src/store/webSocket/actions";
import Error from './Error';

const ErrorContainer = (props) => <Error {...props} />;

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {
  connectWs
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorContainer);
