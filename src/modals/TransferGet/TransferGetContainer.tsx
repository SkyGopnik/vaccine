import React from 'react';
import { connect } from 'react-redux';

import TransferGet from './TransferGet';

const TransferGetContainer = (props) => <TransferGet {...props} />;

const mapStateToProps = (state) => {
  const props = {
    modalData: state.app.modalData,
    user: state.user.data
  };

  return props;
};

export default connect(mapStateToProps)(TransferGetContainer);
