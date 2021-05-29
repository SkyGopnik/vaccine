import React from 'react';
import { connect } from 'react-redux';

import { changeModal, changePanel } from 'src/store/app/actions';
import NeedMoney from './NeedMoney';

const NeedMoneyContainer = (props) => <NeedMoney {...props} />;

const mapStateToProps = (state) => {
  const props = {
    modalData: state.app.modalData
  };

  return props;
};

const mapDispatchToProps = {
  changeModal,
  changePanel
};

export default connect(mapStateToProps, mapDispatchToProps)(NeedMoneyContainer);
