import React from 'react';
import { connect } from 'react-redux';

import { changeModal } from 'src/store/app/actions';

import TransferUser from './TransferUser';

const TransferUserContainer = (props) => <TransferUser {...props} />;

const mapStateToProps = (state) => {
  return {
    user: state.user.data
  };
};

const mapDispatchToProps = {
  changeModal
};

export default connect(mapStateToProps, mapDispatchToProps)(TransferUserContainer);
