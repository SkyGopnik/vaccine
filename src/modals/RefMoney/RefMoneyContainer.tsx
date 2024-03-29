import React from 'react';
import { connect } from 'react-redux';

import RefMoney from './RefMoney';

const RefMoneyContainer = (props) => <RefMoney {...props} />;

const mapStateToProps = (state) => {
  const props = {
    modalData: state.app.modalData,
    user: state.user.data
  };

  return props;
};

export default connect(mapStateToProps)(RefMoneyContainer);
